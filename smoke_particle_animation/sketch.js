let particles = [];
let field;
let cols, rows;
let scl = 10; // Scale of the vector field
let inc = 0.1; // Increment for Perlin noise
let numParticles = 5000; // Number of particles
let colors = []; // Array to hold the color palette

function setup() {
  
  createCanvas(800, 800);
  background(0); // Black background
  createLoop({ duration: 5, gif: true });

  cols = floor(width / scl);
  rows = floor(height / scl);
  field = new Array(cols * rows);

  // Initialize color palette (from the cube project)
  colors = [
    color(214, 34, 40, 30), // #d62228 with transparency
    color(238, 33, 38, 30), // #ee2126 with transparency
    color(244, 60, 60, 30), // #f43c3c with transparency
    color(214, 34, 40, 20), // Lighter #d62228 with more transparency
    color(238, 33, 38, 20), // Lighter #ee2126 with more transparency
    color(244, 60, 60, 20)  // Lighter #f43c3c with more transparency
  ];

  // Initialize particles
  for (let i = 0; i < numParticles; i++) {
    particles[i] = new Particle();
  }

  // Create the vector field
  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
      let angle = noise(xoff, yoff) * TWO_PI * 4; // Perlin noise for direction
      let v = p5.Vector.fromAngle(angle);
      v.setMag(0.1); // Set the magnitude of vectors
      field[index] = v;
      xoff += inc;
    }
    yoff += inc;
  }
}

function draw() {
  // Draw each particle
  for (let i = 0; i < particles.length; i++) {
    particles[i].follow(field);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }
}

class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxspeed = 2; // Max speed of the particles
    this.color = random(colors); // Assign a random color from the palette
  }

  follow(vectors) {
    let x = floor(this.pos.x / scl);
    let y = floor(this.pos.y / scl);
    let index = x + y * cols;
    let force = vectors[index];
    this.applyForce(force);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  show() {
    stroke(this.color); // Use the assigned color for the particle
    strokeWeight(1);
    point(this.pos.x, this.pos.y);
  }

  edges() {
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;
  }
}








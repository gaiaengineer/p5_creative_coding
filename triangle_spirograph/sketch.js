let nb = 30; 
let rot = 3;
let dim = 350;
let f = 1.0;
let fmin = 0.5;
let sliderNb;
let sliderRot;
let sliderFmin;

function setup() {
  createCanvas(500, 500);
  rectMode(CENTER);
  angleMode(DEGREES);
  sliderNb = createSlider(2,50,nb,1);
  sliderRot = createSlider(1,90,rot);
  sliderFmin = createSlider(0.0,1.0,fmin,0.05);
}

function draw() {
  nb = sliderNb.value();
  rot = sliderRot.value();
  fmin = sliderFmin.value();
  background(0);
  translate(width/2,height/2);
  noFill();
  stroke(255);
  for (let i = 0; i < nb; i++) {
    f = map(i, 0, nb - 1, 1, fmin);
    drawIsoscelesTriangle(0, 0, f * dim);
    rotate(rot);
  }
}

function drawIsoscelesTriangle(x, y, size) {
  let height = size * sqrt(3) / 2;
  beginShape();
  vertex(x, y - height / 2);
  vertex(x - size / 2, y + height / 2);
  vertex(x + size / 2, y + height / 2);
  endShape(CLOSE);
}

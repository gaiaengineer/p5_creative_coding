let nb = 30; 
let rot = 3;
let dim = 450;
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
    drawHexagon(0, 0, f * dim / 2);
    rotate(rot);
  }
}

function drawHexagon(x, y, radius) {
  beginShape();
  for (let angle = 0; angle < 360; angle += 60) {
    let xOffset = radius * cos(angle);
    let yOffset = radius * sin(angle);
    vertex(x + xOffset, y + yOffset);
  }
  endShape(CLOSE);
}

function setup() {
  createCanvas(600, 600);
  drawPattern(); // Initial pattern draw
}

function draw() {
  // Nothing to do here since the pattern is static
}

function drawPattern() {
  background('#040404'); // Set the background color
  noFill();
  strokeWeight(2);

  let numCircles = 20; // Number of concentric circles
  let maxRadius = min(width, height) * 0.45; // Maximum radius for the circles
  let colorPalette = ['#d62228', '#ee2126', '#f43c3c', '#dc2329']; // Color palette for the lines
  
  translate(width / 2, height / 2); // Center the drawing
  
  for (let i = 0; i < numCircles; i++) {
    let lineColor = colorPalette[i % colorPalette.length]; // Pick a color from the palette
    stroke(lineColor); // Set the stroke color
    
    beginShape();
    let radius = map(i, 0, numCircles, 20, maxRadius); // Map the radius for each circle
    
    let isDistorted = i > 2 && random(1) > 0.5; // Smallest two circles are never distorted
    
    let startAngle = random(TWO_PI); // Random starting angle for distortion
    let distortionRange = random(PI / 3, PI / 1.5); // Extended range of distortion in radians
    
    let waveFrequency = random(0.5, 1); // Lower frequency for broader curves
    let waveAmplitude = random(10, 20); // Increased amplitude for more pronounced waves
    
    for (let angle = 0; angle < TWO_PI; angle += 0.01) {
      let x = radius * cos(angle);
      let y = radius * sin(angle);
      
      let distortion = 0;
      
      if (isDistorted && angle > startAngle && angle < startAngle + distortionRange) {
        // Apply a more pronounced wave over a broader area
        let waveProgress = map(angle, startAngle, startAngle + distortionRange, 0, PI);
        distortion = waveAmplitude * sin(waveProgress * waveFrequency);
      }
      
      vertex(x + distortion, y + distortion);
    }
    endShape(CLOSE);
  }
}

function keyPressed() {
  if (key === ' ') { // Check if the spacebar is pressed
    drawPattern(); // Redraw the pattern
  }
}









let dots = [];
let numDots = 15;
let squareSize = 300;  // Size of the square container

function setup() {
  let canvas = createCanvas(squareSize, squareSize);
  canvas.parent('canvas-container');

  // Initialize dots with random positions and velocities
  for (let i = 0; i < numDots; i++) {
    dots.push({
      x: random(15, width - 15),  // Start within the visible area, accounting for the radius
      y: random(15, height - 15),
      vx: random(-2, 2), // Random velocity in x direction
      vy: random(-2, 2), // Random velocity in y direction
      size: 15
    });
  }
}

function draw() {
  background(0,0,0); // Dark background

  // Update and display each dot
  for (let dot of dots) {
    // Move the dots
    dot.x += dot.vx;
    dot.y += dot.vy;

    // Check for bouncing against the edges, accounting for the dot's size
    if (dot.x < dot.size / 2 || dot.x > width - dot.size / 2) {
      dot.vx *= -1; // Reverse direction when hitting the wall
    }
    if (dot.y < dot.size / 2 || dot.y > height - dot.size / 2) {
      dot.vy *= -1; // Reverse direction when hitting the wall
    }

    // Draw the dots
    fill(255, 255, 255); // Pink color
    noStroke();
    ellipse(dot.x, dot.y, dot.size);
  }
}

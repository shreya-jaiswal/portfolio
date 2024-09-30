let blobRadius = 110;
let sound1, sound2, sound3, fft1, fft2, fft3;
let isPlaying1 = false, isPlaying2 = false, isPlaying3 = false;
let canvas;

function preload() {
  sound1 = loadSound('loon.mp3');
  sound2 = loadSound('goose.mp3');
  sound3 = loadSound('ovenbird.mp3');
}

function setup() {
  canvas = createCanvas(windowWidth / 2, windowHeight / 2);
  canvas.parent('canvas-container'); // Attach canvas to the container

  background('black');
  noStroke();

  fft1 = new p5.FFT();
  fft2 = new p5.FFT();
  fft3 = new p5.FFT();

  fft1.setInput(sound1);
  fft2.setInput(sound2);
  fft3.setInput(sound3);

  createButtons();
}

function windowResized() {
  resizeCanvas(windowWidth / 2, windowHeight / 2);
}

function draw() {
  background(0);
  
  let gradient = drawingContext.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, 'rgba(224, 18, 133, 0.7)');
  gradient.addColorStop(1, 'rgba(0, 137, 255, 0.7)');
  drawingContext.fillStyle = gradient;

  drawBlob();
}

function drawBlob() {
  let totalPoints = 50;
  let angleStep = TWO_PI / totalPoints;
  let xOff = width / 2;
  let yOff = height / 2;
  
  let firstX, firstY;
  
  beginShape();
  for (let i = 0; i < totalPoints; i++) {
    let angle = i * angleStep;
    let offset = calculateOffset(i);
    
    let r = blobRadius + offset;
    let x = xOff + r * cos(angle);
    let y = yOff + r * sin(angle);

    if (i === 0) {
      firstX = x;
      firstY = y;
    }
    
    curveVertex(x, y);
  }

  curveVertex(firstX, firstY);
  endShape(CLOSE);
}

function calculateOffset(i) {
  let offset = 0;
  
  if (isPlaying1) {
    let waveform1 = fft1.waveform();
    let index1 = floor(map(i, 0, 50, 0, waveform1.length));
    offset += map(waveform1[index1], -1, 1, -50, 50);
  }

  if (isPlaying2) {
    let waveform2 = fft2.waveform();
    let index2 = floor(map(i, 0, 50, 0, waveform2.length));
    offset += map(waveform2[index2], -1, 1, -50, 50);
  }

  if (isPlaying3) {
    let waveform3 = fft3.waveform();
    let index3 = floor(map(i, 0, 50, 0, waveform3.length));
    offset += map(waveform3[index3], -1, 1, -50, 50);
  }

  if (!isPlaying1 && !isPlaying2 && !isPlaying3) {
    offset = map(noise(i * 0.05, frameCount * 0.002), 0, 1, -100, 100);
  }

  return offset;
}

function createButtons() {
    const buttonContainer = select('#button-container'); // Select button container
  
    playButton1 = createButton('Loon Call');
    styleButton(playButton1);
    playButton1.mousePressed(() => toggleSound(sound1, 'Loon Call', playButton1, 1));
    playButton1.parent(buttonContainer); // Attach to container
  
    playButton2 = createButton('Canada Goose Squawk');
    styleButton(playButton2);
    playButton2.mousePressed(() => toggleSound(sound2, 'Canada Goose Squawk', playButton2, 2));
    playButton2.parent(buttonContainer); // Attach to container
  
    playButton3 = createButton('Ovenbird Chirp');
    styleButton(playButton3);
    playButton3.mousePressed(() => toggleSound(sound3, 'Ovenbird Chirp', playButton3, 3));
    playButton3.parent(buttonContainer); // Attach to container
  }
  

function styleButton(button) {
  button.style('color', 'white');
  button.style('background-color', '#444');
  button.style('padding', '10px 20px');
  button.style('font-size', '16px');
  button.style('border', 'none');
  button.style('border-radius', '5px');
  button.style('cursor', 'pointer');
}

function toggleSound(sound, label, button, soundIndex) {
  if (sound.isPlaying()) {
    sound.pause();
    button.html('Play ' + label);
    if (soundIndex === 1) isPlaying1 = false;
    if (soundIndex === 2) isPlaying2 = false;
    if (soundIndex === 3) isPlaying3 = false;
  } else {
    sound.loop();
    button.html('Pause ' + label);
    if (soundIndex === 1) isPlaying1 = true;
    if (soundIndex === 2) isPlaying2 = true;
    if (soundIndex === 3) isPlaying3 = true;
  }
}

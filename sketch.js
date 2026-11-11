let playfield;
let inputManager;
let gameTimeline = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  playfield = new Playfield();
  inputManager = new InputManager();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  playfield.updateDimensions();
}

// Inside sketch.js

function draw() {
  background(20);
  
  // FIX: If the first frame has massive loading delay, ignore it!
  if (frameCount < 3) {
    // Keep timeline frozen while browser layout engine stabilizes
    gameTimeline = 0; 
  } else {
    // Normal frame-by-frame progression kicks in here
    gameTimeline += deltaTime / 1000;
  }

  // Poll current frame inputs
  inputManager.pollInputs();

  // Render game elements sequentially
  playfield.drawGrid();
  playfield.drawLanesFeedback(inputManager.states);
  playfield.drawNotes(demoChart, gameTimeline);
}


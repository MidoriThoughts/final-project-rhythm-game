// sketch.js
let playfield;
let inputManager;
let gameTimeline = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // Initialize our layout and input tracking objects
  playfield = new Playfield();
  inputManager = new InputManager();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  playfield.updateDimensions(); // Let playfield recalculate resizing automatically
}

function draw() {
  background(20);
  
  // Update timeline
  gameTimeline += deltaTime / 1000;

  // 1. Process System Events
  inputManager.pollInputs();

  // 2. Render Components via Helpers
  playfield.drawGrid();
  playfield.drawLanesFeedback(inputManager.states);
  playfield.drawNotes(demoChart, gameTimeline);
}

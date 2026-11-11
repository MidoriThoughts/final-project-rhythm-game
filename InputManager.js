class InputManager {
  constructor() {
    this.states = [false, false, false, false];
  }

  pollInputs() {
    // FIX: Using array brackets [0, 1, 2, 3] so the array isn't destroyed!
    // Also using the exact p5.js v2 strings that we verified are working.
    this.states[0] = keyIsDown("KeyD") || keyIsDown("d") || keyIsDown("D");
    this.states[1] = keyIsDown("KeyF") || keyIsDown("f") || keyIsDown("F");
    this.states[2] = keyIsDown("KeyJ") || keyIsDown("j") || keyIsDown("J");
    this.states[3] = keyIsDown("KeyK") || keyIsDown("k") || keyIsDown("K");
  }
}

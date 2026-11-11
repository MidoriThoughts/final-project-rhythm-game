// Lane activity states
let lane0Active = false;
let lane1Active = false;
let lane2Active = false;
let lane3Active = false;

// Game timeline tracker
let gameTimeline = 0;

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(20);
  
  // Advance time sequence smoothly
  gameTimeline += deltaTime / 1000;

  // p5.js 2.0 NATIVE INPUT ENGINE 
  // Evaluates explicit event codes to completely bypass browser dead-zones
  lane0Active = keyIsDown("KeyD") || keyIsDown("d") || keyIsDown("D");
  lane1Active = keyIsDown("KeyF") || keyIsDown("f") || keyIsDown("F");
  lane2Active = keyIsDown("KeyJ") || keyIsDown("j") || keyIsDown("J");
  lane3Active = keyIsDown("KeyK") || keyIsDown("k") || keyIsDown("K");

  // DRAW GRID LANES
  stroke(60);
  strokeWeight(2);
  line(100, 0, 100, 600); 
  line(180, 0, 180, 600);
  line(260, 0, 260, 600);
  line(340, 0, 340, 600);
  line(420, 0, 420, 600);

  // Neon Target Line
  stroke(0, 255, 255);
  strokeWeight(4);
  line(100, 500, 420, 500);

  // DISPLAY ACTIVE KEYS (Flashes lanes brightly upon pressing)
  noStroke();
  if (lane0Active) { fill(0, 255, 255, 50); rect(100, 0, 80, 500); fill(0, 255, 255); rect(100, 490, 80, 20); }
  if (lane1Active) { fill(0, 255, 255, 50); rect(180, 0, 80, 500); fill(0, 255, 255); rect(180, 490, 80, 20); }
  if (lane2Active) { fill(0, 255, 255, 50); rect(260, 0, 80, 500); fill(0, 255, 255); rect(260, 490, 80, 20); }
  if (lane3Active) { fill(0, 255, 255, 50); rect(340, 0, 80, 500); fill(0, 255, 255); rect(340, 490, 80, 20); }

  // RENDER STATIONARY MAP NOTES
  
  // Note A: White Regular Tap (Lane 0) at 1.5 seconds
  let noteAY = 500 - ((1.5 - gameTimeline) * 200);
  if (noteAY > -50 && noteAY < 600) {
    fill(255);
    rect(105, noteAY - 10, 70, 20, 5);
  }

  // Note B: Pink Dual-Lane Flick Note (Spans Lane 1 AND Lane 2) at 2.5 seconds
  let noteBY = 500 - ((2.5 - gameTimeline) * 200);
  if (noteBY > -50 && noteBY < 600) {
    fill(255, 50, 150);
    rect(185, noteBY - 10, 150, 20, 5); // 150px wide fully stitches across lanes 1 and 2
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(12);
    text("▲ DUAL FLICK ▲", 260, noteBY);
  }

  // Note C: White Regular Tap (Lane 3) at 4.0 seconds
  let noteCY = 500 - ((4.0 - gameTimeline) * 200);
  if (noteCY > -50 && noteCY < 600) {
    fill(255);
    rect(345, noteCY - 10, 70, 20, 5);
  }
}

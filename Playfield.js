class Playfield {
  constructor() {
    this.gridWidth = 0;
    this.laneWidth = 0;
    this.gridX = 0;
    this.judgeY = 0;
    this.noteHeight = 0;
    this.scrollSpeed = 0;
    this.updateDimensions();
  }

  updateDimensions() {
    this.gridWidth = min(width * 0.6, 400);
    this.laneWidth = this.gridWidth / 4;
    this.gridX = (width - this.gridWidth) / 2;
    this.judgeY = height * 0.83;
    this.noteHeight = height * 0.033;
    this.scrollSpeed = height * 0.33; 
  }

  drawGrid() {
    stroke(60);
    strokeWeight(2);
    for (let i = 0; i <= 4; i++) {
      let x = this.gridX + i * this.laneWidth;
      line(x, 0, x, height);
    }
    stroke(0, 255, 255);
    strokeWeight(4);
    line(this.gridX, this.judgeY, this.gridX + this.gridWidth, this.judgeY);
  }

  drawLanesFeedback(inputStates) {
    noStroke();
    for (let i = 0; i < 4; i++) {
      if (inputStates.at(i)) {
        fill(0, 255, 255, 40);
        rect(this.gridX + i * this.laneWidth, 0, this.laneWidth, this.judgeY);
        fill(0, 255, 255);
        rect(this.gridX + i * this.laneWidth, this.judgeY - this.noteHeight / 2, this.laneWidth, this.noteHeight);
      }
    }
  }

  drawNotes(chart, timeline) {
    for (let i = 0; i < chart.length; i++) {
      let note = chart.at(i);
      let timeDelta = note.time - timeline;
      let y = this.judgeY - (timeDelta * this.scrollSpeed);

      if (note.type === "tap") {
        if (y > -50 && y < height + 50) {
          noStroke();
          fill(255);
          let x = this.gridX + note.laneIdx * this.laneWidth + 5;
          rect(x, y - this.noteHeight / 2, this.laneWidth - 10, this.noteHeight, 5);
        }
      } 
      else if (note.type === "flick") {
        if (y > -50 && y < height + 50) {
          noStroke();
          fill(255, 50, 150); 
          let startX = this.gridX + note.laneIdx * this.laneWidth + 5;
          let flickWidth = (this.laneWidth * note.multiLaneCount) - 10;
          rect(startX, y - this.noteHeight / 2, flickWidth, this.noteHeight, 5);
          fill(255);
          textAlign(CENTER, CENTER);
          textSize(max(10, height * 0.018));
          text("▲ DUAL FLICK ▲", startX + (flickWidth / 2), y);
        }
      } 
      else if (note.type === "hold") {
        let totalSteps = 50; 
        let leftEdgePoints = Array.of();
        let rightEdgePoints = Array.of();

        // 1. GENERATE COUPLING COORDINATES WITH COSINE CURVES
        for (let step = 0; step <= totalSteps; step++) {
          let t = step / totalSteps;
          let currentRelTime = t * note.duration;
          let currentAbsTime = note.time + currentRelTime;
          let currentLane = note.path.at(0).lane;
          
          for (let p = 0; p < note.path.length - 1; p++) {
            let nodeA = note.path.at(p);
            let nodeB = note.path.at(p + 1);
            
            if (currentRelTime >= nodeA.relTime && currentRelTime <= nodeB.relTime) {
              let segmentDuration = nodeB.relTime - nodeA.relTime;
              let segmentProgress = 0;
              if (segmentDuration > 0) {
                segmentProgress = (currentRelTime - nodeA.relTime) / segmentDuration;
              }
              
              let smoothProgress = (1 - cos(segmentProgress * PI)) / 2;
              currentLane = lerp(nodeA.lane, nodeB.lane, smoothProgress);
              break;
            }
          }

          let yPos = this.judgeY - ((currentAbsTime - timeline) * this.scrollSpeed);
          let xLeft = this.gridX + (currentLane * this.laneWidth) + 5;
          let xRight = xLeft + this.laneWidth - 10;

          leftEdgePoints.push({x: xLeft, y: yPos});
          rightEdgePoints.push({x: xRight, y: yPos});
        }
        
        // 2. RENDER SOLID RIBBON BODY
        noStroke();
        fill(0, 255, 150, 100); 
        beginShape(QUAD_STRIP);
        for (let step = 0; step <= totalSteps; step++) {
          vertex(leftEdgePoints.at(step).x, leftEdgePoints.at(step).y);
          vertex(rightEdgePoints.at(step).x, rightEdgePoints.at(step).y);
        }
        endShape();

        // 3. RENDER SMOOTH OUTSIDE CONTOURS
        stroke(0, 255, 150);
        strokeWeight(3);
        noFill();

        beginShape();
        for (let step = 0; step <= totalSteps; step++) {
          vertex(leftEdgePoints.at(step).x, leftEdgePoints.at(step).y);
        }
        endShape();

        beginShape();
        for (let step = 0; step <= totalSteps; step++) {
          vertex(rightEdgePoints.at(step).x, rightEdgePoints.at(step).y);
        }
        endShape();

        // 4. DRAW DEFINED ENDPOINTS
        noStroke();
        
        // Green Start Cap
        let startY = this.judgeY - ((note.time - timeline) * this.scrollSpeed);
        if (startY > -50 && startY < height + 50) {
          fill(0, 255, 150);
          let startLane = note.path.at(0).lane;
          rect(this.gridX + (startLane * this.laneWidth) + 5, startY - this.noteHeight / 2, this.laneWidth - 10, this.noteHeight, 5);
        }

        // Green End Cap
        let endAbsTime = note.time + note.duration;
        let endY = this.judgeY - ((endAbsTime - timeline) * this.scrollSpeed);
        if (endY > -50 && endY < height + 50) {
          fill(0, 255, 180); 
          let endLane = note.path.at(note.path.length - 1).lane;
          rect(this.gridX + (endLane * this.laneWidth) + 5, endY - this.noteHeight / 2, this.laneWidth - 10, this.noteHeight, 5);
        }
      }
    }
  }
}

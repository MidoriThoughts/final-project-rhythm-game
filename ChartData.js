const demoChart = Array.of(
  { time: 1.5, laneIdx: 0, type: "tap" },    
  
  // Swinging hold note that curves from Lane 1 to Lane 2
  { 
    time: 2.0, 
    duration: 2.0, 
    type: "hold",
    path: Array.of(
      { relTime: 0.0, lane: 1 }, 
      { relTime: 1.0, lane: 2 }, 
      { relTime: 2.0, lane: 2 }  
    )
  },

  // Custom dual-lane flick note spanning Lane 2 and Lane 3
  { time: 4.5, laneIdx: 2, isMultiLane: true, multiLaneCount: 2, type: "flick" },
  { time: 5.5, laneIdx: 3, type: "tap" }     
);

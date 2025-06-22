const Priority = (processes) => {
  const n = processes.length;
  let currentTime = 0;
  let completed = 0;
  let result = [];

  // Step 1: Initialize processes
  processes = processes.map((p) => ({
    id: p.id,
    arrival: parseInt(p.arrival, 10),
    burst: parseInt(p.burst, 10),
    priority: parseInt(p.priority, 10),
    remaining: parseInt(p.burst, 10),
    completion: 0,
    turnaround: 0,
    waiting: 0,
    completionPercentage: [],
    ganttValues: [],
  }));

  // Step 2: Sort processes by arrival time
  processes.sort((a, b) => a.arrival - b.arrival);

  let readyQueue = [];
  let i = 0;
  let currentIndex = -1;
  let startTime = 0;

  while (completed < n) {
    // Move all arrived processes into the ready queue
    while (i < n && processes[i].arrival <= currentTime) {
      readyQueue.push(processes[i]);
      i++;
    }

    // Sort ready queue by priority (lowest number = highest priority)
    readyQueue.sort((a, b) => a.priority - b.priority);

    if (readyQueue.length === 0) {
      currentTime++; // CPU is idle
      continue;
    }

    const process = readyQueue.shift(); // Select the highest priority process
    startTime = currentTime;

    for (let t = 0; t < process.burst; t++) {
      process.remaining--;
      currentTime++;

      // Update completion percentage every unit
      process.completionPercentage.push(
        parseFloat(((t + 1) / process.burst) * 100).toFixed(2)
      );
    }

    process.ganttValues.push([startTime, currentTime]);
    process.completion = currentTime;
    process.turnaround = process.completion - process.arrival;
    process.waiting = process.turnaround - process.burst;
    completed++;

    result.push({
      id: process.id,
      arrival: process.arrival,
      burst: process.burst,
      priority: process.priority,
      completion: process.completion,
      turnaround: process.turnaround,
      waiting: process.waiting,
      completionPercentage: process.completionPercentage,
      ganttValues: process.ganttValues,
    });
  }

  return result;
};

export default Priority;

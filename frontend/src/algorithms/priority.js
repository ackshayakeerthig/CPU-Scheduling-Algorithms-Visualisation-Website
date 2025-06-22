import Heap from 'heap-js';

const Priority = (processes) => {
  const n = processes.length;
  let currentTime = 0;
  let completed = 0;
  const result = [];

  // Initialize processes
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

  // Sort by arrival time
  processes.sort((a, b) => a.arrival - b.arrival);

  let arrivalIndex = 0;

  // Min heap based on priority (lower number = higher priority)
  const readyQueue = new Heap((a, b) => a.priority - b.priority);

  while (completed < n) {
    // Add all processes that have arrived to the heap
    while (
      arrivalIndex < n &&
      processes[arrivalIndex].arrival <= currentTime
    ) {
      readyQueue.push(processes[arrivalIndex]);
      arrivalIndex++;
    }

    if (readyQueue.size() === 0) {
      currentTime++; // CPU is idle
      continue;
    }

    const process = readyQueue.pop();
    const startTime = currentTime;

    for (let t = 0; t < process.burst; t++) {
      process.remaining--;
      currentTime++;
      process.completionPercentage.push(
        parseFloat(((t + 1) / process.burst) * 100).toFixed(2)
      );
    }

    process.ganttValues.push([startTime, currentTime]);
    process.completion = currentTime;
    process.turnaround = currentTime - process.arrival;
    process.waiting = process.turnaround - process.burst;

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

    completed++;
  }

  return result;
};

export default Priority;

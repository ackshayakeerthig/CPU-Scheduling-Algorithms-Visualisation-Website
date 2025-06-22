const FCFS = (processes) => {
  const n = processes.length;
  let currentTime = 0;
  let completed = 0;
  let result = [];

  // Initialize the processes with their arrival, burst, and remaining times
  processes = processes.map((p) => ({
    id: p.id,
    arrival: parseInt(p.arrival, 10),
    burst: parseInt(p.burst, 10),
    remaining: parseInt(p.burst, 10),
    completion: 0,
    turnaround: 0,
    waiting: 0,
    completionPercentage: [],
    ganttValues: [],
  }));

  // Sort processes by arrival time
  processes.sort((a, b) => a.arrival - b.arrival);

  let currentIndex = -1;
  let startTime = 0;
  let i = 0; // Pointer to current process in sorted list

  while (completed < n) {
    const process = processes[i];

    if (currentTime < process.arrival) {
      currentTime = process.arrival; // CPU idle, skip to process arrival
    }

    startTime = currentTime;
    currentTime += process.remaining;
    process.remaining = 0;
    completed++;

    process.ganttValues.push([startTime, currentTime]);

    process.completion = currentTime;
    process.turnaround = process.completion - process.arrival;
    process.waiting = process.turnaround - process.burst;

    result.push({
      id: process.id,
      arrival: process.arrival,
      burst: process.burst,
      completion: process.completion,
      turnaround: process.turnaround,
      waiting: process.waiting,
      completionPercentage: process.completionPercentage,
      ganttValues: process.ganttValues,
    });

    i++; // Move to next process in sorted list
  }

  console.log(result);
  return result;
};

export default FCFS;

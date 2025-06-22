const RoundRobin = (processes, quantum) => {
  const n = processes.length;
  let currentTime = 0;
  let completed = 0;
  let queue = [];
  let result = [];

  // Initialize the processes with their attributes
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
  let arrivalIndex = 0; // pointer to track arrivals
  const queuedProcessIds = new Set(); // to avoid duplicates

  // Add processes arriving at time 0
  while (arrivalIndex < n && processes[arrivalIndex].arrival <= currentTime) {
    queue.push(processes[arrivalIndex]);
    queuedProcessIds.add(processes[arrivalIndex].id);
    arrivalIndex++;
  }

  // While not all processes are completed
  while (completed < n) {
    if (queue.length === 0) {
      currentTime++;
      while (arrivalIndex < n && processes[arrivalIndex].arrival <= currentTime) {
        queue.push(processes[arrivalIndex]);
        queuedProcessIds.add(processes[arrivalIndex].id);
        arrivalIndex++;
      }
      continue;
    }

    const process = queue.shift();
    queuedProcessIds.delete(process.id);

    if (currentIndex === -1 || currentIndex !== process.id) {
      if (currentIndex !== -1) {
        const prev = processes.find((p) => p.id === currentIndex);
        prev.ganttValues.push([startTime, currentTime]);
      }
      currentIndex = process.id;
      startTime = currentTime;
    }

    const timeSlice = Math.min(process.remaining, quantum);
    currentTime += timeSlice;
    process.remaining -= timeSlice;

    process.completionPercentage.push(
      parseFloat(
        ((process.burst - process.remaining) / process.burst) * 100
      ).toFixed(2)
    );

    // Add newly arrived processes
    while (arrivalIndex < n && processes[arrivalIndex].arrival <= currentTime) {
      const arriving = processes[arrivalIndex];
      if (arriving.remaining > 0 && !queuedProcessIds.has(arriving.id)) {
        queue.push(arriving);
        queuedProcessIds.add(arriving.id);
      }
      arrivalIndex++;
    }

    if (process.remaining > 0) {
      if (!queuedProcessIds.has(process.id)) {
        queue.push(process);
        queuedProcessIds.add(process.id);
      }
    } else {
      completed++;
      process.completion = currentTime;
      process.turnaround = process.completion - process.arrival;
      process.waiting = process.turnaround - process.burst;
      process.ganttValues.push([startTime, currentTime]);

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
      currentIndex = -1;
    }
  }

  return result;
};

export default RoundRobin;

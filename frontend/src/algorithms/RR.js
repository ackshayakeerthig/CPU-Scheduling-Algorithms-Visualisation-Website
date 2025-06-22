const RoundRobin = (processes, quantum) => {
  const n = processes.length;
  let currentTime = 0;
  let completed = 0;
  const queue = []; // behaves like a circular queue with index
  const result = [];

  // Initialize processes
  processes = processes.map((p) => ({
    id: p.id,
    arrival: parseInt(p.arrival),
    burst: parseInt(p.burst),
    remaining: parseInt(p.burst),
    completion: 0,
    turnaround: 0,
    waiting: 0,
    completionPercentage: [],
    ganttValues: [],
  }));

  // Sort by arrival time
  processes.sort((a, b) => a.arrival - b.arrival);

  let currentIndex = -1;
  let startTime = 0;
  let arrivalIndex = 0;
  const queuedProcessIds = new Set();

  // Add processes that arrived at time 0
  while (arrivalIndex < n && processes[arrivalIndex].arrival <= currentTime) {
    queue.push(processes[arrivalIndex]);
    queuedProcessIds.add(processes[arrivalIndex].id);
    arrivalIndex++;
  }

  let queuePointer = 0;

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

    const process = queue[queuePointer];
    queue.splice(queuePointer, 1); // remove from current position
    queuedProcessIds.delete(process.id);

    if (currentIndex !== process.id) {
      if (currentIndex !== -1) {
        const prev = processes.find((p) => p.id === currentIndex);
        prev.ganttValues.push([startTime, currentTime]);
      }
      currentIndex = process.id;
      startTime = currentTime;
    }

    const timeSlice = Math.min(quantum, process.remaining);
    currentTime += timeSlice;
    process.remaining -= timeSlice;

    process.completionPercentage.push(
      parseFloat(
        ((process.burst - process.remaining) / process.burst) * 100
      ).toFixed(2)
    );

    // Check for new arrivals during this time slice
    while (arrivalIndex < n && processes[arrivalIndex].arrival <= currentTime) {
      if (processes[arrivalIndex].remaining > 0 && !queuedProcessIds.has(processes[arrivalIndex].id)) {
        queue.push(processes[arrivalIndex]);
        queuedProcessIds.add(processes[arrivalIndex].id);
      }
      arrivalIndex++;
    }

    if (process.remaining > 0) {
      if (!queuedProcessIds.has(process.id)) {
        queue.push(process);
        queuedProcessIds.add(process.id);
      }
    } else {
      process.completion = currentTime;
      process.turnaround = process.completion - process.arrival;
      process.waiting = process.turnaround - process.burst;
      process.ganttValues.push([startTime, currentTime]);
      result.push({ ...process });
      completed++;
      currentIndex = -1;
    }

    // Move to next process in circular fashion
    if (queue.length > 0) {
      queuePointer = (queuePointer) % queue.length;
    } else {
      queuePointer = 0;
    }
  }

  return result;
};

export default RoundRobin;

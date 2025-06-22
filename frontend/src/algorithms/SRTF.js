import PriorityQueue from "js-priority-queue";

const SRTF = (processes) => {
  const n = processes.length;
  let currentTime = 0;
  let completed = 0;
  let result = [];

  // Initialize processes
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

  processes.sort((a, b) => a.arrival - b.arrival);

  let arrivalIndex = 0;
  let startTime = 0;
  let currentProcess = null;

  const pq = new PriorityQueue({
    comparator: (a, b) => a.remaining - b.remaining,
  });

  while (completed < n) {
    // Enqueue all processes that have arrived at current time
    while (arrivalIndex < n && processes[arrivalIndex].arrival <= currentTime) {
      pq.queue(processes[arrivalIndex]);
      arrivalIndex++;
    }

    if (pq.length === 0) {
      currentTime++;
      currentProcess = null;
      continue;
    }

    const nextProcess = pq.dequeue();

    // Context switch
    if (!currentProcess || currentProcess.id !== nextProcess.id) {
      if (currentProcess) {
        currentProcess.ganttValues.push([startTime, currentTime]);
      }
      currentProcess = nextProcess;
      startTime = currentTime;
    }

    currentProcess.remaining--;
    currentTime++;

    // If finished, finalize stats
    if (currentProcess.remaining === 0) {
      currentProcess.ganttValues.push([startTime, currentTime]);
      currentProcess.completion = currentTime;
      currentProcess.turnaround = currentProcess.completion - currentProcess.arrival;
      currentProcess.waiting = currentProcess.turnaround - currentProcess.burst;

      result.push({
        id: currentProcess.id,
        arrival: currentProcess.arrival,
        burst: currentProcess.burst,
        completion: currentProcess.completion,
        turnaround: currentProcess.turnaround,
        waiting: currentProcess.waiting,
        completionPercentage: currentProcess.completionPercentage,
        ganttValues: currentProcess.ganttValues,
      });

      currentProcess = null;
      completed++;
    } else {
      pq.queue(currentProcess); // Requeue unfinished process
    }
  }

  return result;
};

export default SRTF;

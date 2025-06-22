import MinPriorityQueue from  js-priority-queue; // A custom or npm package like 'js-priority-queue'

const SRTF = (processes) => {
  const n = processes.length;
  let currentTime = 0;
  let completed = 0;
  let result = [];

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
  let currentProcess = null;
  let startTime = 0;
  const heap = new MinPriorityQueue((a, b) => a.remaining - b.remaining);

  while (completed < n) {
    // Push newly arrived processes to heap
    while (
      arrivalIndex < n &&
      processes[arrivalIndex].arrival <= currentTime
    ) {
      heap.push(processes[arrivalIndex]);
      arrivalIndex++;
    }

    // If no process is ready
    if (heap.isEmpty()) {
      currentTime++;
      continue;
    }

    const nextProcess = heap.pop();

    if (!currentProcess || currentProcess.id !== nextProcess.id) {
      if (currentProcess) {
        currentProcess.ganttValues.push([startTime, currentTime]);
      }
      currentProcess = nextProcess;
      startTime = currentTime;
    }

    currentProcess.remaining--;
    currentTime++;

    if (currentProcess.remaining === 0) {
      currentProcess.ganttValues.push([startTime, currentTime]);
      currentProcess.completion = currentTime;
      currentProcess.turnaround =
        currentProcess.completion - currentProcess.arrival;
      currentProcess.waiting =
        currentProcess.turnaround - currentProcess.burst;

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
      // Re-add the process back into the heap
      heap.push(currentProcess);
    }
  }

  return result;
};

export default SRTF;

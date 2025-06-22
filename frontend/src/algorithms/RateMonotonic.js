import Heap from "heap-js";

const RateMonotonic = (processes, simulationTime) => {
  let currentTime = 0;
  const result = [];

  // Prepare task structures
  processes = processes.map((p) => ({
    id: p.id,
    period: parseInt(p.period, 10),
    burst: parseInt(p.burst, 10),
    nextRelease: 0,
  }));

  // MinHeap by period (lower = higher priority)
  const readyQueue = new Heap((a, b) => a.period - b.period);
  let currentProcess = null;
  let startTime = 0;

  while (currentTime < simulationTime) {
    // Release new tasks
    processes.forEach((p) => {
      if (currentTime === p.nextRelease) {
        readyQueue.push({
          id: p.id,
          arrival: currentTime,
          deadline: currentTime + p.period,
          burst: p.burst,
          remaining: p.burst,
          period: p.period,
          ganttValues: [],
        });
        p.nextRelease += p.period;
      }
    });

    // Get highest priority task (if available)
    let nextProcess = readyQueue.peek();
    if (nextProcess && nextProcess.arrival <= currentTime && nextProcess.remaining > 0) {
      if (!currentProcess || currentProcess.id !== nextProcess.id) {
        if (currentProcess) {
          currentProcess.ganttValues.push([startTime, currentTime]);
        }
        currentProcess = nextProcess;
        startTime = currentTime;
      }

      currentProcess.remaining--;

      if (currentProcess.remaining === 0) {
        currentProcess.ganttValues.push([startTime, currentTime + 1]);
        currentProcess.completion = currentTime + 1;
        currentProcess.turnaround = currentProcess.completion - currentProcess.arrival;
        currentProcess.waiting = currentProcess.turnaround - currentProcess.burst;
        result.push({ ...currentProcess });
        readyQueue.pop(); // Remove from heap
        currentProcess = null;
      }
    } else {
      if (currentProcess) {
        currentProcess.ganttValues.push([startTime, currentTime]);
        currentProcess = null;
      }
    }

    currentTime++;
  }

  return result;
};

export default RateMonotonic;

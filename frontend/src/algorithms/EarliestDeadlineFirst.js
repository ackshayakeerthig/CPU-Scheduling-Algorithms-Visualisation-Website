import Heap from "heap-js";

const EarliestDeadlineFirst = (processes, simulationTime) => {
  let currentTime = 0;
  const result = [];

  // Initialize periodic task info
  processes = processes.map((p) => ({
    id: p.id,
    period: parseInt(p.period, 10),
    burst: parseInt(p.burst, 10),
    nextRelease: 0,
  }));

  const readyQueue = new Heap((a, b) => a.deadline - b.deadline); // sort by earliest deadline
  let currentProcess = null;
  let startTime = 0;

  while (currentTime < simulationTime) {
    // Release new instances at correct times
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

    // Get task with earliest deadline
    let nextProcess = readyQueue.peek();
    while (nextProcess && nextProcess.remaining === 0) {
      readyQueue.pop(); // discard if already finished
      nextProcess = readyQueue.peek();
    }

    if (nextProcess && nextProcess.arrival <= currentTime) {
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
        currentProcess.missedDeadline = currentProcess.completion > currentProcess.deadline;

        result.push({ ...currentProcess });
        readyQueue.pop(); // remove from heap
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

export default EarliestDeadlineFirst;

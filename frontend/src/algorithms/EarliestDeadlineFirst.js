const EarliestDeadlineFirst = (processes, simulationTime) => {
  let currentTime = 0;
  let result = [];

  // Initialize processes with deadline and period
  processes = processes.map((p) => ({
    id: p.id,
    period: parseInt(p.period, 10),
    burst: parseInt(p.burst, 10),
    nextRelease: 0,
    remaining: 0,
    instances: [],
    ganttValues: [],
  }));

  const processInstances = [];

  let currentProcess = null;
  let startTime = 0;

  while (currentTime < simulationTime) {
    // Release new instances if period time reached
    processes.forEach((p) => {
      if (currentTime === p.nextRelease) {
        processInstances.push({
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

    // Sort by earliest deadline (dynamic priority)
    const readyQueue = processInstances
      .filter((p) => p.arrival <= currentTime && p.remaining > 0)
      .sort((a, b) => a.deadline - b.deadline);

    const nextProcess = readyQueue[0];

    if (nextProcess) {
      // Preemption check
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

        const index = processInstances.indexOf(currentProcess);
        processInstances.splice(index, 1);
        currentProcess = null;
      }
    } else {
      // Idle time
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

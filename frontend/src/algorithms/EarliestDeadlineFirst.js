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
    processInstances.sort((a, b) => a.deadline - b.deadline);

    // Pick the task with the earliest deadline
    let nextProcess = processInstances.find(
      (p) => p.arrival <= currentTime && p.remaining > 0
    );

    if (nextProcess) {
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
        currentProcess.turnaround =
          currentProcess.completion - currentProcess.arrival;
        currentProcess.waiting =
          currentProcess.turnaround - currentProcess.burst;
        result.push({ ...currentProcess });

        const index = processInstances.indexOf(currentProcess);
        processInstances.splice(index, 1);
        currentProcess = null;
      }
    } else {
      if (currentProcess) {
        currentProcess.ganttValues.push([startTime, currentTime]);
        currentProcess = null;
      }
    }
    //if (!nextProcess && !currentProcess) {
  //result.push({
    //id: 'IDLE',
    //ganttValues: [[currentTime, currentTime + 1]],
 // });
//}

    currentTime++;
  }

  console.log("Earliest Deadline First Called With:", processes, simulationTime);
  return result;
};

export default EarliestDeadlineFirst;
// Example usage:
//const processes = [
 // { id: 'P1', period: 5, burst: 2 },
 // { id: 'P2', period: 10, burst: 3 },
//];

//const result = EarliestDeadlineFirst(processes, 30);
//console.log(result);

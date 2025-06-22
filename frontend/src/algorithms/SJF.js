const SJF = (processes) => {
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
    ganttValues: [],
  }));

  // Sort by arrival time once
  processes.sort((a, b) => a.arrival - b.arrival);

  let readyQueue = [];
  let arrivalIndex = 0;

  while (completed < n) {
    // Add newly arrived processes to readyQueue
    while (arrivalIndex < n && processes[arrivalIndex].arrival <= currentTime) {
      readyQueue.push(processes[arrivalIndex]);
      arrivalIndex++;
    }

    if (readyQueue.length === 0) {
      currentTime++;
      continue;
    }

    // Select process with shortest burst from readyQueue
    readyQueue.sort((a, b) => a.burst - b.burst); // stable for same burst time
    const selectedProcess = readyQueue.shift(); // Remove from queue

    selectedProcess.ganttValues.push([currentTime, currentTime + selectedProcess.burst]);

    // Run to completion
    currentTime += selectedProcess.burst;
    selectedProcess.remaining = 0;
    selectedProcess.completion = currentTime;
    selectedProcess.turnaround = currentTime - selectedProcess.arrival;
    selectedProcess.waiting = selectedProcess.turnaround - selectedProcess.burst;

    completed++;

    result.push({
      id: selectedProcess.id,
      arrival: selectedProcess.arrival,
      burst: selectedProcess.burst,
      completion: selectedProcess.completion,
      turnaround: selectedProcess.turnaround,
      waiting: selectedProcess.waiting,
      ganttValues: selectedProcess.ganttValues,
    });
  }

  return result;
};

export default SJF;

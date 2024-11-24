const Priority = (processes) => {
  const n = processes.length;
  let currentTime = 0;
  let result = [];

  // Initialize the processes with their arrival, burst, and priority
  processes = processes.map((p) => ({
    id: p.id,
    arrival: parseInt(p.arrival, 10),
    burst: parseInt(p.burst, 10),
    priority: parseInt(p.priority, 10),
    remaining: parseInt(p.burst, 10),
    completion: 0,
    turnaround: 0,
    waiting: 0,
    completionPercentage: [],
    ganttValues: [],
  }));

  // Sort processes by arrival time initially
  processes.sort((a, b) => a.arrival - b.arrival);

  let previousIndex = -1;
  let startTime = 0;

  // While there are unprocessed processes
  while (processes.some((p) => p.completion === 0)) {
    // Filter processes that have arrived and are not completed
    const readyQueue = processes.filter(
      (p) => p.arrival <= currentTime && p.completion === 0
    );

    if (readyQueue.length === 0) {
      // If no processes are ready, increment the current time
      currentTime++;
      continue;
    }

    // Select the process with the highest priority (lowest priority number)
    readyQueue.sort((a, b) => a.priority - b.priority);
    const selectedProcess = readyQueue[0];

    // Record the Gantt chart value when the process starts
    if (previousIndex !== -1 && previousIndex !== selectedProcess.id) {
      processes[previousIndex].ganttValues.push([startTime, currentTime]);
      startTime = currentTime;
    }

    // Execute the selected process for 1 unit of time
    selectedProcess.remaining--;

    // Track completion percentage as the process runs
    selectedProcess.completionPercentage.push(
      parseFloat(
        ((selectedProcess.burst - selectedProcess.remaining) / selectedProcess.burst) *
          100
      ).toFixed(2)
    );

    // Update the current time after executing the process
    currentTime++;

    // If the process has completed execution
    if (selectedProcess.remaining === 0) {
      // Update the process's completion time
      selectedProcess.completion = currentTime;

      // Calculate turnaround time and waiting time
      selectedProcess.turnaround = selectedProcess.completion - selectedProcess.arrival;
      selectedProcess.waiting = selectedProcess.turnaround - selectedProcess.burst;

      // Store the result for the completed process
      result.push({
        id: selectedProcess.id,
        arrival: selectedProcess.arrival,
        burst: selectedProcess.burst,
        priority: selectedProcess.priority,
        completion: selectedProcess.completion,
        turnaround: selectedProcess.turnaround,
        waiting: selectedProcess.waiting,
        completionPercentage: selectedProcess.completionPercentage,
        ganttValues: selectedProcess.ganttValues, // Save the Gantt chart
      });

      // Record the last Gantt chart value for the completed process
      selectedProcess.ganttValues.push([startTime, currentTime]);
    }

    // Update the previous process index
    previousIndex = selectedProcess.id;
  }

  return result;
};

export default Priority;

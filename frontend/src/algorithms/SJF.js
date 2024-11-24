const SJF = (processes) => {
  const n = processes.length;
  let currentTime = 0;
  let completed = 0;
  let result = [];

  // Initialize the processes with their arrival, burst, and remaining burst times
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

  let previousIndex = -1;
  let startTime = 0;

  // While not all processes are completed
  while (completed < n) {
    // Find all processes that have arrived and are not completed
    const readyQueue = processes.filter(
      (p) => p.arrival <= currentTime && p.completion === 0
    );

    if (readyQueue.length === 0) {
      // If no process is ready, increment time
      currentTime++;
      continue;
    }

    // Select the process with the shortest burst time
    readyQueue.sort((a, b) => a.burst - b.burst);
    const selectedProcess = readyQueue[0];

    // Record the Gantt chart value when the process starts
    if (previousIndex !== -1 && previousIndex !== selectedProcess.id) {
      processes[previousIndex].ganttValues.push([startTime, currentTime]);
      startTime = currentTime;
    }

    // Execute the selected process
    selectedProcess.remaining = 0;
    selectedProcess.completion = currentTime + selectedProcess.burst;

    // Track completion percentage as the process runs
    selectedProcess.completionPercentage.push(
      parseFloat(((selectedProcess.burst - selectedProcess.remaining) / selectedProcess.burst) * 100).toFixed(2)
    );

    // Calculate turnaround time and waiting time
    selectedProcess.turnaround = selectedProcess.completion - selectedProcess.arrival;
    selectedProcess.waiting = selectedProcess.turnaround - selectedProcess.burst;

    // Update current time and increment completed count
    currentTime = selectedProcess.completion;
    completed++;

    // Store the completed process in the result array
    result.push({
      id: selectedProcess.id,
      arrival: selectedProcess.arrival,
      burst: selectedProcess.burst,
      completion: selectedProcess.completion,
      turnaround: selectedProcess.turnaround,
      waiting: selectedProcess.waiting,
      completionPercentage: selectedProcess.completionPercentage,
      ganttValues: selectedProcess.ganttValues, // Save the Gantt chart
    });

    // Log process completion (for debugging purposes)
    console.log(`Process ${selectedProcess.id} completed at time ${currentTime}`);
    
    // Update the previous process index
    previousIndex = selectedProcess.id;
  }

  return result;
};

export default SJF;

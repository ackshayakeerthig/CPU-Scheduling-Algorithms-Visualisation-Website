const FCFS = (processes) => {
  const n = processes.length;
  let currentTime = 0;
  let result = [];

  // Initialize the processes with their arrival, burst, and remaining times
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

  // Iterate through processes in arrival order
  processes.forEach((process, index) => {
    // If the CPU is idle, fast forward time to the arrival of the next process
    if (currentTime < process.arrival) {
      currentTime = process.arrival;
    }

    // Record the Gantt chart value when the process starts
    if (previousIndex !== -1 && previousIndex !== index) {
      processes[previousIndex].ganttValues.push([startTime, currentTime]);
      startTime = currentTime;
    }

    // Process execution for 1 unit of time at a time
    let processExecutionTime = process.burst;

    // Track the completion percentage as the process executes
    for (let timeUnit = 0; timeUnit < processExecutionTime; timeUnit++) {
      process.remaining--;

      // Store completion percentage during execution
      process.completionPercentage.push(
        parseFloat(
          ((processExecutionTime - process.remaining) / processExecutionTime) * 100
        ).toFixed(2)
      );

      currentTime++;
    }

    // After process completes, set times and store results
    process.completion = currentTime;
    process.turnaround = process.completion - process.arrival;
    process.waiting = process.turnaround - process.burst;

    // Record the Gantt chart value for the process completion
    processes[index].ganttValues.push([startTime, currentTime]);

    // Store the result for the completed process
    result.push({
      id: process.id,
      arrival: process.arrival,
      burst: process.burst,
      completion: process.completion,
      turnaround: process.turnaround,
      waiting: process.waiting,
      completionPercentage: process.completionPercentage,
      ganttValues: process.ganttValues, // Save the Gantt chart
    });

    // Update the previous index
    previousIndex = index;
    startTime = currentTime;
  });

  return result;
};

export default FCFS;

const RoundRobin = (processes, quantum) => {
  const n = processes.length;
  let currentTime = 0;
  let queue = [];
  let result = [];

  // Initialize processes with their arrival, burst, and remaining burst times
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

  // Add first set of processes to the queue
  queue.push(...processes.filter((p) => p.arrival <= currentTime));

  let previousIndex = -1;
  let startTime = 0;

  // Loop until all processes are completed
  while (queue.length > 0 || processes.some((p) => p.remaining > 0)) {
    if (queue.length === 0) {
      // If no process is ready, fast-forward time to the next arrival
      currentTime++;
      queue.push(...processes.filter((p) => p.arrival === currentTime));
      continue;
    }

    // Dequeue the next process
    const process = queue.shift();

    // Calculate time slice for execution
    const timeSlice = Math.min(process.remaining, quantum);

    // Record the Gantt chart value when the process starts
    if (previousIndex !== -1 && previousIndex !== process.id) {
      processes[previousIndex].ganttValues.push([startTime, currentTime]);
      startTime = currentTime;
    }

    // Execute the process for the time slice
    process.remaining -= timeSlice;

    // Track completion percentage as the process runs
    process.completionPercentage.push(
      parseFloat(
        ((process.burst - process.remaining) / process.burst) * 100
      ).toFixed(2)
    );

    currentTime += timeSlice;

    // Log execution (for debugging purposes)
    console.log(
      `Time ${currentTime - timeSlice}-${currentTime}: Process ${process.id} executed for ${timeSlice} unit(s)`
    );

    // Add newly arrived processes to the queue
    queue.push(
      ...processes.filter(
        (p) =>
          p.arrival > currentTime - timeSlice &&
          p.arrival <= currentTime &&
          p.remaining > 0
      )
    );

    if (process.remaining > 0) {
      // If the process is not finished, re-add it to the queue
      queue.push(process);
    } else {
      // If the process is finished, calculate its metrics
      process.completion = currentTime;
      process.turnaround = process.completion - process.arrival;
      process.waiting = process.turnaround - process.burst;

      // Record the last Gantt chart value for the completed process
      process.ganttValues.push([startTime, currentTime]);

      // Store completed process results
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

      // Log process completion (for debugging purposes)
      console.log(`Process ${process.id} completed at time ${currentTime}`);
    }

    // Update the previous process index
    previousIndex = process.id;
  }

  return result;
};

export default RoundRobin;

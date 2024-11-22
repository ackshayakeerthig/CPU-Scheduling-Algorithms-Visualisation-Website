const FCFS = (processes) => {

    const n = processes.length;
    let currentTime = 0;
    let result = [];
  
    // Initialize the processes with their arrival and burst times
    processes = processes.map((p) => ({
      id: p.id,
      arrival: parseInt(p.arrival, 10),
      burst: parseInt(p.burst, 10),
      completion: 0,
      turnaround: 0,
      waiting: 0,
    }));
  
    // Sort processes by arrival time
    processes.sort((a, b) => a.arrival - b.arrival);
  
    // Iterate through processes in arrival order
    processes.forEach((process) => {
      // If the CPU is idle, fast forward time to the arrival of the next process
      if (currentTime < process.arrival) {
        currentTime = process.arrival;
      }
  
      // Calculate completion, turnaround, and waiting times
      process.completion = currentTime + process.burst;
      process.turnaround = process.completion - process.arrival;
      process.waiting = process.turnaround - process.burst;
  
      // Update current time to the completion time of the current process
      currentTime = process.completion;
  
      // Store the result
      result.push({
        id: process.id,
        arrival: process.arrival,
        burst: process.burst,
        completion: process.completion,
        turnaround: process.turnaround,
        waiting: process.waiting,
      });
    });
  
    return result;
  };
  
  export default FCFS;
  
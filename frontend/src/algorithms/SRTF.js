const calculateSRTF = (processes) => {
  const n = processes.length;
  let currentTime = 0;
  let completed = 0;
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
  }));

  // Sort processes by arrival time
  processes.sort((a, b) => a.arrival - b.arrival);

  // While not all processes are completed
  while (completed < n) {
    let idx = -1;
    let minRemainingTime = Number.MAX_VALUE;

    // Find the process with the shortest remaining time that has arrived
    for (let i = 0; i < n; i++) {
      if (
        processes[i].arrival <= currentTime && // Process has arrived
        processes[i].remaining > 0 && // Process hasn't completed
        processes[i].remaining < minRemainingTime // Find the shortest remaining time
      ) {
        idx = i;
        minRemainingTime = processes[i].remaining;
      }
    }

    if (idx === -1) {
      // No process is ready to run, increment the time
      currentTime++;
      continue;
    }

    // Execute the selected process for 1 unit of time
    processes[idx].remaining--;
    
    // Track completion percentage as the process runs
    processes[idx].completionPercentage.push(
      ((1 - processes[idx].remaining / processes[idx].burst) * 100).toFixed(2)
    );
    
    currentTime++;

    // If the process has completed execution
    if (processes[idx].remaining === 0) {
      completed++;

      // Set the completion time and calculate turnaround and waiting times
      processes[idx].completion = currentTime;
      processes[idx].turnaround = processes[idx].completion - processes[idx].arrival;
      processes[idx].waiting = processes[idx].turnaround - processes[idx].burst;

      // Store the completed process results
      result.push({
        id: processes[idx].id,
        arrival: processes[idx].arrival,
        burst: processes[idx].burst,
        completion: processes[idx].completion,
        turnaround: processes[idx].turnaround,
        waiting: processes[idx].waiting,
        completionPercentage: processes[idx].completionPercentage, // Save the completion percentages
      });
    }
  }

  return result;
};

export default calculateSRTF;

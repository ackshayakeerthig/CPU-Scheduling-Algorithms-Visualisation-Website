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
      completion: 0,
      turnaround: 0,
      waiting: 0,
    }));
  
    // Sort processes by arrival time initially
    processes.sort((a, b) => a.arrival - b.arrival);
  
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
  
      // Update the selected process's completion time
      selectedProcess.completion = currentTime + selectedProcess.burst;
  
      // Calculate turnaround time and waiting time
      selectedProcess.turnaround =
        selectedProcess.completion - selectedProcess.arrival;
      selectedProcess.waiting =
        selectedProcess.turnaround - selectedProcess.burst;
  
      // Update current time to the selected process's completion time
      currentTime = selectedProcess.completion;
  
      // Store the result
      result.push({
        id: selectedProcess.id,
        arrival: selectedProcess.arrival,
        burst: selectedProcess.burst,
        priority: selectedProcess.priority,
        completion: selectedProcess.completion,
        turnaround: selectedProcess.turnaround,
        waiting: selectedProcess.waiting,
      });
    }
  
    return result;
  };
  
  export default Priority;
  
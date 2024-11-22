const SJF = (processes) => {
    const n = processes.length;
    let currentTime = 0;
    let completed = 0;
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
  
    // Sort processes by arrival time initially
    processes.sort((a, b) => a.arrival - b.arrival);
  
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
  
      // Update the selected process's completion time
      selectedProcess.completion = currentTime + selectedProcess.burst;
  
      // Calculate turnaround time and waiting time
      selectedProcess.turnaround =
        selectedProcess.completion - selectedProcess.arrival;
      selectedProcess.waiting =
        selectedProcess.turnaround - selectedProcess.burst;
  
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
      });
    }
  
    return result;
  };
  
  export default SJF;
  
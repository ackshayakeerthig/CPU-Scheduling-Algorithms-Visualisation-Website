import Heap from 'heap-js';


const SJF = (processes) => {
  const n = processes.length;
  let currentTime = 0;
  let completed = 0;
  let result = [];

  // Preprocess
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

  processes.sort((a, b) => a.arrival - b.arrival);

  // Create MinHeap: compare by burst time
  const heap = new Heap((a, b) => a.burst - b.burst);

  let arrivalIndex = 0;

  while (completed < n) {
    // Add arrived processes to heap
    while (arrivalIndex < n && processes[arrivalIndex].arrival <= currentTime) {
      heap.push(processes[arrivalIndex]);
      arrivalIndex++;
    }

    if (heap.size() === 0) {
      currentTime++;
      continue;
    }

    const selected = heap.pop();

    selected.ganttValues.push([currentTime, currentTime + selected.burst]);

    currentTime += selected.burst;
    selected.completion = currentTime;
    selected.turnaround = currentTime - selected.arrival;
    selected.waiting = selected.turnaround - selected.burst;
    selected.remaining = 0;

    completed++;

    result.push({
      id: selected.id,
      arrival: selected.arrival,
      burst: selected.burst,
      completion: selected.completion,
      turnaround: selected.turnaround,
      waiting: selected.waiting,
      ganttValues: selected.ganttValues,
    });
  }

  return result;
};

export default SJF;

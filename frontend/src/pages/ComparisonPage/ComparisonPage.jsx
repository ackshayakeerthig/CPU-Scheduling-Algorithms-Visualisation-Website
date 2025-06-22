import React from "react";
import "./ComparisonPage.css";

const ComparisonPage = () => {
  return (
    <div className="comparison-container">
      <h1>Comparative Study of CPU Scheduling Algorithms</h1>

      <section>
        <h2>1. Introduction</h2>
        <p>
          CPU scheduling algorithms decide the order of execution of processes in a CPU. 
          Efficient scheduling optimizes overall performance. While general-purpose systems focus on maximizing throughput and minimizing turnaround time, real-time systems like avionics or industrial controls prioritize meeting strict deadlines.
        </p>
      </section>

      <section>
        <h2>2. Key Performance Metrics</h2>
        <ul>
          <li><strong>CPU Utilization:</strong> % time CPU is busy.</li>
          <li><strong>Throughput:</strong> No. of processes completed per unit time.</li>
          <li><strong>Turnaround Time:</strong> Completion time - Arrival time.</li>
          <li><strong>Waiting Time:</strong> Turnaround time - Burst time.</li>
          <li><strong>Response Time:</strong> Time from request to first execution.</li>
          <li><strong>Starvation:</strong> Likelihood of a process waiting indefinitely.</li>
          <li><strong>Deadline Miss Rate:</strong> % of real-time tasks missing deadlines.</li>
          <li><strong>Schedulability Bound:</strong> Max CPU load without missing deadlines (real-time only).</li>
        </ul>
      </section>

      <section>
        <h2>3. Example Scenario</h2>
        <p>Consider this task set used for comparison:</p>
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Task</th>
              <th>Arrival Time</th>
              <th>Burst Time</th>
              <th>Deadline</th>
              <th>Period</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>T1</td><td>0 ms</td><td>1 ms</td><td>4 ms</td><td>4 ms</td></tr>
            <tr><td>T2</td><td>0 ms</td><td>2 ms</td><td>5 ms</td><td>5 ms</td></tr>
            <tr><td>T3</td><td>0 ms</td><td>1 ms</td><td>10 ms</td><td>10 ms</td></tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>4. Comparative Analysis Table</h2>
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Algorithm</th>
              <th>CPU Utilization</th>
              <th>Avg Waiting Time</th>
              <th>Response Time</th>
              <th>Starvation</th>
              <th>Missed Deadlines</th>
              <th>Schedulability Bound</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>FCFS</td>
              <td>50–60%</td>
              <td>High</td>
              <td>High</td>
              <td>No</td>
              <td>Yes</td>
              <td>N/A</td>
              <td>Simple but unfair to short jobs</td>
            </tr>
            <tr>
              <td>SJF</td>
              <td>70–90%</td>
              <td>Low</td>
              <td>Medium</td>
              <td>Yes</td>
              <td>Yes</td>
              <td>N/A</td>
              <td>Optimal avg waiting but prone to starvation</td>
            </tr>
            <tr>
              <td>SRTF</td>
              <td>80–95%</td>
              <td>Very Low</td>
              <td>Low</td>
              <td>Yes (worse)</td>
              <td>Yes</td>
              <td>N/A</td>
              <td>Best for short jobs, bad for long jobs</td>
            </tr>
            <tr>
              <td>Round Robin</td>
              <td>65–75%</td>
              <td>Medium</td>
              <td>Low</td>
              <td>No</td>
              <td>Sometimes</td>
              <td>N/A</td>
              <td>Fair and responsive; quantum tuning needed</td>
            </tr>
            <tr>
              <td>RMS</td>
              <td>90–95%</td>
              <td>Low</td>
              <td>Very Low</td>
              <td>No</td>
              <td>No (if U ≤ n(2^(1/n) - 1))</td>
              <td>≈ 69.3% (for n→∞)</td>
              <td>Static priority, good for periodic tasks</td>
            </tr>
            <tr>
              <td>EDF</td>
              <td>95–100%</td>
              <td>Very Low</td>
              <td>Very Low</td>
              <td>No</td>
              <td>No (if U ≤ 100%)</td>
              <td>100%</td>
              <td>Best for dynamic real-time systems</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section>
        <h2>5. Conclusion</h2>
        <p>
          While FCFS and SJF are simple to implement, they perform poorly under load and do not handle real-time constraints well. 
          SRTF provides optimal average turnaround but suffers from starvation. Round Robin balances fairness and responsiveness.
          In real-time systems, <strong>EDF</strong> provides the best schedulability and utilization, but is complex to implement due to dynamic priority changes. 
          <strong>RMS</strong> offers guaranteed scheduling for periodic tasks within its bound and is widely used in safety-critical systems.
        </p>
      </section>
    </div>
  );
};

export default ComparisonPage;

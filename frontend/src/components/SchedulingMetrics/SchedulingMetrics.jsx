import React from "react";
import "./SchedulingMetrics.css";

const SchedulingMetrics = ({ processes = [] }) => {
  // Calculate metrics for each process
  const metrics = processes.map((process) => {
    const { ganttValues } = process;
    const arrivalTime = process.arrivalTime || 0; // Assuming arrivalTime exists in the process
    const completionTime = ganttValues[ganttValues.length - 1][1]; // End time of the last segment
    const totalBurstTime = ganttValues.reduce(
      (sum, [start, end]) => sum + (end - start),
      0
    );
    const waitTime = completionTime - arrivalTime - totalBurstTime;
    const turnAroundTime = completionTime - arrivalTime;

    return {
      id: process.id,
      waitTime,
      completionTime,
      turnAroundTime,
    };
  });

  // Calculate averages
  const totalWaitTime = metrics.reduce((sum, m) => sum + m.waitTime, 0);
  const totalCompletionTime = metrics.reduce(
    (sum, m) => sum + m.completionTime,
    0
  );
  const totalTurnAroundTime = metrics.reduce(
    (sum, m) => sum + m.turnAroundTime,
    0
  );
  const avgWaitTime = metrics.length > 0 ? totalWaitTime / metrics.length : 0;
  const avgCompletionTime =
    metrics.length > 0 ? totalCompletionTime / metrics.length : 0;
  const avgTurnAroundTime =
    metrics.length > 0 ? totalTurnAroundTime / metrics.length : 0;

  return (
    <div>
      <h1 style={{ margin: "7% 0" }}>Scheduling Metrics</h1>

      <div className="metrics-div">
        <strong>Average Wait Time:</strong> {avgWaitTime.toFixed(2)} s
      </div>
      <div className="metrics-div">
        <strong>Average Turn Around Time:</strong>{" "}
        {avgTurnAroundTime.toFixed(2)} s
      </div>
      <div className="metrics-div">
        <strong>Average Completion Time:</strong> {avgCompletionTime.toFixed(2)}{" "}
        s
      </div>
    </div>
  );
};

export default SchedulingMetrics;

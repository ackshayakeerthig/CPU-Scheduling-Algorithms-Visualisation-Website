import { useState } from "react";
import FormTemplate from "../../components/Template/FormTemplate";
import "./OutputCard.css";
import GanttChart from "../GanttChart/GanttChart";
import SimulatedClock from "../ProgessBars/SimulatedClock";
import SchedulingMetrics from "../SchedulingMetrics/SchedulingMetrics";

function OutputCard({ algorithm, calculateAlgorithm }) {
  const [output, setOutput] = useState([]);
  console.log("Output array : ", output);

  return (
    <div className="card-container">
      <div className="dashboard">
        <div className="upper-section">
          <div className="input-section">
            <FormTemplate
              algorithm={algorithm}
              setOutput={setOutput}
              calculateAlgorithm={calculateAlgorithm}
            />
          </div>
          <div className="progress-section">
            <h1>Progress Bars</h1>
            {output.length > 0 ? (
              <SimulatedClock processes={output} tickRate={1000} />
            ) : null}
          </div>
        </div>
        <div className="lower-section">
          <div className="output-table-secheduling-metrics">
            <div className="output-table-section">
              <OutputTable output={output} algorithm={algorithm} />
            </div>
            <div className="scheduling-metrics-section">
              <SchedulingMetrics processes={output} />
            </div>
          </div>
          <div className="gantt-section">
            <h1>Gantt Chart</h1>
            {output.length > 0 ? <GanttChart processes={output} /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function OutputTable({ output, algorithm }) {
  const tableHeadings = [
    "Process",
    "Arrival",
    "Burst",
    "Completion",
    "Turnaround",
    "Waiting",
    ...(algorithm === "EarliestDeadlineFirst"
      ? ["Missed Deadline"]
      : [])
  ];

  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <h1 style={{ color: "#000000" }} className="output-table-title">
          Live Output Table
        </h1>
      </div>
      <table className="output-table">
        <TableHead headings={tableHeadings} />
        <TableBody processes={output} algorithm={algorithm} />
      </table>
    </>
  );
}

function TableHead({ headings }) {
  return (
    <thead>
      <tr>
        {headings.map((heading, index) => (
          <th key={index}>{heading}</th>
        ))}
      </tr>
    </thead>
  );
}

function TableBody({ processes, algorithm }) {
  return (
    <tbody>
      {processes.map((process, index) => (
        <tr key={index}>
          <td>{process.id}</td>
          <td>{process.arrival}</td>
          <td>{process.burst}</td>
          <td>{process.completion}</td>
          <td>{process.turnaround}</td>
          <td>{process.waiting}</td>
          {(algorithm === "EarliestDeadlineFirst") && (
            <td>{process.missedDeadline ? "Yes" : "No"}</td>
          )}
        </tr>
      ))}
    </tbody>
  );
}

export default OutputCard;

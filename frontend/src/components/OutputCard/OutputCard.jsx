import { useState } from "react";
import FormTemplate from "../../components/Template/FormTemplate";
import "./OutputCard.css";

function OutputCard({ algorithm, calculateAlgorithm }) {
  const [output, setOutput] = useState([]);

  return (
    <div className="card-container">
      <div className="dashboard">
        <div className="input-section">
          <FormTemplate
            algorithm={algorithm}
            setOutput={setOutput}
            calculateAlgorithm={calculateAlgorithm}
          />
        </div>
        <div className="output-section">
          <OutputTable output={output} />
        </div>
      </div>

      {/* Render Gantt chart */}
    </div>
  );
}

function OutputTable({ output }) {
  const tableHeadings = [
    "Process",
    "Arrival",
    "Burst",
    "Completion",
    "Turnaround",
    "Waiting",
  ];

  return (
    <>
      <div style={{ display:"flex", justifyContent:"center", width:"100%"}}>
        <h1 style={{ color: "#000000" }}>Live Output Table</h1>
      </div>
      <table className="output-table">
        <TableHead headings={tableHeadings} />
        <TableBody processes={output} />
      </table>
    </>
  );
}

function TableHead({ headings }) {
  return (
    <thead>
      <tr>
        {headings.map((heading) => (
          <th>{heading}</th>
        ))}
      </tr>
    </thead>
  );
}

function TableBody({ processes }) {
  return (
    <tbody>
      {processes.map((process) => {
        console.log(process); // Log the process here
        return (
          <tr key={process.id}>
            <td>{process.id}</td>
            <td>{process.arrival}</td>
            <td>{process.burst}</td>
            <td>{process.completion}</td>
            <td>{process.turnaround}</td>
            <td>{process.waiting}</td>
          </tr>
        );
      })}
    </tbody>
  );
}

export default OutputCard;

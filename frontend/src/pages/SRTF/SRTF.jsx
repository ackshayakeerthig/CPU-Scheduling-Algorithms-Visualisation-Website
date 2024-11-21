import React, { useState } from "react";
import "./SRTF.css";
import FormTemplate from "../../components/Template/FormTemplate";
import calculateSRTF from "../../algorithms/SRTF";

const SRTF = () => {
  const [output, setOutput] = useState([]);

  return (
    <div className="srtf-container">
      <div className="dashboard">
        <div className="input-section">
          <FormTemplate
            algorithm="SRTF"
            setOutput={setOutput}
            calculateAlgorithm={calculateSRTF}
          />
        </div>
        <div className="output-section">
          <h1 style={{ textAlign: "center", color: "#000000" }}>
            Live Output Table
          </h1>
          <table className="output-table">
            <thead>
              <tr>
                <th>Process</th>
                <th>Arrival</th>
                <th>Burst</th>
                <th>Completion</th>
                <th>Turnaround</th>
                <th>Waiting</th>
              </tr>
            </thead>
            <tbody>
              {output.map((process) => (
                <tr key={process.id}>
                  <td>{process.id}</td>
                  <td>{process.arrival}</td>
                  <td>{process.burst}</td>
                  <td>{process.completion}</td>
                  <td>{process.turnaround}</td>
                  <td>{process.waiting}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Render Gantt chart */}
      {output.length > 0 && <GanttChart result={output} />}
    </div>
  );
};

export default SRTF;

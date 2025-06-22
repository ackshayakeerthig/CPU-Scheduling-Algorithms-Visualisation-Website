import React, { useState } from "react";
import "./FormTemplate.css";

const getKeyForField = (field) => {
  switch (field) {
    case "Process ID":
      return "id";
    case "Arrival Time":
      return "arrival";
    case "Burst Time":
      return "burst";
    case "Priority":
      return "priority";
    case "Period":
      return "period";
    default:
      return field.toLowerCase().replace(/\s/g, "");
  }
};

const FormTemplate = ({ algorithm, setOutput, calculateAlgorithm }) => {
  const [processes, setProcesses] = useState([
    { id: "", arrival: "", burst: "", priority: "", period: "" },
  ]);
  const [quantum, setQuantum] = useState("");
  const [simulationTime, setSimulationTime] = useState(100); // default for RateMonotonic

  const fieldsByAlgorithm = {
    FCFS: ["Process ID", "Arrival Time", "Burst Time"],
    SJF: ["Process ID", "Arrival Time", "Burst Time"],
    SRTF: ["Process ID", "Arrival Time", "Burst Time"],
    Priority: ["Process ID", "Arrival Time", "Burst Time", "Priority"],
    RoundRobin: ["Process ID", "Arrival Time", "Burst Time"],
    RateMonotonic: ["Process ID", "Period", "Burst Time"],
    EarliestDeadlineFirst: ["Process ID", "Period", "Burst Time"]
  };

  const fields = fieldsByAlgorithm[algorithm] || [];

  const handleInputChange = (index, field, value) => {
    const key = getKeyForField(field);
    const updatedProcesses = [...processes];
    updatedProcesses[index][key] = value;
    setProcesses(updatedProcesses);
  };

  const addProcess = () => {
    setProcesses([
      ...processes,
      { id: "", arrival: "", burst: "", priority: "", period: "" },
    ]);
  };

  const removeProcess = (indexToRemove) => {
    setProcesses(processes.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Define required fields based on internal keys
    const requiredFields = {
      FCFS: ["id", "arrival", "burst"],
      SJF: ["id", "arrival", "burst"],
      SRTF: ["id", "arrival", "burst"],
      Priority: ["id", "arrival", "burst", "priority"],
      RoundRobin: ["id", "arrival", "burst"],
      RateMonotonic: ["id", "period", "burst"],
      EarliestDeadlineFirst: ["id", "period", "burst"]
    };

    const fieldsToCheck = requiredFields[algorithm] || [];

    const isValid = processes.every((p) =>
      fieldsToCheck.every((key) => p[key] !== undefined && p[key] !== "")
    );

    if (!isValid) {
      alert("Please fill in all the required fields.");
      return;
    }

    let result;

    if (algorithm === "RoundRobin") {
      result = calculateAlgorithm(processes, quantum);
    } else if (algorithm === "RateMonotonic"||
  algorithm === "EarliestDeadlineFirst") {
      result = calculateAlgorithm(processes, parseInt(simulationTime, 10));
    } else {
      result = calculateAlgorithm(processes);
    }

    setOutput(result);
  };

  const handleClearForm = () => {
    setProcesses([
      { id: "", arrival: "", burst: "", priority: "", period: "" },
    ]);
    setQuantum("");
    setSimulationTime(100);
    setOutput([]);
  };

  return (
    <div className="template-form-container">
      <h2 className="template-title">
        {algorithm === "RoundRobin" ? "Round Robin" : algorithm}
      </h2>

      <form className="template-form" onSubmit={handleSubmit}>
        {processes.map((process, index) => (
          <div key={index} className="template-process-row">
            {fields.includes("Process ID") && (
              <input
                type="text"
                placeholder="Process ID"
                className="template-input"
                value={process.id}
                onChange={(e) =>
                  handleInputChange(index, "Process ID", e.target.value)
                }
                required
              />
            )}
            {fields.includes("Arrival Time") && (
              <input
                type="number"
                placeholder="Arrival Time"
                className="template-input"
                value={process.arrival}
                onChange={(e) =>
                  handleInputChange(index, "Arrival Time", e.target.value)
                }
                min="0"
                required
              />
            )}
            {fields.includes("Period") && (
              <input
                type="number"
                placeholder="Period"
                className="template-input"
                value={process.period}
                onChange={(e) =>
                  handleInputChange(index, "Period", e.target.value)
                }
                min="1"
                required
              />
            )}
            {fields.includes("Burst Time") && (
              <input
                type="number"
                placeholder="Burst Time"
                className="template-input"
                value={process.burst}
                onChange={(e) =>
                  handleInputChange(index, "Burst Time", e.target.value)
                }
                min="1"
                required
              />
            )}
            {fields.includes("Priority") && (
              <input
                type="number"
                placeholder="Priority"
                className="template-input"
                value={process.priority}
                onChange={(e) =>
                  handleInputChange(index, "Priority", e.target.value)
                }
                min="1"
                required
              />
            )}
            <button
              type="button"
              className="template-add-btn"
              onClick={addProcess}
            >
              +
            </button>
            <button
              type="button"
              className="template-remove-btn"
              onClick={() => removeProcess(index)}
            >
              -
            </button>
          </div>
        ))}

        {algorithm === "RoundRobin" && (
          <div className="template-quantum">
            <label htmlFor="quantum">Time Quantum:</label>
            <input
              type="number"
              id="quantum"
              placeholder="Quantum"
              className="template-input"
              value={quantum}
              onChange={(e) => setQuantum(e.target.value)}
              min="1"
              required
            />
          </div>
        )}

        {algorithm === "RateMonotonic"|| algorithm === "EarliestDeadlineFirst" && (
          <div className="template-quantum">
            <label htmlFor="simulationTime">Simulation Time:</label>
            <input
              type="number"
              id="simulationTime"
              placeholder="Simulation Time"
              className="template-input"
              value={simulationTime}
              onChange={(e) => setSimulationTime(e.target.value)}
              min="1"
              required
            />
          </div>
        )}

        <div className="template-submit-div-btn">
          <button type="submit" className="template-submit-btn">
            Run
          </button>
          <button
            type="button"
            className="template-clear-btn"
            onClick={handleClearForm}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormTemplate;

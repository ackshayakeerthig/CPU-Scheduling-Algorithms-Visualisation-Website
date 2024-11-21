import React from "react";
import { useState } from "react";
import "./FCFS.css";
import FormTemplate from "../../components/Template/FormTemplate";
import { useLocation } from "react-router-dom";
import calculateSRTF from "../../algorithms/SRTF";

const FCFS = () => {
  const location = useLocation();
  const algorithm = location.pathname.substring(1);
  const [output, setOutput] = useState([]);

  return (
    <>
      <div className="input-section">
        <FormTemplate
          algorithm="FCFS"
          setOutput={setOutput}
          calculateAlgorithm={calculateSRTF}
        />
      </div>
    </>
  );
};

export default FCFS;

import { useState } from "react";
import "./SRTF.css";
import OutputCard from "../../components/OutputCard/OutputCard";
import calculateSRTF from "../../algorithms/SRTF";

const SRTF = () => {

  return (
    <OutputCard algorithm="SRTF" calculateAlgorithm={calculateSRTF}/>
  
  );
};

export default SRTF;

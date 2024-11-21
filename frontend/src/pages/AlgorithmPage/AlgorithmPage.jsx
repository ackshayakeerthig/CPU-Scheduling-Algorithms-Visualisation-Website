import "./AlgorithmPage.css";
import React from "react";
import OutputCard from "../../components/OutputCard/OutputCard";



const algorithms = {
  SRTF: React.lazy(() => import("../../algorithms/SRTF.js")),
	FCFS: React.lazy(() => import("../../algorithms/FCFS.js")),
	RoundRobin: React.lazy(() => import("../../algorithms/RR.js")),
	Priority: React.lazy(() => import("../../algorithms/priority.js")),
	SJF: React.lazy(() => import("../../algorithms/SJF.js")),
};

function selectAlgorithm(algorithmName) {
  return algorithms[algorithmName];
}

function AlgorithmPage({ algorithmName }) {
  return (
    <OutputCard algorithm={algorithmName} calculateAlgorithm={selectAlgorithm(algorithmName)} />
  );
}

export default AlgorithmPage;

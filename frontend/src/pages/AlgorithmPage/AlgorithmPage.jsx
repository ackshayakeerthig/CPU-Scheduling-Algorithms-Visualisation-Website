import "./AlgorithmPage.css";
import React from "react";
import OutputCard from "../../components/OutputCard/OutputCard";



const algorithms = {
  SRTF: React.lazy(() => import("../../algorithms/SRTF.js")),
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

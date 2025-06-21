import "./App.css";
import Home from "./components/Home/Home";
import ParticleBackground from "./components/ParticleBackground/ParticleBackground";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AlgorithmPage from "./pages/AlgorithmPage/AlgorithmPage";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <>
      <Analytics />
      <BrowserRouter>
        <ParticleBackground />
        <Link to={"/"} className="home-btn" style={{ zIndex: "1" }}>
          Home
        </Link>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/FCFS"
            element={<AlgorithmPage algorithmName="FCFS" />}
          />
          <Route path="/SJF" element={<AlgorithmPage algorithmName="SJF" />} />
          <Route
            path="/SRTF"
            element={<AlgorithmPage algorithmName="SRTF" />}
          />
          <Route
            path="/Priority"
            element={<AlgorithmPage algorithmName="Priority" />}
          />
          <Route
            path="/RoundRobin"
            element={<AlgorithmPage algorithmName="RoundRobin" />}
          />
          <Route
            path="/RateMonotonic"
            element={<AlgorithmPage algorithmName="RateMonotonic" />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

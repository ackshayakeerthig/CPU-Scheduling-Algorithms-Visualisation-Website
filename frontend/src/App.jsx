import "./App.css";
import Home from "./components/Home/Home";
import ParticleBackground from "./components/ParticleBackground/ParticleBackground";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import FCFS from "./Pages/FCFS/FCFS";
import SJF from "./Pages/SJF/SJF";
import SRTF from "./Pages/SRTF/SRTF";
import PriorityPreemtive from "./Pages/PriorityPreemptive/PriorityPreemtive";
import RR from "./Pages/RR/RR";

function App() {
  return (
    <>
      <BrowserRouter>
        <ParticleBackground />
        <Link to={"/"} className="home-btn" style={{zIndex:'1'}}>
          Home
        </Link>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/FCFS" element={<FCFS />} />
          <Route path="/SJF" element={<SJF />} />
          <Route path="/SRTF" element={<SRTF />} />
          <Route path="/Priority" element={<PriorityPreemtive />} />
          <Route path="/RoundRobin" element={<RR />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

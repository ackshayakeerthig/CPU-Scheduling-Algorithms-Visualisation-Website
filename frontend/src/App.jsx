import "./App.css";
import Home from "./components/Home/Home";
import ParticleBackground from "./components/ParticleBackground/ParticleBackground";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import FCFS from "./pages/FCFS/FCFS.jsx";
import SJF from "./pages/SJF/SJF.jsx";
import SRTF from "./pages/SRTF/SRTF.jsx";
import PriorityPreemtive from "./pages/PriorityPreemptive/PriorityPreemtive.jsx"
import RR from './pages/RR/RR.jsx'
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

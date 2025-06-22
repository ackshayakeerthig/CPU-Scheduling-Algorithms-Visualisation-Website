import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <> 
    <br/>
    <br/>
    <br/>
    <div className="about-us-wrapper">
          <button className="about-us-btn">About Us</button>
          <div className="about-us-dropdown">
            <ul>
              <li><strong>Ackshaya Keerthi G</strong> – 1RV23CS013 – ackshayak.cs23@rvce.edu.in</li>
              <li><strong>Aishwarya V Shetty</strong> – 1RV23CS022 – aishwaryavs.cs23@rvce.edu.in</li>
            </ul>
          </div>
        </div>
      <div className="home-container">
       
        <h1 className="title">CPU Scheduling Visualizer</h1>
        <div className="algorithm-btn">
          <button onClick={() => navigate("/FCFS")}>
            First Come First Serve
          </button>
          <button onClick={() => navigate("/SJF")}>Shortest Job First</button>
          <button onClick={() => navigate("/SRTF")}>
            Shortest Remaining Time First
          </button>
          <button onClick={() => navigate("/Priority")}>
            Priority Scheduling
          </button>
          <button onClick={() => navigate("/RoundRobin")}>
            Round Robin Scheduling
          </button>
          <button onClick={() => navigate("/RateMonotonic")}>
            Rate Monotonic Scheduling
          </button>
          <button onClick={() => navigate("/Comparison")}>
           Comparison Between all algorithms
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;

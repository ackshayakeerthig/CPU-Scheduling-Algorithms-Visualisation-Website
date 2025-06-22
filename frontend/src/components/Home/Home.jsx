import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
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
          <button onClick={() => navigate("/EarliestDeadlineFirst")}>
            Earliest Deadline First
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;

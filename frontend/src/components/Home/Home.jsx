import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <>
      <div className="home-container">
        <button className="github-btn">GitHub</button>
        <h1 className="title">CPU Scheduling Visualizer</h1>
        <div className="algorithm-btn">
          <button>First Come First Serve</button>
          <button>Shortest Job First</button>
          <button>Shortest Remaining Time First</button>
          <button>Priority Scheduling</button>
          <button>Round Robin Scheduling</button>
        </div>
      </div>
    </>
  );
};

export default Home;

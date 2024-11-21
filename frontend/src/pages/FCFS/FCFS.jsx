import { useState } from "react";
import "./FCFS.css";
import { useLocation } from "react-router-dom";
import OutputCard from "../../components/OutputCard/OutputCard"


function FCFS(){
  const location = useLocation();
  const algorithm = location.pathname.substring(1);
  const [output, setOutput] = useState([]);

  return (
    <OutputCard algorithm={algorithm}/>

  );
};

export default FCFS;

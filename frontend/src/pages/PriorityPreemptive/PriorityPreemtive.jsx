import "./PriorityPreemtive.css";
import { useLocation } from "react-router-dom";
import OutputCard from "../../components/OutputCard/OutputCard";

function PriorityPreemtive() {
  const location = useLocation();
  const algorithm = location.pathname.substring(1);

  return (
    <OutputCard algorithm="Priority"/>

  );
};

export default PriorityPreemtive;

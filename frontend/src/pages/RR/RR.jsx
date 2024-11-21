import "./RR.css";
import { useLocation } from "react-router-dom";
import OutputCard from "../../components/OutputCard/OutputCard";

function RR(){
  const location = useLocation();
  const algorithm = location.pathname.substring(1);

  return (
    <OutputCard algorithm={algorithm}/>

  );
};

export default RR;

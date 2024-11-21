import "./SJF.css";
import { useLocation } from "react-router-dom";
import OutputCard from "../../components/OutputCard/OutputCard";

const SJF = () => {
  const location = useLocation();
  const algorithm = location.pathname.substring(1);

  return (
    <OutputCard algorithm={algorithm}/>

  );
};

export default SJF;

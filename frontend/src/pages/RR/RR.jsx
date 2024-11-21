import React from "react";
import "./RR.css";
import { useLocation } from "react-router-dom";
import FormTemplate from "../../components/Template/FormTemplate";

const RR = () => {
  const location = useLocation();
  const algorithm = location.pathname.substring(1);

  return (
    <>
      <FormTemplate algorithm={algorithm} />
    </>
  );
};

export default RR;

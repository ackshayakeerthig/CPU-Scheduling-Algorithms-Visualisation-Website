import React, { useState } from "react";
import "./Accordion.css";

function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <div className="accordion">
      {items.map((item, index) => (
        <div key={index} className="accordion-item">
          <button
            className="accordion-question"
            onClick={() => toggleIndex(index)}
          >
            {item.question}
            <span className="accordion-icon">
              {openIndex === index ? "▲" : "▼"}
            </span>
          </button>
          <div
            className={`accordion-answer ${openIndex === index ? "open" : ""}`}
          >
            <p>{item.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Accordion;

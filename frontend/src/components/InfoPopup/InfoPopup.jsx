import React, { useEffect, useState } from "react";
import "./InfoPopup.css";

const InfoPopup = ({ algorithmName }) => {
  const [info, setInfo] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetch(`/algorithmInfo/${algorithmName}.json`)
      .then((res) => res.json())
      .then((data) => setInfo(data))
      .catch((err) => console.error("Error loading JSON:", err));
  }, [algorithmName]);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  return (
    <>
      <button className="info-btn" onClick={openPopup}>
        Learn
      </button>

      {isOpen && (
        <div className="popup-overlay">
          <div className="popup-modal">
            <button className="close-btn" onClick={closePopup}>
              &times;
            </button>
            {info ? (
              <>
                <h2>{info.title}</h2>
                <p>
                  <strong>Definition:</strong> {info.definition}
                </p>
                <p>
                  <strong>Explanation:</strong> {info.explanation}
                </p>
              </>
            ) : (
              <p>Loading info...</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default InfoPopup;

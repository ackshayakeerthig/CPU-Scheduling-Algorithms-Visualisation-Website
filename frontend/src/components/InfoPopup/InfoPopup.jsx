import React, { useEffect, useState } from "react";
import "./InfoPopup.css";

function InfoPopup({ algorithmName }) {
  const [isOpen, setIsOpen] = useState(false);
  const [info, setInfo] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetch(`/algorithmInfo/${algorithmName}.json`)
        .then((res) => res.json())
        .then((data) => setInfo(data))
        .catch((err) => console.error("Error fetching info:", err));
    }
  }, [isOpen, algorithmName]);

  const togglePopup = () => setIsOpen(!isOpen);

  return (
    <>
      <button className="info-btn" onClick={togglePopup}>
        Info
      </button>

      {isOpen && (
        <div className="popup-overlay" onClick={togglePopup}>
          <div className="popup-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={togglePopup}>
              &times;
            </button>

            {info ? (
              <div className="popup-content">
                <h2>{algorithmName} Algorithm</h2>

                <section>
                  <h3>📘 Definition</h3>
                  <p>{info.definition}</p>
                </section>

                <section>
                  <h3>⚙️ Working</h3>
                  <p>{info.working.description}</p>

                  {info.working.example?.processTable && (
                    <>
                      <h4>Example Process Table</h4>
                      <table>
                        <thead>
                          <tr>
                            {info.working.example.processTable.headers.map(
                              (header, idx) => (
                                <th key={idx}>{header}</th>
                              )
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {info.working.example.processTable.rows.map(
                            (row, i) => (
                              <tr key={i}>
                                {row.map((cell, j) => (
                                  <td key={j}>{cell}</td>
                                ))}
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </>
                  )}

                  {info.working.example?.ganttChartImage && (
                    <img
                      src={info.working.example.ganttChartImage}
                      alt="Gantt Chart"
                      className="popup-image"
                    />
                  )}

                  {info.working.example?.queueDiagramImage && (
                    <img
                      src={info.working.example.queueDiagramImage}
                      alt="Queue Diagram"
                      className="popup-image"
                    />
                  )}
                </section>

                {info.characteristics && (
                  <section>
                    <h3>🔍 Characteristics</h3>
                    <table>
                      <tbody>
                        {info.characteristics.map((item, idx) => (
                          <tr key={idx}>
                            <td>
                              <strong>{item.feature}</strong>
                            </td>
                            <td>{item.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </section>
                )}

                {info.performance_issues && (
                  <section>
                    <h3>⚠️ Performance Issues</h3>
                    <p>
                      <strong>{info.performance_issues.title}:</strong>{" "}
                      {info.performance_issues.description}
                    </p>
                  </section>
                )}

                <section>
                  <h3>📊 Complexity</h3>
                  <p>
                    <strong>Time:</strong> {info.complexity.time}
                  </p>
                  <p>
                    <strong>Space:</strong> {info.complexity.space}
                  </p>
                </section>

                {info.advantages && (
                  <section>
                    <h3>✅ Advantages</h3>
                    <ul>
                      {info.advantages.map((adv, idx) => (
                        <li key={idx}>{adv}</li>
                      ))}
                    </ul>
                  </section>
                )}

                {info.disadvantages && (
                  <section>
                    <h3>❌ Disadvantages</h3>
                    <ul>
                      {info.disadvantages.map((disadv, idx) => (
                        <li key={idx}>{disadv}</li>
                      ))}
                    </ul>
                  </section>
                )}

                <section>
                  <h3>🔗 Resources</h3>
                  <ul>
                    {info.resources.map((res, idx) => (
                      <li key={idx}>
                        <a href={res.url} target="_blank" rel="noreferrer">
                          {res.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
            ) : (
              <p>Loading info...</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default InfoPopup;

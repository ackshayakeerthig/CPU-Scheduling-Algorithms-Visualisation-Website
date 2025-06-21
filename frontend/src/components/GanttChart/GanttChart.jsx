import React from "react";

const getRandomColor = () => {
  const orangeShades = ["#FFA500", "#FF8C00", "#FF7F50", "#FF6347"];
  return orangeShades[Math.floor(Math.random() * orangeShades.length)];
};

const GanttChart = ({ processes = [] }) => {
  console.log("Processes received by GanttChart:", processes);

  // Updated to an orange-white theme
  const colors = [
    "#FFA500", // Orange
    "#FF8C00", // Dark orange
    "#FFDAB9", // Light orange / peach
    "#FFF5E1", // Very light orange
    "#FFB347", // Soft orange
    "#FFEFD5", // Papaya whip
    "#FFCC99", // Peach
    "#FFE4B5", // Moccasin
    "#FFF8DC", // Cornsilk
    "#FAEBD7", // Antique white
  ];

  const colorMap = {};
  processes.forEach((process) => {
    const colorIndex = parseInt(process.id.replace("P", ""), 10) - 1;
    colorMap[process.id] =
      colorIndex >= 0 && colorIndex < colors.length
        ? colors[colorIndex]
        : getRandomColor();
  });

  const ganttSegments = processes.flatMap((process) =>
    process.ganttValues.map(([start, end]) => ({
      id: process.id,
      start,
      end,
      color: colorMap[process.id],
    }))
  );

  ganttSegments.sort((a, b) => a.start - b.start);

  const maxTime =
    ganttSegments.length > 0
      ? Math.max(...ganttSegments.map((segment) => segment.end))
      : 0;
  const timeline = Array.from({ length: maxTime }, (_, i) => i);

  return (
    <div style={{ width: "100%", overflowX: "auto", backgroundColor: "#000" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
        }}
      >
        {timeline.map((time) => {
          const activeSegment = ganttSegments.find(
            (segment) => time >= segment.start && time < segment.end
          );

          return (
            <div
              key={`time-slot-${time}`}
              style={{
                backgroundColor: activeSegment
                  ? activeSegment.color
                  : "#000", // Idle time is black
                flex: "1 1 auto",
                minWidth: "30px",
                height: "100px",
                border: "1px solid #fff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: activeSegment ? "#000" : "#fff",
                fontSize: "12px",
              }}
            >
              {activeSegment ? `P${activeSegment.id.replace("P", "")}` : ""}
            </div>
          );
        })}
      </div>
      <div
        style={{
          marginTop: "10px",
          display: "flex",
          width: "100%",
          color: "#fff",
        }}
      >
        {timeline.map((time) => (
          <div
            key={`time-label-${time}`}
            style={{
              flex: "1 1 auto",
              minWidth: "30px",
              fontSize: "12px",
              textAlign: "center",
            }}
          >
            {time}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GanttChart;

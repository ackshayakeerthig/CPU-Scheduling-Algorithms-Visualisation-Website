import React from "react";
import { Chart } from "react-google-charts";

export default function GanttChart({ output }) {
  const options = {
    height: 200,
    gantt: {
      trackHeight: 32,
      labelStyle: {
        fontSize: 15,
        color: "#ffffff", // White color for text
      },
      bar: {
        color: "#4CAF50", // Green bars
        radius: 5, // Rounded corners for bars
      },
    },
    hAxis: {
      format: "ss", // Format to show seconds on the x-axis (you can adjust this if needed)
      viewWindow: {
        min: new Date(2024, 10, 22, 0, 0, 0), // Start time 0:00
        max: new Date(2024, 10, 22, 0, 0, output[output.length - 1].completion), // End time: Last process completion
      },
      gridlines: {
        color: "#ddd", // Light gridline color
        count: output[output.length - 1].completion + 1, // Set gridlines for each unit of time
      },
      ticks: Array.from(
        { length: output[output.length - 1].completion + 1 },
        (_, i) => new Date(2024, 10, 22, 0, 0, i) // Ticks for each second/unit (0, 1, 2, 3, ...)
      ),
      title: "Time (in seconds)", // x-axis title
      titleTextStyle: {
        color: "#4CAF50", // Green title
        fontSize: 16,
        italic: true,
      },
    },
    vAxis: {
      title: "Processes",
      titleTextStyle: {
        color: "#4CAF50",
        fontSize: 16,
        italic: true,
      },
      gridlines: {
        color: "#ddd",
      },
    },
    backgroundColor: "#f9f9f9",
    tooltip: {
      trigger: "both",
      isHtml: true,
      textStyle: {
        color: "#333",
        fontSize: 14,
      },
    },
  };

  // Start time at unit 0 (Midnight of 22nd Nov 2024)
  const baseDate = new Date(2024, 10, 22, 0, 0, 0);

  // Transform the output into Gantt chart format
  const data = [
    [
      { type: "string", label: "Task ID" },
      { type: "string", label: "Task Name" },
      { type: "string", label: "Resource" },
      { type: "date", label: "Start Date" },
      { type: "date", label: "End Date" },
      { type: "number", label: "Duration" },
      { type: "number", label: "Percent Complete" },
      { type: "string", label: "Dependencies" },
    ],
    ...output.map((process) => {
      const startDate = new Date(baseDate.getTime() + process.arrival * 1000); // Start time: Arrival time in seconds
      const endDate = new Date(baseDate.getTime() + process.completion * 1000); // End time: Completion time in seconds

      return [
        process.id, // Task ID
        `Process ${process.id}`, // Task Name
        "CPU", // Resource
        startDate, // Start Date
        endDate, // End Date
        null, // Duration (null because we provide start & end dates)
        100, // Percent Complete
        null, // Dependencies
      ];
    }),
  ];

  return (
    <Chart
      chartType="Gantt"
      data={data}
      options={options}
      width="100%"
      height="200px"
      legendToggle
    />
  );
}

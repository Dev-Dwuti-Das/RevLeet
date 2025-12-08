import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const doughnutData = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      label: "Traffic",
      data: [35, 25, 40],
      backgroundColor: [
        "rgb(243, 88, 101)", // red
        "rgb(73, 90, 251)",  // blue
        "rgb(255, 199, 88)", // yellow
      ],
      borderColor: [
        "rgba(0, 0, 0, 1)",
        "rgba(0, 0, 0, 1)",
        "rgba(0, 0, 0, 1)",
      ],
      borderWidth: 2,
      hoverOffset: 12,
      spacing: 2,
    },
  ],
};

const options1 = {
  layout: {
    padding: { top: 0, right: 0, bottom: 0, left: 0 },
  },
  plugins: {
    legend: {
      position: "right",
      labels: {
        color: "white",
        font: { size: 14 },
        boxWidth: 30,
        boxHeight: 30,
        padding: 10,
        usePointStyle: true,
      },
    },
  },
};

function redQstats() {
  return (
    <>
    <Doughnut
          data={doughnutData}
          options={options1}
        />
      <div
 className="
  bg-[#1b1b1b]
  rounded-2xl
  border border-gray-300/30
  p-5 cursor-pointer
  transition-all duration-300

  hover:shadow-[0_0_12px_rgba(255,255,255,0.2)]
">
        <h1 className="text-3xl font-bold text-red-500/75">Clueless</h1>
        <h2>3 days </h2>
      </div>
    </>
  );
}

export default redQstats;

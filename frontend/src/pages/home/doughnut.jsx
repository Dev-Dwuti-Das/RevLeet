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
        "rgba(255, 46, 63, 0.91)", // red
        "rgba(53, 73, 255, 0.86)", // blue
        "rgba(246, 181, 50, 1)", // yellow
      ],
      borderColor: ["#121212", "#121212", "#121212"],
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
      position: "bottom",
      labels: {
        color: "white",
        font: { size: 14 },
        boxWidth: 30,
        boxHeight: 30,
        padding: 15,
        usePointStyle: true,
      },
    },
  },
};

export default function DoughnutChart() {
  return (
    <div
      className="
        h-[250px]
        bg-[#121212]
        rounded-3xl
        border border-[#1d1d1d]
        p-2
        shadow-[0_0_20px_rgba(255,255,255,0.05)]
        transition-all duration-300
        hover:shadow-[0_0_25px_rgba(255,255,255,0.08)]
      "
    >
      <Doughnut data={doughnutData} options={options1}></Doughnut>
    </div>
  );
}

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
        "rgba(53, 73, 255, 0.86)",  // blue
        "rgba(246, 181, 50, 1)", // yellow
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

export default function DoughnutChart() {
  return (
    <Doughnut
      data={doughnutData}
      options={options1}
    />
  );
}

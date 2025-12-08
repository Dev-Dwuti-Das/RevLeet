import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const doughnutData = {
  labels: ["Red", "Orange", "Yellow"],
  datasets: [
    {
      label: "Traffic",
      data: [35, 25, 40],
      backgroundColor: [
        "rgba(255, 0, 0, 0.6)",   // red
        "rgba(249, 115, 22, 0.6)",  // orange
        "rgba(250, 204, 21, 0.6)",  // yellow
      ],
      borderColor: [
        "rgba(239, 68, 68, 1)",
        "rgba(249, 115, 22, 1)",
        "rgba(250, 204, 21, 1)",
      ],
      borderWidth: 1,
      hoverOffset: 10,
    },
  ],
};

export default function DoughnutChart() {
  return (
    <Doughnut
      data={doughnutData}
      options={{
        plugins: {
          legend: {
            display: true,
            labels: { color: "#ddd", padding: 16 },
            position: "bottom",
          },
        },
        cutout: "10%", // donut thickness
      }}
    />
  );
}

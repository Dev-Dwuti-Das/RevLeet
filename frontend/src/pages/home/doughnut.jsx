import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip);

export default function DoughnutChart({ data }) {
  const safeData = Array.isArray(data) ? data : [];

  const queue_count = safeData.reduce(
    (acc, curr) => {
      if (curr.queue === "Q1") acc.q1++;
      if (curr.queue === "Q2") acc.q2++;
      if (curr.queue === "Q3") acc.q3++;
      if (curr.queue === "Q4") acc.q4++;
      if (curr.queue === "Q5") acc.q5++;
      return acc;
    },
    { q1: 0, q2: 0, q3: 0, q4: 0, q5: 0 }
  );

  const total =
    queue_count.q1 +
    queue_count.q2 +
    queue_count.q3 +
    queue_count.q4 +
    queue_count.q5;

  const hasData = total > 0;
  const chartdata = {
    labels: hasData
      ? ["Buffer 1", "Warm", "Buffer 2", "Almost done", "done List"]
      : ["No data"],
    datasets: [
      hasData
        ? {
            data: [
              queue_count.q1,
              queue_count.q2,
              queue_count.q3,
              queue_count.q4,
              queue_count.q5,
            ],
            backgroundColor: [
              "rgba(168, 85, 247, 0.9)", // Q1 purple
              "rgba(249, 115, 22, 0.9)", // Q2 orange
              "rgba(99, 102, 241, 0.9)", // Q3 indigo
              "rgba(234, 179, 8, 0.9)", // Q4 yellow
              "rgba(34, 197, 94, 0.9)", // Q5 green
            ],
            borderRadius: 2,
            spacing: 1,
            borderWidth: 0,
            hoverOffset: 16,
            cutout: "65%",
          }
        : {
            data: [1],
            backgroundColor: ["rgba(255,255,255,0.08)"],
            borderWidth: 0,
            cutout: "65%",
          },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#0b0b0b",
        titleColor: "#fff",
        bodyColor: "#d4d4d8",
        padding: 0,
        borderColor: "#27272a",
        borderWidth: 1,
      },
    },
  };

  return (
    <div
      className="
        h-[280px]
        rounded-3xl
        bg-gradient-to-br from-[#0f0f0f] to-[#181818]
        border border-white/10
        p-5
        shadow-[0_20px_50px_rgba(0,0,0,0.6)]
        backdrop-blur-xl
      "
    >
      <div className="relative h-[230px]">
        <Doughnut data={chartdata} options={options} />

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-4xl font-bold text-white">{total}</span>
          <span className="text-xs text-zinc-400 mt-1">
            {total === 0 ? "No data yet" : "questions"}
          </span>
        </div>
      </div>
    </div>
  );
}

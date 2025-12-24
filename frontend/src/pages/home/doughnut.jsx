import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);


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

export default function DoughnutChart({data}) {
  const safeData = Array.isArray(data) ? data : [];

  const queue_count = safeData.reduce(
    (acc, curr) => {
      if(curr.queue === "Q1")acc.q1++;
      if(curr.queue === "Q2")acc.q2++;
      if(curr.queue === "Q3")acc.q3++;
      if(curr.queue === "Q4")acc.q4++;
      if(curr.queue === "Q5")acc.q5++;
      return acc;
    },{q1:0,q2:0,q3:0,q4:0,q5:0}
  )
  const chartdata = {
  labels: ["Queue 1", "Queue 2", "Queue 3", "Queue 4", "Queue 5"],
  datasets: [
    {
      label: "Questions", 
      data: [
        // queue_count.q1,
        // queue_count.q2,
        // queue_count.q3,
        // queue_count.q4,
        // queue_count.q5,             bhehhhhhhhhhhhhhh help me :(
        1,2,3,4,5
      ],
      backgroundColor: [
        "rgba(255, 46, 63, 0.91)",   // Q1
        "rgba(53, 73, 255, 0.86)",   // Q2
        "rgba(246, 181, 50, 1)",     // Q3
        "rgba(255, 140, 0, 0.9)",    // Q4
        "rgba(34, 197, 94, 0.9)",    // Q5
      ],
      borderColor: [
        "#121212",
        "#121212",
        "#121212",
        "#121212",
        "#121212",
      ],
      borderWidth: 2,
      hoverOffset: 12,
      spacing: 2,
    },
  ],
};


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
      <Doughnut data={chartdata} options={options1}></Doughnut>
    </div>
  );
}

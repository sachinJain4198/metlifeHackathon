import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function ClaimsOverTime({ claims }) {
  const monthlyCounts = Array(12).fill(0);

  // Count claims per month based on submissionDate
  claims.forEach((claim) => {
    if (claim.submissionDate) {
      const month = new Date(claim.submissionDate).getMonth();
      monthlyCounts[month]++;
    }
  });

  const data = {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ],
    datasets: [
      {
        label: "Claims Filed per Month",
        data: monthlyCounts,
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        tension: 0.3,
        pointRadius: 4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        backgroundColor: "#111",
        titleColor: "#fff",
        bodyColor: "#fff",
      },
    },
    scales: {
      x: {
        grid: { color: "rgba(0,0,0,0.05)" },
      },
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
        grid: { color: "rgba(0,0,0,0.05)" },
      },
    },
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <h4 className="text-lg font-semibold mb-2">Claims Trend Over Time</h4>
      <Line data={data} options={options} />
    </div>
  );
}

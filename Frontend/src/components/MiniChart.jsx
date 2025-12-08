import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Tooltip);

export default function MiniChart() {
  const labels = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agu","Sep","Okt","Nov","Des"];

  const data = {
    labels,
    datasets: [
      {
        label: "Kunjungan Wisata",
        data: [1200,1500,1800,1700,2000,2400,2600,2300,2100,2200,1900,2500],
        borderColor: "#0d6efd",
        backgroundColor: "rgba(13,110,253,0.25)",
        borderWidth: 2,
        pointRadius: 2,
        tension: 0.35
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { display: false },
      x: { ticks: { color: "#444", font: { size: 10 } } }
    }
  };

  return (
    <div style={{ height: "160px", maxWidth: "450px", margin: "auto" }}>
      <Line data={data} options={options} />
    </div>
  );
}

import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function GrafikTrend() {

  const labels = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];

  const data = {
    labels,
    datasets: [
      {
        label: "Kunjungan Wisata",
        data: [1200, 1500, 1800, 1700, 2000, 2400, 2600, 2300, 2100, 2200, 1900, 2500],
        backgroundColor: "rgba(13,110,253,0.6)",
        borderRadius: 6, // sudut biar halus
      },
    ],
  };

  const options = {
    responsive: true,
    indexAxis: "y", // bikin batang horizontal
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      }
    }
  };

  return (
    <div className="container py-4">
      <h2 className="fw-bold text-center mb-3">Grafik Trend Wisata Yogyakarta 2025</h2>
      <p className="text-center text-muted mb-4">
        Data kunjungan wisata dari Januari hingga Desember
      </p>

      {/* Grafik */}
      <div style={{ maxWidth: "800px", margin: "auto" }}>
        <Bar data={data} options={options} height={130} />
      </div>

      {/* Tabel */}
      <h5 className="fw-bold mt-4">Tabel Data Kunjungan Bulanan</h5>
      <table className="table table-bordered mt-2" style={{ maxWidth: "700px", margin: "auto" }}>
        <thead className="table-light">
          <tr>
            <th>Bulan</th>
            <th>Kunjungan</th>
          </tr>
        </thead>
        <tbody>
          {labels.map((bulan, i) => (
            <tr key={i}>
              <td>{bulan}</td>
              <td>{data.datasets[0].data[i].toLocaleString()} pengunjung</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Penjelasan */}
      <div className="mt-4" style={{ maxWidth: "700px", margin: "auto", fontSize: "15px" }}>
        <h5 className="fw-bold">Penjelasan Trend Per Bulan</h5>

        <p><b>Januari:</b> Malioboro, Kraton, dan Vredeburg ramai karena libur tahun baru.</p>
        <p><b>Februari:</b> Prambanan dan HeHa Sky View meningkat karena momen Valentine.</p>
        <p><b>Maret:</b> Wisata alam seperti Hutan Pinus dan Kaliurang naik peminatnya.</p>

      </div>
    </div>
  );
}

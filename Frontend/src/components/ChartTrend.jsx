// FILE: ChartTrend.jsx
import React from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ChartTrend = ({ trend, tahun }) => {
  return (
    <>
      {/* ==============================================
           📊 GRAFIK ULASAN PER BULAN
         ============================================== */}
      <h3 style={{ marginTop: 20 }}>Grafik Ulasan per Bulan ({tahun})</h3>

      <div style={{ width: "100%", height: 340, marginBottom: 20 }}>
        <ResponsiveContainer>
          <BarChart
            data={trend}
            margin={{ top: 20, right: 20, left: 10, bottom: 60 }}
          >
            <Bar dataKey='jumlah' barSize={35} fill='#fdaf1dff' />
            <CartesianGrid stroke='#ccc' />
            <XAxis
              dataKey='bulan_nama'
              angle={-25}
              textAnchor='end'
              interval={0}
            />
            <YAxis />
            <Tooltip />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default ChartTrend;

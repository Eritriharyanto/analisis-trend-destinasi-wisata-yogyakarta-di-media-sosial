// FILE: TableTrendKata.jsx
import React from "react";

const TableTrendKata = ({ trendTopic, tahun }) => (
  <>
    {/* TABLE TREND MANUAL */}
    <h3 style={{ marginTop: 40 }}>
      Trend Kata Paling Sering Muncul Tahun {tahun}
    </h3>

    <table style={{ width: "100%", marginTop: 10 }}>
      <thead>
        <tr style={{ backgroundColor: "#222", color: "white" }}>
          <th>#</th>
          <th>Kata</th>
          <th>Jumlah</th>
        </tr>
      </thead>
      <tbody>
        {trendTopic.map((item, idx) => (
          <tr key={idx}>
            <td>{idx + 1}</td>
            <td>{item.word}</td>
            <td>
              <b>{item.count}</b>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
);

export default TableTrendKata;

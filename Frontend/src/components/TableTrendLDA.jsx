// FILE: components/TableTrendLDA.jsx
import React from "react";

const TableTrendLDA = ({ trendLDA, tahun }) => {
  return (
    <>
      {/* ==============================================
           🔥 TABLE LDA TOPIC TREND
           ============================================== */}
      <h3 style={{ marginTop: 40 }}>Trend Topik LDA Tahun {tahun}</h3>

      {trendLDA.length === 0 ? (
        <p style={{ color: "gray" }}>
          Belum ada data topic LDA pada tahun ini.
        </p>
      ) : (
        <table
          style={{ width: "100%", marginTop: 10, borderCollapse: "collapse" }}
        >
          <thead>
            <tr style={{ backgroundColor: "#222", color: "white" }}>
              <th style={{ padding: 8 }}>Topic ID</th>
              <th style={{ padding: 8 }}>Label Topik</th>
              <th style={{ padding: 8 }}>Top Terms</th>
              <th style={{ padding: 8 }}>Jumlah Ulasan</th>
            </tr>
          </thead>
          <tbody>
            {trendLDA.map((t, i) => (
              <tr key={i} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: 8 }}>#{t.topic}</td>
                <td style={{ padding: 8 }}>{t.topic_label}</td>
                <td style={{ padding: 8 }}>{t.terms}</td>
                <td style={{ padding: 8 }}>
                  <b>{t.count}</b>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default TableTrendLDA;

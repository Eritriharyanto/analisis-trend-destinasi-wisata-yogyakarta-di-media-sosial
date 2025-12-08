import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DetailDestinasi = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [tahun, setTahun] = useState(2025);
  const [trend, setTrend] = useState([]);
  const [trendTopic, setTrendTopic] = useState([]);

  const [trendLDA, setTrendLDA] = useState([]);

  const [page, setPage] = useState(1);
  const perPage = 5;

  const bulanNama = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // AMBIL DATA POSTINGAN
  useEffect(() => {
    const BASE_URL = "http://127.0.0.1:5000/wisata";
    axios
      .get(`${BASE_URL}/${id}/posts`)
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("Gagal:", err))
      .finally(() => setLoading(false));
  }, [id]);

  // GRAFIK ULASAN & TREND KATA MANUAL
  useEffect(() => {
    const dataTahun = posts.filter(
      (p) => new Date(p.created_at).getFullYear() == tahun
    );

    const countPerMonth = {};
    bulanNama.forEach((b) => {
      countPerMonth[b] = 0;
    });

    dataTahun.forEach((p) => {
      const idx = new Date(p.created_at).getMonth();
      const bulan = bulanNama[idx];
      countPerMonth[bulan]++;
    });

    const grafikData = bulanNama.map((b) => ({
      bulan_nama: b,
      jumlah: countPerMonth[b],
    }));

    setTrend(grafikData);

    // TREND TOPIK MANUAL
    const wordCount = {};
    dataTahun.forEach((p) => {
      if (!p.cleaning) return;
      p.cleaning.split(" ").forEach((w) => {
        if (w.length <= 3) return;
        wordCount[w] = (wordCount[w] || 0) + 1;
      });
    });

    const sortedWords = Object.entries(wordCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([word, count]) => ({ word, count }));

    setTrendTopic(sortedWords);
  }, [tahun, posts]);

  // TOPIK LDA
  useEffect(() => {
    const BASE_URL = "http://127.0.0.1:5000/wisata";
    axios
      .get(`${BASE_URL}/${id}/topic_trend/${tahun}`)
      .then((res) => setTrendLDA(res.data))
      .catch((err) => console.error("Gagal ambil LDA:", err));
  }, [tahun, id]);

  const filteredPosts = posts.filter(
    (p) => new Date(p.created_at).getFullYear() == tahun
  );
  const totalPage = Math.ceil(filteredPosts.length / perPage);
  const currentData = filteredPosts.slice((page - 1) * perPage, page * perPage);

  return (
    <div className='glass-container'>
      <div className='glass-card'>
        <h1 className='glass-title'>{id.toUpperCase()}</h1>

        {/* DROPDOWN TAHUN */}
        <label style={{ marginRight: 10 }}>Pilih Tahun:</label>
        <select
          value={tahun}
          onChange={(e) => {
            setTahun(e.target.value);
            setPage(1);
          }}
        >
          {Array.from({ length: 2025 - 2017 + 1 }, (_, i) => (
            <option key={i} value={2017 + i}>
              {2017 + i}
            </option>
          ))}
        </select>

        {/* GRAFIK ULASAN */}
        <h3 style={{ marginTop: 20 }}>Grafik Ulasan per Bulan ({tahun})</h3>

        <div style={{ width: "100%", height: 340, marginBottom: 20 }}>
          {trend.length === 0 ? (
            <p>Tidak ada ulasan tahun ini.</p>
          ) : (
            <ResponsiveContainer>
              <BarChart
                data={trend}
                margin={{ top: 20, right: 20, left: 10, bottom: 60 }}
              >
                <Bar dataKey='jumlah' fill='orange' barSize={35} />
                <CartesianGrid stroke='#ccc' />
                <XAxis
                  dataKey='bulan_nama'
                  angle={-25}
                  textAnchor='end'
                  interval={0}
                  tick={{ fontSize: 14 }}
                />
                <YAxis allowDecimals={false} />
                <Tooltip />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* TABEL TOPIK LDA */}
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
                <th style={{ padding: 8 }}>Topic</th>
                <th style={{ padding: 8 }}>Top Terms</th>
                <th style={{ padding: 8 }}>Jumlah</th>
              </tr>
            </thead>
            <tbody>
              {trendLDA.map((t, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={{ padding: 8 }}>#{t.topic}</td>
                  <td style={{ padding: 8 }}>{t.terms}</td>
                  <td style={{ padding: 8 }}>{t.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* TREND TOPIK MANUAL */}
        <h3 style={{ marginTop: 40 }}>
          Trend Kata Paling Sering Muncul Tahun {tahun}
        </h3>

        {trendTopic.length === 0 ? (
          <p>Tidak ada data trend topik.</p>
        ) : (
          <table
            style={{ width: "100%", marginTop: 10, borderCollapse: "collapse" }}
          >
            <thead>
              <tr style={{ backgroundColor: "#333", color: "white" }}>
                <th style={{ padding: 8, textAlign: "left" }}>#</th>
                <th style={{ padding: 8, textAlign: "left" }}>Kata</th>
                <th style={{ padding: 8, textAlign: "left" }}>Jumlah</th>
              </tr>
            </thead>
            <tbody>
              {trendTopic.map((item, idx) => (
                <tr key={idx} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={{ padding: 8 }}>{idx + 1}</td>
                  <td style={{ padding: 8 }}>{item.word}</td>
                  <td style={{ padding: 8 }}>
                    <b>{item.count}</b>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* ULASAN */}
        <h3 style={{ marginTop: 40 }}>Daftar Ulasan Tahun {tahun}</h3>

        {loading ? (
          <p>Sedang mengambil data...</p>
        ) : currentData.length === 0 ? (
          <p>Tidak ada ulasan</p>
        ) : (
          <>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {currentData.map((p) => (
                <li key={p.id} style={{ marginBottom: 15 }}>
                  <div className='post-box'>
                    <p>
                      <b>Tanggal:</b> {p.created_at}
                    </p>
                    <p>
                      <b>Text:</b> {p.cleaning}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            {/* PAGINATION */}
            <div style={{ marginTop: 20, textAlign: "center" }}>
              {page > 1 && (
                <button onClick={() => setPage(page - 1)}>⬅ Prev</button>
              )}
              <span style={{ margin: "0 15px" }}>
                Page {page} / {totalPage}
              </span>
              {page < totalPage && (
                <button onClick={() => setPage(page + 1)}>Next ➡</button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DetailDestinasi;

// --------------------------- IMPORT ---------------------------
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

// --------------------------- GAMBAR DARI FOLDER PUBLIC ---------------------------
// key object HARUS sama dengan parameter :id di URL (useParams)
const wisataImages = {
  merapi: "/GunungMerapi.jpg",
  alkid: "/d3.jpg",
  tamanpintar: "/tamanpintar.jpg",
  prambanan: "/prambanan.jpg",
  lagunapantaidepok: "/pantaidepok.jpg",
  gembiraloka: "/gembiraloka.jpg",
};

const DetailDestinasi = () => {
  // mengambil nilai ":id" dari URL /wisata/merapi
  const { id } = useParams();

  // state untuk menyimpan data post ulasan
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // state filter tahun default 2025
  const [tahun, setTahun] = useState(2025);

  // state data grafik (jumlah ulasan per bulan)
  const [trend, setTrend] = useState([]);

  // state trend kata manual tanpa LDA
  const [trendTopic, setTrendTopic] = useState([]);

  // state trend topic dari model LDA backend
  const [trendLDA, setTrendLDA] = useState([]);

  // pagination daftar ulasan
  const [page, setPage] = useState(1);
  const perPage = 5;

  // nama bulan untuk tampilan grafik
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

  // --------------------------- USE EFFECT PERTAMA ---------------------------
  // mengambil semua posting ulasan dari backend
  useEffect(() => {
    const BASE_URL = "http://127.0.0.1:5000/wisata";

    axios
      .get(`${BASE_URL}/${id}/posts`) // ambil berdasarkan destinasi
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("Gagal:", err))
      .finally(() => setLoading(false));
  }, [id]);

  // --------------------------- HITUNG TREND ULASAN PER BULAN ---------------------------
  useEffect(() => {
    // filter ulasan berdasarkan tahun yang dipilih
    const dataTahun = posts.filter(
      (p) => new Date(p.created_at).getFullYear() == tahun
    );

    // buat object count bulan default = 0 semua
    const countPerMonth = {};
    bulanNama.forEach((b) => (countPerMonth[b] = 0));

    // hitung jumlah posting setiap bulan
    dataTahun.forEach((p) => {
      const idx = new Date(p.created_at).getMonth();
      const bulan = bulanNama[idx];
      countPerMonth[bulan]++;
    });

    // siap untuk dikirim ke grafik Recharts
    const grafikData = bulanNama.map((b) => ({
      bulan_nama: b,
      jumlah: countPerMonth[b],
    }));

    setTrend(grafikData);

    // -------------------------------------
    // TREND TOPIK MANUAL (tanpa model LDA)
    // -------------------------------------
    const wordCount = {};

    dataTahun.forEach((p) => {
      if (!p.cleaning) return;
      p.cleaning.split(" ").forEach((w) => {
        if (w.length <= 3) return; // abaikan kata pendek
        wordCount[w] = (wordCount[w] || 0) + 1;
      });
    });

    // urutkan dan ambil 10 terbanyak
    const sortedWords = Object.entries(wordCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([word, count]) => ({ word, count }));

    setTrendTopic(sortedWords);
  }, [tahun, posts]);

  // --------------------------- AMBIL TREND DARI TOPIC LDA ---------------------------
  useEffect(() => {
    const BASE_URL = "http://127.0.0.1:5000/wisata";

    axios
      .get(`${BASE_URL}/${id}/topic_trend/${tahun}`)
      .then((res) => setTrendLDA(res.data))
      .catch((err) => console.error("Gagal ambil LDA:", err));
  }, [tahun, id]);

  // --------------------------- PAGINATION ULASAN ---------------------------
  const filteredPosts = posts.filter(
    (p) => new Date(p.created_at).getFullYear() == tahun
  );

  const totalPage = Math.ceil(filteredPosts.length / perPage);
  const currentData = filteredPosts.slice((page - 1) * perPage, page * perPage);

  // --------------------------- RENDER UI ---------------------------
  return (
    <div className='glass-container'>
      <div className='glass-card'>
        {/* BAGIAN GAMBAR + JUDUL */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "25px",
            marginTop: "10px",
          }}
        >
          <img
            src={wisataImages[id]}
            alt={id}
            style={{
              width: "640px",
              height: "auto",
              borderRadius: "15px",
              marginBottom: "20px",
            }}
          />

          <h1
            className='glass-title'
            style={{ fontSize: "2.8rem", fontWeight: "bold", margin: 0 }}
          >
            {id.toUpperCase()}
          </h1>
        </div>

        {/* PILIH TAHUN */}
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

        {/* GRAFIK BAR */}
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
                {/* WARNA BAR DI SINI */}
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
          )}
        </div>

        {/* TABLE LDA */}
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

        {/* TABLE TREND KATA */}
        <h3 style={{ marginTop: 40 }}>
          Trend Kata Paling Sering Muncul Tahun {tahun}
        </h3>

        {trendTopic.length === 0 ? (
          <p>Tidak ada data trend topik.</p>
        ) : (
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
        )}

        {/* LIST ULASAN DENGAN PAGINATION */}
        <h3 style={{ marginTop: 40 }}>Daftar Ulasan Tahun {tahun}</h3>

        {loading ? (
          <p>Sedang mengambil data...</p>
        ) : currentData.length === 0 ? (
          <p>Tidak ada ulasan</p>
        ) : (
          <>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {currentData.map((p) => (
                <li key={p.id}>
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

            {/* PAGINATION BUTTON */}
            <div style={{ textAlign: "center", marginTop: 20 }}>
              {page > 1 && (
                <button onClick={() => setPage(page - 1)}>⬅ Prev</button>
              )}
              <span>
                {" "}
                Page {page} / {totalPage}{" "}
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

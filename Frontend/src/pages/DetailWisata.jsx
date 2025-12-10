// FILE: DetailWisata.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ChartTrend from "../components/ChartTrend";
import TableTrendLDA from "../components/TableTrendLDA";
import TableTrendKata from "../components/TableTrendKata";
import ListUlasan from "../components/ListUlasan";

const wisataImages = {
  merapi: "/GunungMerapi.jpg",
  alkid: "/d3.jpg",
  tamanpintar: "/tamanpintar.jpg",
  prambanan: "/prambanan.jpg",
  lagunapantaidepok: "/lagunapantaidepok.webp",
  gembiraloka: "/gembiraloka.jpg",
};

const DetailWisata = () => {
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

  // GET ALL POSTS
  useEffect(() => {
    const BASE_URL = "http://127.0.0.1:5000/wisata";
    axios
      .get(`${BASE_URL}/${id}/posts`)
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("Gagal:", err))
      .finally(() => setLoading(false));
  }, [id]);

  // TREND MANUAL
  useEffect(() => {
    const dataTahun = posts.filter(
      (p) => new Date(p.created_at).getFullYear() == tahun
    );

    const countPerMonth = {};
    bulanNama.forEach((b) => (countPerMonth[b] = 0));
    dataTahun.forEach((p) => {
      const bulan = bulanNama[new Date(p.created_at).getMonth()];
      countPerMonth[bulan]++;
    });
    setTrend(
      bulanNama.map((b) => ({ bulan_nama: b, jumlah: countPerMonth[b] }))
    );

    const wordCount = {};
    dataTahun.forEach((p) => {
      if (!p.cleaning) return;
      p.cleaning.split(" ").forEach((w) => {
        if (w.length <= 3) return;
        wordCount[w] = (wordCount[w] || 0) + 1;
      });
    });

    setTrendTopic(
      Object.entries(wordCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([word, count]) => ({ word, count }))
    );
  }, [tahun, posts]);

  // TREND LDA
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:5000/wisata/${id}/topic_trend/${tahun}`)
      .then((res) => setTrendLDA(res.data))
      .catch((err) => console.error("Gagal ambil LDA:", err));
  }, [tahun, id]);

  const filteredPosts = posts.filter(
    (p) => new Date(p.created_at).getFullYear() == tahun
  );

  return (
    <div className='glass-container'>
      <div className='glass-card'>
        <div style={{ textAlign: "center" }}>
          <img
            src={wisataImages[id]}
            alt={id}
            style={{ width: "640px", borderRadius: "15px" }}
          />
          <h1 className='glass-title'>{id.toUpperCase()}</h1>
        </div>

        <label>Pilih Tahun:</label>
        <select value={tahun} onChange={(e) => setTahun(e.target.value)}>
          {Array.from({ length: 2025 - 2017 + 1 }, (_, i) => (
            <option key={i} value={2017 + i}>
              {2017 + i}
            </option>
          ))}
        </select>

        <ChartTrend trend={trend} tahun={tahun} />
        <TableTrendLDA trendLDA={trendLDA} tahun={tahun} />
        <TableTrendKata trendTopic={trendTopic} tahun={tahun} />
        <ListUlasan
          loading={loading}
          filteredPosts={filteredPosts}
          page={page}
          setPage={setPage}
          perPage={perPage}
        />
      </div>
    </div>
  );
};

export default DetailWisata;

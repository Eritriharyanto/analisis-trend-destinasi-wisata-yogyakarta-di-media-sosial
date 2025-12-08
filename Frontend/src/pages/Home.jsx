import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  const slides = [
    { id: "alkid", img: "/d3.jpg", title: "Alun-Alun Kidul" },
    { id: "tamanpintar", img: "/tamanpintar.jpg", title: "Taman Pintar" },
    { id: "merapi", img: "/GunungMerapi.jpg", title: "Gunung Merapi" },
    { id: "prambanan", img: "/prambanan.jpg", title: "Prambanan" },
    { id: "lagunapantaidepok", img: "/Pantaidepok.jpg", title: "Pantai Depok" },
    { id: "gembiraloka", img: "/gembiraloka.jpg", title: "Gembira Loka" },
  ];

  const [index, setIndex] = useState(0);
  const next = () => setIndex((index + 1) % slides.length);
  const prev = () => setIndex((index - 1 + slides.length) % slides.length);

  const visibleCards = slides.slice(index, index + 4);
  if (visibleCards.length < 4) {
    visibleCards.push(...slides.slice(0, 4 - visibleCards.length));
  }

  return (
    <div className='home-container'>
      {/* HERO */}
      <section className='hero-new'>
        <div className='hero-content-box'>
          {/* === GANTI TULISAN JADI LOGO === */}
          <img src='/Logo.png' alt='Logo' className='hero-logo' />

          <p className='hero-subtitle'>Analisis Tren Destinasi Wisata</p>
          <button className='btn-hero' onClick={() => navigate("/destinasi")}>
            Mulai
          </button>
        </div>
      </section>

      {/* TREND */}
      <section className='trend-section'>
        <h2 className='trend-title'>Jelajahi Trend</h2>
        <p className='trend-subtitle'>Jelajahi Keindahan Yogyakarta</p>

        <div className='trend-slider'>
          <button className='arrow-btn' onClick={prev}>
            &lt;
          </button>

          <div className='trend-cards'>
            {visibleCards.map((s, i) => (
              <div
                key={i}
                className='trend-card'
                onClick={() => navigate(`/destinasi/${s.id}`)}
                style={{ cursor: "pointer" }}
              >
                <img src={s.img} className='trend-card-img' />
                <p className='trend-card-title'>{s.title}</p>
              </div>
            ))}
          </div>

          <button className='arrow-btn' onClick={next}>
            &gt;
          </button>
        </div>
      </section>

      {/* ===================== HEATMAP + RANKING TREND ===================== */}
      <section className='heatmap-section'>
        <h2 className='trend-title'>Heatmap Tren Wisata</h2>
        <p className='trend-subtitle'>
          Wilayah paling ramai berdasarkan data pengunjung
        </p>

        {/* HEATMAP BLOCK */}
        <div className='heatmap-box'>
          {/* HEATMAP GRID */}
          <div className='heatmap-grid'>
            {/* Selalu 3x2 */}
            <div
              className='heat-block'
              style={{ background: "rgba(255,0,0,0.7)" }}
            >
              Sleman
              <br />
              <span>🔥 Ramai</span>
            </div>
            <div
              className='heat-block'
              style={{ background: "rgba(255,140,0,0.7)" }}
            >
              Kota Jogja
              <br />
              <span>✨ Stabil</span>
            </div>
            <div
              className='heat-block'
              style={{ background: "rgba(255,215,0,0.7)" }}
            >
              Bantul
              <br />
              <span>👍 Cukup Ramai</span>
            </div>
            <div
              className='heat-block'
              style={{ background: "rgba(30,144,255,0.7)" }}
            >
              Kulon Progo
              <br />
              <span>🌊 Wisata Alam</span>
            </div>
            <div
              className='heat-block'
              style={{ background: "rgba(0,191,255,0.7)" }}
            >
              Gunungkidul
              <br />
              <span>🏝️ Wisata Pantai</span>
            </div>
            <div
              className='heat-block'
              style={{ background: "rgba(135,206,250,0.7)" }}
            >
              Lainnya
              <br />
              <span>🧭 Variatif</span>
            </div>
          </div>
        </div>

        <div className='ranking-box'>
          <div className='ranking-item'>
            <span className='rank-number gold'>1</span>
            <span className='rank-name'>Taman Pintar</span>
            <span className='rank-value'>1500 pengunjung</span>
          </div>

          <div className='ranking-item'>
            <span className='rank-number silver'>2</span>
            <span className='rank-name'>Alun-Alun Kidul</span>
            <span className='rank-value'>1450 pengunjung</span>
          </div>

          <div className='ranking-item'>
            <span className='rank-number bronze'>3</span>
            <span className='rank-name'>Prambanan</span>
            <span className='rank-value'>1400 pengunjung</span>
          </div>

          <div className='ranking-item'>
            <span className='rank-number'>4</span>
            <span className='rank-name'>Gunung Merapi</span>
            <span className='rank-value'>1200 pengunjung</span>
          </div>

          <div className='ranking-item'>
            <span className='rank-number'>5</span>
            <span className='rank-name'>Gembira Loka</span>
            <span className='rank-value'>950 pengunjung</span>
          </div>

          <div className='ranking-item'>
            <span className='rank-number'>6</span>
            <span className='rank-name'>Pantai Depok</span>
            <span className='rank-value'>850 pengunjung</span>
          </div>
        </div>
      </section>

      <section className='about-section'>
        <div className='about-card'>
          <h2 className='about-title'>Tentang Yowisata</h2>
          <p className='about-text'>
            Yowisata adalah platform informasi wisata Yogyakarta yang selalu
            dikemas modern dan mudah dipahami. Kamu bisa menjelajahi destinasi
            populer, melihat tren kunjungan, hingga mendapatkan insight menarik
            seputar wisata terkini.
          </p>
        </div>
      </section>
    </div>
  );
}

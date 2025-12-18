import React from "react";
import { Link } from "react-router-dom";

export default function DestinasiCard({
  id,
  title,
  img,
  slug,
  lokasi,
  rating,
  deskripsi,
  kategori,
}) {
  const imageSrc = img || "https://via.placeholder.com/300x200?text=No+Image";

  return (
    <div className='trend-card card shadow-sm'>
      <img src={imageSrc} className='card-img-top' alt={title} />

      <div className='card-body'>
        <h5 className='card-title'>{title}</h5>

        {/* Lokasi */}
        <p className='lokasi mb-1'>📍 {lokasi}</p>

        {/* Rating & Kategori */}
        <div className='info d-flex justify-content-between mb-2'>
          <span className='rating'>⭐ {rating}</span>
          <span className='kategori badge bg-primary text-capitalize'>
            {kategori}
          </span>
        </div>

        {/* Deskripsi */}
        <p className='deskripsi'>{deskripsi}</p>

        <Link
          to={`/destinasi/${slug}`}
          className='btn btn-outline-primary btn-sm'
        >
          Lihat
        </Link>
      </div>
    </div>
  );
}

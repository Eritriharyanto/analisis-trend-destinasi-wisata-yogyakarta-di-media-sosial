import React from "react";
import { Link } from "react-router-dom";

export default function DestinasiCard({ id, title, img, slug }) {
  const imageSrc = img || "https://via.placeholder.com/300x200?text=No+Image";

  return (
    <div className='trend-card card shadow-sm'>
      <img src={imageSrc} className='card-img-top' alt={title} />

      <div className='card-body'>
        <h5 className='card-title'>{title}</h5>

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

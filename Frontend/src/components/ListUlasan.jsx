// FILE: ListUlasan.jsx
import React from "react";

const ListUlasan = ({ loading, filteredPosts, page, setPage, perPage }) => {
  const totalPage = Math.ceil(filteredPosts.length / perPage);
  const currentData = filteredPosts.slice((page - 1) * perPage, page * perPage);

  return (
    <>
      {/* ==============================================
           📝 LIST ULASAN
         ============================================== */}
      <h3 style={{ marginTop: 40 }}>Daftar Ulasan</h3>

      {loading ? (
        <p style={{ color: "gray" }}>Sedang mengambil data...</p>
      ) : currentData.length === 0 ? (
        <p style={{ color: "gray" }}>Tidak ada ulasan</p>
      ) : (
        <>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {currentData.map((p) => (
              <li key={p.id}>
                <div
                  className='post-box'
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: 6,
                    padding: 10,
                    marginBottom: 10,
                    background: "#fafafa",
                  }}
                >
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
          <div style={{ textAlign: "center", marginTop: 20 }}>
            {page > 1 && (
              <button
                onClick={() => setPage(page - 1)}
                style={{ marginRight: 10 }}
              >
                ⬅ Prev
              </button>
            )}
            <span>
              Page <b>{page}</b> / <b>{totalPage}</b>
            </span>
            {page < totalPage && (
              <button
                onClick={() => setPage(page + 1)}
                style={{ marginLeft: 10 }}
              >
                Next ➡
              </button>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ListUlasan;

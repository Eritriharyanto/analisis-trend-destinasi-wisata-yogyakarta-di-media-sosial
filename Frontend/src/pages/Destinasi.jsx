import DestinasiCard from "../components/DestinasiCard";
import "../css/home.css";

export default function Destinasi() {
  const list = [
    {
      id: "alkid",
      lokasi: "kota yogyakarta",
      kategori: "taman kota",
      rating: 4.7,
      deskripsi:
        " Alun-alun yang terkenal dengan hiburan malam, rental gokar berlampu neon, kios camilan, bar, dan musik ceria.",
      slug: "alkid",
      title: "Alun-Alun Kidul",
      img: "/d3.jpg",
    },
    {
      id: "tamanpintar",
      lokasi: "kota yogyakarta",
      kategori: "museum sains",
      rating: 4.5,
      deskripsi:
        "Pusat pendidikan anak-anak populer yang menawarkan berbagai pameran interaktif dan game ilmu pengetahuan.",
      slug: "tamanpintar",
      title: "Taman Pintar",
      img: "/tamanpintar.jpg",
    },
    {
      id: "merapi",
      lokasi: "sleman",
      kategori: "gunung berapi",
      rating: 4.4,
      deskripsi:
        "Gunung berapi aktif setinggi 2.900 m dengan jalur pendakian ke puncak berasap & Taman Nasional di sekitarnya.",
      slug: "merapi",
      title: "Gunung Merapi",
      img: "/GunungMerapi.jpg",
    },
    {
      id: "prambanan",
      lokasi: "kota yogyakarta",
      kategori: "pura",
      rating: 4.7,
      deskripsi:
        "Kompleks candi Hindu yang luas & dibangun pada abad ke-9 dengan struktur batu atas meruncing & patung.",
      slug: "prambanan",
      title: "Candi Prambanan",
      img: "/prambanan.jpg",
    },
    {
      id: "lagunapantaidepok",
      lokasi: "bantul",
      kategori: "muara",
      rating: 4.6,
      deskripsi:
        "Pantai tenang dengan laguna, penyewaan perahu, area piknik, & warung yang menyajikan hidangan laut segar.",
      slug: "lagunapantaidepok",
      title: "Laguna Pantai Depok",
      img: "/lagunapantaidepok.webp",
    },
    {
      id: "gembiraloka",
      lokasi: "kota yogyakarta",
      kategori: "kebun binatang",
      rating: 4.5,
      deskripsi:
        "Dibuka pada 1956, kebun binatang 21 hektare dengan kolam sentuh, memberi makan hewan, naik gajah & unta.",
      slug: "gembiraloka",
      title: "Gembira Loka",
      img: "/gembiraloka.jpg",
    },
  ];

  return (
    <div className='destinasi-wrapper'>
      <div className='container'>
        <h1 className='destinasi-title'>Destinasi Tempat Wisata</h1>

        <div className='destinasi-grid'>
          {list.map((d) => (
            <DestinasiCard key={d.id} {...d} />
          ))}
        </div>
      </div>
    </div>
  );
}

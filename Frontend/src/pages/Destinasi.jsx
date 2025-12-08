import DestinasiCard from "../components/DestinasiCard";
import "./home.css";

export default function Destinasi() {
  const list = [
    {
      id: "alkid",
      slug: "alkid",
      title: "Alun-Alun Kidul",
      img: "/d3.jpg",
    },
    {
      id: "tamanpintar",
      slug: "tamanpintar",
      title: "Taman Pintar",
      img: "/tamanpintar.jpg",
    },
    {
      id: "merapi",
      slug: "merapi",
      title: "Gunung Merapi",
      img: "/GunungMerapi.jpg",
    },
    {
      id: "prambanan",
      slug: "prambanan",
      title: "Candi Prambanan",
      img: "/prambanan.jpg",
    },
    {
      id: "lagunapantaidepok",
      slug: "lagunapantaidepok",
      title: "Pantai Depok",
      img: "/Pantaidepok.jpg",
    },
    {
      id: "gembiraloka",
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

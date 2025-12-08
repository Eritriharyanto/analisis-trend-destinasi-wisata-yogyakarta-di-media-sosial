export default function Hero(){
  return (
    <div className="position-relative text-white mb-5">
      <img src="/hero-wisata.jpg" className="w-100" style={{height: "60vh", objectFit:"cover"}} alt="hero" />
      <div className="position-absolute top-50 start-50 translate-middle text-center hero-overlay p-4 rounded">
        <h1 className="display-5 fw-bold">Jelajahi Keindahan Yogyakarta</h1>
        <p className="lead">Temukan destinasi, rencanakan perjalananmu, dan dapatkan inspirasi</p>
        <a href="/destinasi" className="btn btn-primary btn-lg">Lihat Destinasi</a>
      </div>
    </div>
  );
}

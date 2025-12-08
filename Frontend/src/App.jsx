import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Destinasi from "./pages/Destinasi";
import DetailWisata from "./pages/DetailWisata";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/destinasi' element={<Destinasi />} />
          <Route path='/destinasi/:id' element={<DetailWisata />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

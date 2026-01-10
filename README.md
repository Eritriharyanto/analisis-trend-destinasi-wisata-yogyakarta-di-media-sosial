# 📊 Analisis Tren Destinasi Wisata Yogyakarta di Media Sosial

Repository ini merupakan hasil pengolahan **Backend** dan **Frontend** (berasal dari file ZIP) untuk menganalisis tren destinasi wisata di Yogyakarta berdasarkan data media sosial Platform X. Sistem ini mengolah data teks, melakukan analisis topik LDA yang sudah di buat dan di evaluasi menggunakan Coherence, lalu menampilkan hasilnya dalam bentuk antarmuka web.

## 📂 Struktur Proyek

```
Backend/
Frontend/
README.md
```

## ⚙️ Backend

Backend berfungsi untuk pengolahan dan analisis data media sosial.

**Fungsi utama:**

* Preprocessing data teks
* Analisis tren dan topik (LDA)
* Penyediaan API untuk frontend

**Teknologi & Tools:**

* Python
* Flask
* Pandas
* Gensim (LDA)
* MySQL

**Struktur penting Backend:**

* `app.py` → entry point aplikasi
* `routes/` → endpoint API
* `service/` → logika analisis & preprocessing
* `dictionaries/` → model & dictionary LDA
* `create_table.sql` → struktur database

## 🎨 Frontend

Frontend digunakan untuk menampilkan hasil analisis tren destinasi wisata secara visual.

**Fitur utama:**

* Halaman daftar destinasi wisata
* Detail tren dan topik destinasi
* Visualisasi data tren

**Teknologi:**

* React JS
* Vite
* JavaScript
* HTML & CSS

**Struktur penting Frontend:**

* `src/pages/` → halaman utama aplikasi
* `src/components/` → komponen UI
* `src/data/` → data pendukung
* `public/` → aset gambar

## 🎯 Tujuan Proyek

* Mengidentifikasi destinasi wisata Yogyakarta yang sedang tren di media sosial
* Memberikan insight berbasis data untuk pengambilan keputusan
* Menyajikan hasil analisis dalam bentuk web interaktif

---

> Project ini digunakan untuk kebutuhan akademik dan pengembangan sistem analisis data pariwisata.

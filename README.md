# 📊 Analisis Tren Destinasi Wisata Yogyakarta di Media Sosial

Repository ini merupakan hasil pengolahan **Backend** dan **Frontend** (berasal dari file ZIP) untuk menganalisis tren destinasi wisata di Yogyakarta berdasarkan data media sosial Platform X. Sistem ini mengolah data teks, melakukan analisis topik LDA yang sudah di buat dan di evaluasi menggunakan Coherence, lalu menampilkan hasilnya dalam bentuk antarmuka web.

## 📂 Struktur Proyek

```
Backend/
├── .venv/                     # Virtual environment Python
├── config/                    # Konfigurasi aplikasi (database, environment, dll)
├── dictionaries/              # Kamus data (stopwords, sinonim, custom dictionary)
├── models/                    # Model machine learning (LDA, NLP, dll)
├── preprocessing/             # Proses pembersihan dan pengolahan data teks
├── routes/                    # Endpoint / routing API backend
├── service/                   # Business logic dan service layer
├── app.py                     # File utama untuk menjalankan backend
├── create_table.sql           # Script SQL untuk membuat tabel database
├── insert_data_wisata.sql     # Script SQL untuk insert data wisata
├── lda.sql                    # Query / konfigurasi terkait LDA
├── requirements.txt           # Daftar dependency Python yang harus diinstall
```

```
Frontend/
├── node_modules/              # Dependency frontend (hasil install npm)
├── public/                    # File statis yang bisa diakses langsung
├── src/                       # Source code utama frontend
│   ├── assets/                # Asset pendukung (gambar, icon, dll)
│   ├── components/            # Komponen reusable (Navbar, Card, Footer, dll)
│   ├── css/                   # File styling CSS
│   ├── data/                  # Data statis / dummy / konfigurasi frontend
│   ├── pages/                 # Halaman utama aplikasi (Home, Detail, dll)
│   ├── App.css                # Styling utama App
│   ├── App.jsx                # Root component React
│   ├── index.css              # Styling global
│   └── main.jsx               # Entry point React (render ke DOM)
├── .gitignore                 # File/folder yang diabaikan oleh Git
├── eslint.config.js            # Konfigurasi ESLint
├── index.html                  # File HTML utama
├── package-lock.json           # Lock dependency npm
├── package.json                # Konfigurasi project & dependency
├── README.md                   # Dokumentasi frontend
├── vite.config.js              # Konfigurasi Vite
```

```
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

## 🗃️ Database

```
gembiraloka
alkid
prambanan
tamanpintar
lagunapantaidepok
merapi

Contoh:

CREATE TABLE NAMA (
    id INT AUTO_INCREMENT PRIMARY KEY,
    created_at DATETIME,
    favorite_count INT,
    retweet_count INT,
    tahun INT,
    bulan INT,
    hari VARCHAR (20),
    bulan_nama VARCHAR(20),
    cleaning TEXT,
    cleaning_no_english TEXT,
    normalization TEXT,
    stopword TEXT,
    stemming TEXT,
    tokenizing LONGTEXT
);
```

```
# Berfungsi sebagai tabel data mentah / pusat (master table) untuk semua tweet/post dari semua destinasi wisata.

CREATE TABLE post (
    id INT AUTO_INCREMENT PRIMARY KEY,
    wisata VARCHAR(100),
    created_at DATETIME,
    favorite_count INT,
    retweet_count INT,
    tahun INT,
    bulan INT,
    hari VARCHAR(20),
    bulan_nama VARCHAR(20),
    full_text TEXT,
    cleaning TEXT,
    cleaning_no_english TEXT,
    normalization TEXT,
    stopword TEXT,
    stemming TEXT,
    tokenizing LONGTEXT
);
```

```
# Menyimpan hasil analisis LDA (topic modeling).

CREATE TABLE lda_topics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tahun INT NOT NULL,
    destinasi VARCHAR(100) DEFAULT NULL,
    topic_num INT NOT NULL,
    jumlah INT NOT NULL,
    terms TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🎯 Tujuan Proyek

* Mengidentifikasi destinasi wisata Yogyakarta yang sedang tren di media sosial
* Memberikan insight berbasis data untuk pengambilan keputusan
* Menyajikan hasil analisis dalam bentuk web interaktif

---

> Project ini digunakan untuk kebutuhan akademik dan pengembangan sistem analisis data pariwisata.

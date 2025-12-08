CREATE TABLE gembiraloka (
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

CREATE TABLE alkid (
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

CREATE TABLE prambanan (
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

CREATE TABLE tamanpintar (
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

CREATE TABLE lagunapantaidepok (
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

CREATE TABLE merapi (
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

CREATE TABLE lda_topics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tahun INT NOT NULL,
    destinasi VARCHAR(100) DEFAULT NULL,
    topic_num INT NOT NULL,
    jumlah INT NOT NULL,
    terms TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


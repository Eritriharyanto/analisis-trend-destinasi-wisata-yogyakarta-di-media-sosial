# services/topic_service.py

from gensim.models.ldamodel import LdaModel
from gensim.corpora import Dictionary
from config.db import get_db
from datetime import datetime


# -------------------------------------------------------
# LOAD MODEL
# -------------------------------------------------------
def load_lda_model(wisata):
    base = f"models/{wisata}"

    model_path = f"{base}/{wisata}_lda_model_best.model"
    dict_path = f"{base}/{wisata}_lda_model_best.model.id2word"

    model = LdaModel.load(model_path)
    id2word = Dictionary.load(dict_path)
    
    return model, id2word


topic_label = {
    "alkid": {
        0: "Perdagangan & Pedagang Alun-Alun",
        1: "Fasilitas & Lingkungan Publik",
        2: "Aktivitas Malam & Nongkrong",
        3: "Cerita Mistis & Budaya Jawa",
        4: "Wahana Wisata & Jadwal",
        5: "Kuliner & Kebersihan Area",
        6: "Kuliner Tradisional"
    },
    "tamanpintar": {
        0: "Event Sosial & Kegiatan Budaya",
        1: "Keamanan & Patroli Kepolisian",
        2: "Edukasi & Pembelajaran di Taman Pintar",
        3: "Wahana & Fasilitas Pengunjung",
        4: "Penjualan & Pameran Buku",
        5: "Program Nasional & Kunjungan Resmi"
    },
    "merapi": {
        0: "Letusan & Aktivitas Vulkanik Merapi",
        1: "Foto Panorama Malam & Pemandangan Puncak",
        2: "Lokasi Wisata & Dokumentasi Perjalanan",
        3: "Aktivitas Event & Kegiatan Komunitas",
        4: "Keindahan Alam Merapi & Spot Foto Populer",
        5: "Jalur Pendakian & Keindahan Alam Jawa",
        6: "Cuaca, Awan & Pemandangan Alam Sekitar Merapi",
        7: "Destinasi Sekitar Merapi (Kaliurang, Breksi, Sleman)",
        8: "Bukit & Kawasan Wisata Merapi Barat"
    },
    "prambanan": {
        0: "Wilayah, Desa & Kawasan Sekitar Prambanan",
        1: "Warisan Budaya Dunia & Sejarah Candi",
        2: "Sejarah Pembangunan & Arsitektur Hindu",
        3: "Mitos, Cerita Legenda & Pandangan Pengunjung",
        4: "Keindahan Prambanan & Spot Foto Ikonik"
    },
    "lagunapantaidepok": {
        0: "Aktivitas Laut, Laguna & Fasilitas Sekitar Pantai",
        1: "Event Wisata & Informasi Kegiatan Pantai Depok"
    },
    "gembiraloka": {
        0: "Kunjungan Wisata & Pengalaman Pengunjung",
        1: "Promosi Ajak Berkunjung & Interaksi Wisata",
        2: "Akses Jalan, Transportasi & Informasi Lokasi",
        3: "Liburan, Akhir Pekan & Melihat Hewan"
    }
}


# -------------------------------------------------------
# PREDIKSI TOPIK
# -------------------------------------------------------
def predict_topic_from_stemming(model, id2word, stem_text, wisata):
    tokens = stem_text.split()
    bow = id2word.doc2bow(tokens)
    topics = model.get_document_topics(bow)

    if not topics:
        return None
    
    topic_id, prob = max(topics, key=lambda x: x[1])
    return {
        "topic_id": int(topic_id),
        "topic_label": topic_label.get(wisata, {}).get(int(topic_id), "Unknown"),
        "probability": float(prob)
    }



# -------------------------------------------------------
# SIMPAN HASIL TOPIK KE DATABASE LDA_TOPIC
# -------------------------------------------------------
def save_lda_topic(nama_wisata, post_id, topic_result):
    conn = get_db()
    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO lda_topic (nama_wisata, post_id, topic, probability, created_at)
        VALUES (%s, %s, %s, %s, %s)
        """,
        (
            nama_wisata,
            post_id,
            topic_result["topic_id"],
            topic_result["probability"],
            datetime.now()
        )
    )

    conn.commit()
    cursor.close()
    conn.close()

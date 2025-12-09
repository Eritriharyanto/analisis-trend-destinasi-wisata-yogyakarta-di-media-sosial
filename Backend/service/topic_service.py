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

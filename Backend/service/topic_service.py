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


# -------------------------------------------------------
# PREDIKSI TOPIK
# -------------------------------------------------------
def predict_topic_from_stemming(model, id2word, stem_text):
    tokens = stem_text.split()
    bow = id2word.doc2bow(tokens)
    topics = model.get_document_topics(bow)

    if not topics:
        return None
    
    topic_id, prob = max(topics, key=lambda x: x[1])
    return {
        "topic_id": int(topic_id),
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

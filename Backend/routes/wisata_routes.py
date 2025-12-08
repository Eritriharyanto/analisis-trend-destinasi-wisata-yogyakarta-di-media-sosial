# routes/wisata_route.py

from flask import Blueprint, request, jsonify
from service.wisata_service import get_posts, insert_auto_post
from service.preprocess import full_preprocess
from service.topic_service import load_lda_model, predict_topic_from_stemming
from service.analytics_service import trend_bulanan
from service.analytics_service import trend_topic_tahunan
import ast

wisata_bp = Blueprint("wisata", __name__, url_prefix="/wisata")


@wisata_bp.get("/<nama>/posts")
def get_wisata_posts(nama):
    posts = get_posts(nama)
    return jsonify(posts)


@wisata_bp.get("/<nama>/trend")
def get_wisata_trend(nama):
    posts = get_posts(nama)
    trend = trend_bulanan(posts)
    return jsonify(trend)


@wisata_bp.post("/<nama>/add_raw")
def add_raw_post(nama):
    body = request.get_json()

    if "text" not in body:
        return jsonify({"error": "Field 'text' tidak boleh kosong"}), 400

    raw_text = body["text"]

    # 1. PREPROCESS otomatis
    processed = full_preprocess(raw_text)

    # 2. SIMPAN ke DB
    post_id = insert_auto_post(nama, processed)

    # 3. LOAD model LDA
    model, id2word = load_lda_model(nama)

    # 4. PREDIKSI topik
    stem_string = processed["stemming"]
    topic_result = predict_topic_from_stemming(model, id2word, stem_string)

    return jsonify({
        "message": "Data berhasil disimpan dan diprediksi",
        "id": post_id,
        "processed": processed,
        "topic": topic_result
    })

@wisata_bp.get("/<nama>/topic_trend")
def get_wisata_topic_trend(nama):
    # Ambil semua post untuk wisata ini
    posts = get_posts(nama)

    # Load LDA model
    model, id2word = load_lda_model(nama)

    topic_counter = {}

    for p in posts:
        if not p["stemming"]:
            continue

        tokens = p["stemming"].split()
        bow = id2word.doc2bow(tokens)
        topics = model.get_document_topics(bow)

        if topics:
            topic, prob = max(topics, key=lambda x: x[1])
            topic_counter[topic] = topic_counter.get(topic, 0) + 1

    # Format output: ambil top 10 topik paling sering
    sorted_topics = sorted(topic_counter.items(), key=lambda x: x[1], reverse=True)[:10]

    output = []
    for topic, count in sorted_topics:
        terms = model.print_topic(topic)
        output.append({
            "topic": topic,
            "terms": terms,
            "count": count
        })

    return jsonify(output)

@wisata_bp.get("/<nama>/topic_trend/<tahun>")
def topic_trend(nama, tahun):
    tahun = int(tahun)

    posts = get_posts(nama)
    posts_tahun = [p for p in posts if str(p["created_at"]).startswith(str(tahun))]

    # Load model
    model, id2word = load_lda_model(nama)

    topic_counter = {}

    for p in posts_tahun:
        if not p["stemming"]:
            continue

        tokens = p["stemming"].split()
        bow = id2word.doc2bow(tokens)
        topics = model.get_document_topics(bow)

        if topics:
            topic, prob = max(topics, key=lambda x: x[1])
            topic_counter[topic] = topic_counter.get(topic, 0) + 1

    # Format JSON menghasilkan topic, terms, count
    output = []
    for topic, count in topic_counter.items():
        output.append({
            "topic": topic,
            "terms": model.print_topic(topic),
            "count": count
        })

    # Urutkan
    output = sorted(output, key=lambda x: x["count"], reverse=True)

    return jsonify(output)


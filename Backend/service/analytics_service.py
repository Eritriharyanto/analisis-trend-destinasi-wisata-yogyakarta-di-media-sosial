import pandas as pd
import calendar
from config.db import get_db
from service.topic_service import load_lda_model, topic_label

# =====================================================
# TREND BULANAN REVIEW
# =====================================================
def trend_bulanan(posts):
    df = pd.DataFrame(posts)

    if df.empty or "bulan" not in df:
        return []

    df = df.dropna(subset=["bulan"])
    df["bulan"] = df["bulan"].astype(int)

    result = df.groupby(["bulan"]).size().reset_index(name="jumlah")

    # Always show 12 months
    all_months = pd.DataFrame({"bulan": range(1, 13)})
    result = all_months.merge(result, on="bulan", how="left")
    result["jumlah"] = result["jumlah"].fillna(0).astype(int)
    result["bulan_nama"] = result["bulan"].apply(lambda x: calendar.month_name[x])

    return result.to_dict(orient="records")


# =====================================================
# PARSE TERMS FROM LDA STRING -> JSON LIST
# =====================================================
def topic_term_to_list(term_str):
    parts = term_str.split(" + ")
    terms = []
    for p in parts:
        try:
            weight, word = p.split("*")
            word = word.replace('"', "")
            terms.append({
                "word": word,
                "weight": float(weight)
            })
        except:
            pass
    return terms


# =====================================================
# TREND TOPIK LDA PER TAHUN
# =====================================================
def trend_topic_tahunan(nama, tahun):
    conn = get_db()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT topic, COUNT(*) AS count
        FROM lda_topic
        WHERE nama_wisata = %s AND YEAR(created_at) = %s
        GROUP BY topic
        ORDER BY count DESC
    """, (nama, tahun))

    rows = cursor.fetchall()
    cursor.close()
    conn.close()

    if not rows:
        return []

    # Load model LDA untuk wisata tersebut
    model, id2word = load_lda_model(nama)

    output = []
    for r in rows:
        topic_id = int(r["topic"])

        # Ambil 20 kata tertinggi di topik ini
        terms_raw = model.print_topic(topic_id, topn=20)

        # Ambil nama label jika ada
        label = topic_label.get(nama, {}).get(topic_id, f"Topik {topic_id}")

        output.append({
            "topic": topic_id,
            "topic_label": label,
            "count": r["count"],
            "terms": topic_term_to_list(terms_raw)
        })

    return output

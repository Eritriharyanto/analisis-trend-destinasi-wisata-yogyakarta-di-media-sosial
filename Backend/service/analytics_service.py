import pandas as pd
import calendar
from collections import Counter
from config.db import get_db
from service.topic_service import load_lda_model

# ===============================================
# TREND BULANAN REVIEW
# ===============================================
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


# ===============================================
# TREND TOPIC LDA PER TAHUN
# ===============================================
def trend_topic_tahunan(nama, tahun):
    conn = get_db()
    cursor = conn.cursor(dictionary=True)

    cursor.execute("""
        SELECT topic, COUNT(*) AS count
        FROM lda_topic
        WHERE nama_wisata = %s AND YEAR(created_at) = %s
        GROUP BY topic
        ORDER BY count DESC
        LIMIT 10
    """, (nama, tahun))

    rows = cursor.fetchall()
    cursor.close()
    conn.close()

    if not rows:
        return []

    # Load model untuk mengambil top terms
    model, id2word = load_lda_model(nama)

    output = []
    for r in rows:
        terms = model.print_topic(r["topic"])
        output.append({
            "topic": r["topic"],
            "count": r["count"],
            "terms": terms
        })

    return output

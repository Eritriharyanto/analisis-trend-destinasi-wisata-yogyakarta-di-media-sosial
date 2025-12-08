# services/wisata_service.py

from config.db import get_db
import datetime


def get_posts(wisata, limit=500):
    db = get_db()
    cursor = db.cursor(dictionary=True)
    
    query = f"""
        SELECT id, created_at, favorite_count, retweet_count,
           tahun, bulan, hari, bulan_nama,
           cleaning, cleaning_no_english, normalization,
           stopword, stemming, tokenizing 
        FROM {wisata}
        ORDER BY created_at DESC 
        LIMIT %s
    """
    cursor.execute(query, (limit,))
    rows = cursor.fetchall()
    cursor.close()
    db.close()
    
    return rows

def insert_auto_post(wisata, processed):
    now = datetime.datetime.now()

    tahun = now.year
    bulan = now.month
    hari = now.strftime("%A")
    bulan_nama = now.strftime("%B")

    db = get_db()
    cursor = db.cursor()

    query = f"""
        INSERT INTO {wisata}
        (created_at, favorite_count, retweet_count, tahun, bulan, hari, bulan_nama,
         cleaning, cleaning_no_english, normalization, stopword, stemming, tokenizing)
        VALUES (NOW(), 0, 0, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """

    values = (
        tahun,
        bulan,
        hari,
        bulan_nama,
        processed["cleaning"],
        processed["translate"],        # ← ini bagian translate BARU
        processed["normalization"],
        processed["stopword"],
        processed["stemming"],
        str(processed["tokenizing"])  # simpan string list
    )

    cursor.execute(query, values)
    db.commit()

    inserted_id = cursor.lastrowid
    cursor.close()
    db.close()

    return inserted_id
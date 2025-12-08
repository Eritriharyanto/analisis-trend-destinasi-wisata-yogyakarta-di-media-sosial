import pandas as pd
import nltk
from Sastrawi.Stemmer.StemmerFactory import StemmerFactory

# Inisialisasi stemmer
stemmer = StemmerFactory().create_stemmer()

# Daftar kata yang tidak boleh di-stem (whitelist)
whitelist = {
    "merapi", "malioboro", "prambanan", "gembira", "loka",
    "alunalun", "sleman", "bantul", "jogja", "yogyakarta",
    "tugu", "kaliurang", "parangtritis"
}

# Fungsi stemming aman
def safe_stem(text):
    words = str(text).split()
    result = []

    for w in words:
        wl = w.lower()

        # 1. Jika ada di whitelist → jangan di-stem
        if wl in whitelist:
            result.append(wl)
            continue

        # 2. Hindari pemotongan awalan 'me' untuk non kata kerja
        if wl.startswith("me") and len(wl) <= 5:
            result.append(wl)
            continue

        # 3. Jika aman → stem seperti biasa
        result.append(stemmer.stem(wl))

    return " ".join(result)

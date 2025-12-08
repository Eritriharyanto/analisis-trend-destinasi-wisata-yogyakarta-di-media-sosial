import pandas as pd
import nltk
from nltk.corpus import words

nltk.download('words')
english_words = set(words.words())

def remove_english_words(text):
    if pd.isna(text):
        return text

    tokens = text.split()
    cleaned = []

    for t in tokens:
        word = t.lower()

        # Skip jika bukan huruf
        if not word.isalpha():
            cleaned.append(t)
            continue

        # Skip kata sangat pendek (biasanya bukan English)
        if len(word) <= 2:
            cleaned.append(t)
            continue

        # Cek apakah kata termasuk kamus Inggris
        if word not in english_words:
            cleaned.append(t)

    return " ".join(cleaned)
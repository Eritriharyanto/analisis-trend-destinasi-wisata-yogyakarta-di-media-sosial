import pandas as pd
import nltk
nltk.download('punkt')
from nltk.tokenize import word_tokenize

# Fungsi untuk melakukan tokenisasi
def tokenize_text(text):
    if isinstance(text, str):
        return word_tokenize(text)
    else:
        return []


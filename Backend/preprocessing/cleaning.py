import pandas as pd
import warnings
import re
import string
warnings.filterwarnings('ignore')

def clean_text(text):
  if isinstance(text, str):

    # Mengubah teks menjadi huruf kecil
    text = text.lower()

    #Mengganti simbol menjadi spasi
    text = text.replace('.','').replace('/','').replace(',','').replace('-','')

    # Menghapus mention
    text = re.sub(r'@\w+', '', text)

    # Menghapus hashtag
    text = re.sub(r'#\w+', '', text)

    # Menghapus URL/link
    text = re.sub(r'http\S+|www\S+|https\S+', '', text)

    # Menghapus angka
    text = re.sub(r'\d+', '', text)

    # Menghapus emoji dan karakter non-ASCII
    text = re.sub(r'[^\x00-\x7F]+', '', text)

    # Menghapus karakter non-alphanumeric
    text = re.sub(r'[^a-zA-Z0-9\s]', '', text)

    # Menghapus tanda baca
    text = text.translate(str.maketrans('', '', string.punctuation))

    # Menghapus spasi berlebih
    text = re.sub(r'\s+', ' ', text).strip()
    return text
  else:
    return ''
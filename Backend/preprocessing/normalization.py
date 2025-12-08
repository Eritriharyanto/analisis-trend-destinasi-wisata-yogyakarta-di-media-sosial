import pandas as pd

# Fungsi untuk memuat kamus slang
def load_slang_dictionary(file_path):
    # Membaca kamus slang dari file Excel
    df = pd.read_csv(file_path)
    # Mengubah kamus slang menjadi dictionary
    slang_dict = dict(zip(df['slang'], df['formal']))
    return slang_dict

# Fungsi untuk melakukan normalisasi teks
def normalize_text(text, slang_dict):
    if isinstance(text, str):
        # Memisahkan kata-kata dalam teks
        words = text.split()
        normalized_words = []
        for word in words:
            # Mengganti kata slang dengan kata normal jika ada dalam kamus slang
            normalized_word = slang_dict.get(word.lower(), word)
            normalized_words.append(normalized_word)
        #Menggabungkan kata-kata yang sudah dinormalisasi menjadi teks baru
        normalized_words = [str(word) for word in normalized_words]
        normalized_text = ' '.join(normalized_words)
        return normalized_text
    else:
        return str(text)

# Memuat kamus slang
slang_dict = load_slang_dictionary('./preprocessing/slang\stop/slang.csv')

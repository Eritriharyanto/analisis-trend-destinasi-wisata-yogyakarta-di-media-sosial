import pandas as pd

# Membaca kamus stopword dari file .csv yang telah di upload di Google Drive
stopwords_path = "./preprocessing/slang\stop/stopword.csv"
df_stopwords = pd.read_csv(stopwords_path, header=None)
stopwords_indonesia = df_stopwords[0].tolist()

def remove_stopwords(text):
    if isinstance(text, str):
        words = text.split()
        filtered_words = []
        for word in words:
            if word.lower() not in stopwords_indonesia:
                filtered_words.append(word)
        filtered_text = ' '.join(filtered_words)
        return filtered_text
    else:
        return text
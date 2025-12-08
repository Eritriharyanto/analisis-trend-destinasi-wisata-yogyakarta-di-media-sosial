# services/preprocess_service.py

from preprocessing.cleaning import clean_text
from preprocessing.normalization import normalize_text, load_slang_dictionary
from preprocessing.stopword import remove_stopwords
from preprocessing.stemming import safe_stem
from preprocessing.tokenizing import tokenize_text
from preprocessing.translate import remove_english_words   # ← tambahkan import translate
import nltk

nltk.download('punkt')
nltk.download('punkt_tab')


# load sekali saja saat server berjalan → lebih cepat
SLANG_DICT = load_slang_dictionary('./preprocessing/slang\stop/slang.csv')

def full_preprocess(text):
    # 1. Cleaning
    step1 = clean_text(text)

    # 2. Translate (tambahan baru)
    step_translate = remove_english_words(step1)

    # 3. Normalization (pakai slang dict)
    step2 = normalize_text(step_translate, SLANG_DICT)

    # 4. Stopword Removal
    step3 = remove_stopwords(step2)

    # 5. Stemming
    step4 = safe_stem(step3)

    # 6. Tokenizing
    tokens = tokenize_text(step4)

    return {
        "cleaning": step1,
        "translate": step_translate,
        "normalization": step2,
        "stopword": step3,
        "stemming": step4,
        "tokenizing": tokens
    }

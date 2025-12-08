# config/settings.py

import os

# ============================
# APP CONFIG
# ============================
APP_NAME = "Wisata Trend Analytics API"
DEBUG = True


# ============================
# DATABASE CONFIG (read from .env)
# ============================
DB_HOST = os.getenv("DB_HOST", "localhost")
DB_USER = os.getenv("DB_USER", "root")
DB_PASS = os.getenv("DB_PASS", "qwertyuiop890")
DB_NAME = os.getenv("DB_NAME", "wisata3")


# ============================
# AVAILABLE WISATA LIST
# harus sama dengan nama folder di /models
# dan sama dengan nama tabel di database
# ============================
WISATA_LIST = [
    "alkid",
    "gembiraloka",
    "lagunapantaidepok",
    "merapi",
    "prambanan",
    "tamanpintar"
]


# ============================
# PATH MODEL LDA
# tiap wisata punya folder sendiri
# ============================
BASE_MODEL_PATH = "models"


def get_model_path(wisata):
    """
    Menghasilkan folder model: models/merapi, models/prambanan, dll
    """
    return os.path.join(BASE_MODEL_PATH, wisata)


# ============================
# LIMIT & DEFAULT SETTINGS
# ============================
DEFAULT_POST_LIMIT = 500       # jumlah data yang diambil
MAX_POST_LIMIT = 2000          # batas maksimal untuk menghindari overload


# ============================
# PREPROCESS SETTINGS (optional)
# ============================
USE_TRANSLATION = False        # jika tidak perlu translate
USE_STEMMING = True
USE_STOPWORD = True

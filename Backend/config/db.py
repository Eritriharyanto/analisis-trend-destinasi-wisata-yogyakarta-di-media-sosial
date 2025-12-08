# config/db.py

import mysql.connector
from dotenv import load_dotenv
import os


load_dotenv()

def get_db():
    return mysql.connector.connect(
        host=os.getenv("DB_HOST", "localhost"),
        user=os.getenv("DB_USER", "root"),
        password=os.getenv("DB_PASS", "qwertyuiop890"),
        database=os.getenv("DB_NAME", "wisata3"),
        auth_plugin="mysql_native_password"
    )

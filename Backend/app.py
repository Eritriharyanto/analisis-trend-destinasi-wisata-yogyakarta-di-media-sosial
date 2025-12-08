# app.py

from flask import Flask
from routes.wisata_routes import wisata_bp
from routes.topic_routes import topic_bp
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

app.register_blueprint(topic_bp)
app.register_blueprint(wisata_bp)

if __name__ == "__main__":
    app.run(debug=True)

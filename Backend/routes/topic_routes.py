# routes/topic_routes.py

from flask import Blueprint, jsonify
from service.analytics_service import trend_topic_tahunan

topic_bp = Blueprint("topic", __name__, url_prefix="/topic")

@topic_bp.get("/<nama>/<tahun>")
def get_topic_trend_by_year(nama, tahun):
    result = trend_topic_tahunan(nama, int(tahun))
    return jsonify(result)

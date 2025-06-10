import os
from flask import Blueprint, jsonify

# ✅ Add url_prefix here
clear_bp = Blueprint('clear', __name__, url_prefix='/reports')

@clear_bp.route('/clear', methods=['DELETE'])  # ✅ Just '/clear' now
def clear_reports():
    reports_dir = 'reports'
    if not os.path.exists(reports_dir):
        return jsonify({"message": "Reports directory not found"}), 404

    deleted = 0
    for file in os.listdir(reports_dir):
        if file.endswith(".json"):
            os.remove(os.path.join(reports_dir, file))
            deleted += 1

    return jsonify({"message": f"Deleted {deleted} reports."}), 200


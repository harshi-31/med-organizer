from flask import Blueprint, jsonify
import os
import json

list_bp = Blueprint('list', __name__)

@list_bp.route('/reports', methods=['GET'])
def list_reports():
    folder = 'saved_reports'
    files = [f for f in os.listdir(folder) if f.endswith('.json')]

    reports = []
    for filename in sorted(files, reverse=True):  # Sort latest first
        filepath = os.path.join(folder, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
            data['filename'] = filename  # Include filename in case you need it
            reports.append(data)

    return jsonify(reports)

from flask import Blueprint, request, jsonify
import pytesseract
from PIL import Image
import os
from utils.categorize import categorize_text

# Optional: If you're on Windows, set the Tesseract path
pytesseract.pytesseract.tesseract_cmd = r'E:\Tesseract\tesseract.exe'

ocr_bp = Blueprint('ocr', __name__)

@ocr_bp.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        image = Image.open(file.stream)
        extracted_text = pytesseract.image_to_string(image)
        text = pytesseract.image_to_string(image)
        category = categorize_text(text)
        return jsonify({'extracted_text': extracted_text,'category': category}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

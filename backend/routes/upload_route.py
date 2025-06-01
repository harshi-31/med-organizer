from flask import Blueprint, request, jsonify
import pytesseract
from PIL import Image
import os
from utils.categorize import categorize_text
import re
import cv2
import numpy as np
#from utils.summarizer import summarize_text

pytesseract.pytesseract.tesseract_cmd = r'E:\Tesseract\tesseract.exe'
def preprocess_image(file_stream):
    # Convert file stream to OpenCV image
    file_bytes = np.asarray(bytearray(file_stream.read()), dtype=np.uint8)
    image = cv2.imdecode(file_bytes, cv2.IMREAD_COLOR)

    # Convert to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Apply thresholding to binarize the image
    _, thresh = cv2.threshold(gray, 150, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

    # Optional: Resize to improve accuracy for small fonts
    scale_percent = 150
    width = int(thresh.shape[1] * scale_percent / 100)
    height = int(thresh.shape[0] * scale_percent / 100)
    resized = cv2.resize(thresh, (width, height), interpolation=cv2.INTER_LINEAR)

    # Convert back to PIL image for Tesseract
    from PIL import Image
    pil_image = Image.fromarray(resized)
    return pil_image

ocr_bp = Blueprint('ocr', __name__)

def extract_hospital_and_doctor(text):
    # Extract hospital name
    hospital_pattern = r'(?i)(?:.*(?:Hospital|Clinic|Medical|Diagnostics).*)'
    hospital_matches = re.findall(hospital_pattern, text)

    # Extract doctor name
    doctor_pattern = r'(Dr\.?\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)'
    doctor_matches = re.findall(doctor_pattern, text)

    hospital = hospital_matches[0] if hospital_matches else "Not found"
    doctor = doctor_matches[0] if doctor_matches else "Not found"

    return hospital.strip(), doctor.strip()

def extract_dates(text):
    # Common date formats: 12/03/2023, 12-03-2023, 12 Mar 2023, March 12, 2023
    date_patterns = [
        r'\b\d{1,2}[/-]\d{1,2}[/-]\d{2,4}\b',                     # 12/03/2023 or 12-03-23
        r'\b\d{1,2}\s+[A-Za-z]{3,9}\s+\d{2,4}\b',                 # 12 March 2023
        r'\b[A-Za-z]{3,9}\s+\d{1,2},?\s+\d{2,4}\b' 
        r'\b\d{1,2}[/-]\d{1,2}[/-]\d{2,4}\b'# March 12, 2023
    ]

    dates = []
    for pattern in date_patterns:
        matches = re.findall(pattern, text)
        dates.extend(matches)
    
    # Return first date if available
    return dates[0] if dates else "Not found"


@ocr_bp.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in the request'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    try:
        image = preprocess_image(file.stream)
        custom_config = r'--oem 3 --psm 6'
        extracted_text = pytesseract.image_to_string(image, config=custom_config)
        text = pytesseract.image_to_string(image)
        category = categorize_text(text)
        hospital, doctor = extract_hospital_and_doctor(extracted_text)
        date = extract_dates(extracted_text)
        #summary = summarize_text(extracted_text)
        return jsonify({
            'extracted_text': extracted_text,
            'category': category,
            'hospital': hospital,
            'doctor': doctor,
            'date': date,
            #'summary': summary,
            }), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

from flask import Flask, request, jsonify
import pytesseract
from PIL import Image

# For Windows only: specify Tesseract path
# pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

app = Flask(__name__)

@app.route('/upload', methods=['POST'])
def upload_file():
    file = request.files['file']
    image = Image.open(file.stream)
    text = pytesseract.image_to_string(image)
    return jsonify({'extracted_text': text})

if __name__ == '__main__':
    app.run(debug=True)

from flask import Flask, request, jsonify
import pytesseract
from PIL import Image

# For Windows only: specify Tesseract path
pytesseract.pytesseract.tesseract_cmd = r'E:\Tesseract\tesseract.exe'

app = Flask(__name__)

@app.route('/')
def home():
    return "Server is up!"

@app.route('/upload', methods=['POST'])
def upload_file():
    file = request.files['file']
    image = Image.open(file.stream)
    text = pytesseract.image_to_string(image)
    return jsonify({'extracted_text': text})

if __name__ == '__main__':
    app.run(debug=True, port=8000)
'''@app.route('/', methods=['GET'])
def home():
    return "Welcome to Medical Report Organizer API!"'''


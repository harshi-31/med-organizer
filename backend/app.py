from flask import Flask
from routes.upload_route import ocr_bp

app = Flask(__name__)
app.register_blueprint(ocr_bp)

if __name__ == '__main__':
    app.run(debug=True, port=8000)


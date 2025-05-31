from flask import Flask
from routes.upload_route import ocr_bp
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.register_blueprint(ocr_bp)

CORS(app, origins=["http://localhost:3000"])
if __name__ == '__main__':
    app.run(debug=True, port=8000)


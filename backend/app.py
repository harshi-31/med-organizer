from flask import Flask
from routes.upload_route import ocr_bp
from flask_cors import CORS
from routes.list_route import list_bp
from routes.clear_route import clear_bp


app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])
print(app.url_map)

app.register_blueprint(ocr_bp)
app.register_blueprint(list_bp)
app.register_blueprint(clear_bp)


if __name__ == '__main__':
    app.run(debug=True, port=8000)



from flask import Flask, jsonify
from flask_cors import CORS
from config import Config
from models.models import db, User
from routes.auth_routes import auth_bp
from routes.post_routes import post_bp
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
import os

app = Flask(__name__, instance_relative_config=True)
app.secret_key = 'your-super-secret-key'
app.config.from_object(Config)

app.config["JWT_SECRET_KEY"] = "super-secret-jwt-key"
app.config["JWT_TOKEN_LOCATION"] = ["headers", "cookies"]
app.config["JWT_COOKIE_SECURE"] = False
app.config["JWT_COOKIE_CSRF_PROTECT"] = True
jwt = JWTManager(app)

basedir = os.path.abspath(os.path.dirname(__file__))
db_path = os.path.join(basedir, 'instance', 'inkspire.db')
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_path}'

CORS(app, resources={r"/*": {
    "origins": [
        "http://127.0.0.1:5173",
        "http://localhost:5173",
        "http://127.0.0.1:5174",
        "http://localhost:5174"
    ],
    "methods": ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    "allow_headers": ["Content-Type", "Authorization", "X-CSRF-TOKEN"],
    "supports_credentials": True
}})

db.init_app(app)
migrate = Migrate(app, db)

@app.errorhandler(404)
def not_found(e):
    return jsonify({"error": "Resource not found"}), 404

@app.errorhandler(500)
def server_error(e):
    return jsonify({"error": "Internal server error"}), 500

app.register_blueprint(auth_bp)
app.register_blueprint(post_bp)

if __name__ == "__main__":
    app.run(debug=True)
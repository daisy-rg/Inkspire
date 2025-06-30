from flask import Flask, jsonify
from flask_cors import CORS
from flask_login import LoginManager
from config import Config
from models.models import db, User
from routes.auth_routes import auth_bp
from routes.post_routes import post_bp
from flask_migrate import Migrate
import os

app = Flask(__name__, instance_relative_config=True)
app.secret_key = 'your-super-secret-key'
app.config.from_object(Config)

basedir = os.path.abspath(os.path.dirname(__file__))
db_path = os.path.join(basedir, 'instance', 'inkspire.db')
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_path}'

CORS(app, resources={r"/*": {"origins": [
    "http://127.0.0.1:5173",
    "http://localhost:5173",
    "http://127.0.0.1:5174",
    "http://localhost:5174"
]}}, supports_credentials=True)

db.init_app(app)
migrate = Migrate(app, db)

login_manager = LoginManager()
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@login_manager.unauthorized_handler
def unauthorized():
    return jsonify({'error': 'Unauthorized'}), 401

app.register_blueprint(auth_bp)
app.register_blueprint(post_bp)

if __name__ == "__main__":
    app.run(debug=True)

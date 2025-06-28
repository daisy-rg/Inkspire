from flask import Flask
from flask_cors import CORS
from config import Config
from models.models import db
from routes.auth_routes import auth_bp
from routes.post_routes import post_bp
from flask_migrate import Migrate
import os

app = Flask(__name__, instance_relative_config=True)
app.config.from_object(Config)

# ✅ Correct DB path — pointing inside backend/instance/
basedir = os.path.abspath(os.path.dirname(__file__))
db_path = os.path.join(basedir, 'instance', 'inkspire.db')
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_path}'
print("DB PATH:", db_path)
print("DB EXISTS:", os.path.exists(db_path))

CORS(app, resources={r"/*": {"origins": ["http://127.0.0.1:5173", "http://localhost:5173"]}}, supports_credentials=True)

db.init_app(app)
migrate = Migrate(app, db)

app.register_blueprint(auth_bp)
app.register_blueprint(post_bp)

if __name__ == "__main__":
    app.run(debug=True)

from flask import Flask
from flask_cors import CORS
from config import Config
from models.models import db, User
from flask_migrate import Migrate
from flask_login import LoginManager  
from routes.auth_routes import auth_bp
from routes.post_routes import post_bp
import os

app = Flask(__name__, instance_relative_config=True)
app.config.from_object(Config)

basedir = os.path.abspath(os.path.dirname(__file__))
db_path = os.path.join(basedir, 'instance', 'inkspire.db')
app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{db_path}'
app.config['SECRET_KEY'] = 'your-secret-key'  

CORS(app, supports_credentials=True)

db.init_app(app)
migrate = Migrate(app, db)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'auth_bp.login'  

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

app.register_blueprint(auth_bp)
app.register_blueprint(post_bp)

if __name__ == "__main__":
    app.run(debug=True)

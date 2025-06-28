import os

class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY", "super-secret-key")
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        "DATABASE_URL",
        "sqlite:///" + os.path.join(os.path.abspath(os.path.dirname(__file__)), "..", "instance", "inkspire.db")
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    DEBUG = True

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from werkzeug.security import generate_password_hash
from faker import Faker
from datetime import datetime
from models.models import db, User, Post  
from app import app  
fake = Faker()

with app.app_context():
 
    users = []
    posts = []

    for _ in range(20):
        user = User(
            username=fake.user_name(),
            email=fake.email(),
              password_hash=generate_password_hash("password123"),
        )
        db.session.add(user)
        db.session.flush()

        for _ in range(fake.random_int(min=2, max=7)):
            post = Post(
                title=fake.sentence(nb_words=6),
                content=fake.paragraph(nb_sentences=300),
                created_at=fake.date_time_between(start_date='-1y', end_date='now'),
                user_id=user.id
            )
            posts.append(post)

        users.append(user)

    db.session.add_all(posts)
    db.session.commit()

    print(f"Seeded {len(users)} users and {len(posts)} posts.")

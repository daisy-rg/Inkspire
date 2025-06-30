from flask import Blueprint, jsonify, request
from models.models import db, Post, User
from datetime import datetime
from flask_login import login_required,current_user

post_bp = Blueprint('posts_bp', __name__)

@post_bp.route('/posts', methods=['GET'])
def get_posts():
    try:
        posts = Post.query.options(db.joinedload(Post.author)).all()
        posts_data = []

        for post in posts:
            post_data = {
                'id': post.id,
                'title': post.title,
                'content': post.content,
                'created_at': post.created_at.isoformat(),
                'author': {
                    'id': post.author.id,
                    'username': post.author.username
                } if post.author else None
            }
            posts_data.append(post_data)

        return jsonify(posts_data), 200
    except Exception as e:
        print(f"Error fetching posts: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500


@post_bp.route('/posts', methods=['POST'])

def create_post():
    data = request.get_json()
    title = data.get('title')
    content = data.get('content')
    user_id = data.get('user_id')

    if not title or not content or not user_id:
        return jsonify({'error': 'Title, content and users id are required'}), 400

    new_post = Post(
        title=title,
        content=content,
        created_at=datetime.utcnow(),
        user_id=user_id
    )

    db.session.add(new_post)
    db.session.commit()

    return jsonify({'message': 'Post created successfully'}), 201

@post_bp.route('/posts/<int:post_id>', methods=['DELETE'])
def delete_post(post_id):
    post = Post.query.get(post_id)
    if not post:
        return jsonify({'error': 'Post not found'}), 404

    return jsonify({'error': 'Unauthorized'}), 403


from flask import Blueprint, request, jsonify
from models.models import db, Post, User
post_bp = Blueprint('post_bp', __name__)

@post_bp.route('/posts', methods=['POST'])
def create_post():
    data = request.get_json()
    title = data.get('title')
    content = data.get('content')
    user_id = data.get('user_id')

    if not title or not content or not user_id:
        return jsonify({'error': 'Missing required fields'}), 400

    new_post = Post(title=title, content=content, user_id=user_id)
    db.session.add(new_post)
    db.session.commit()

    return jsonify({'message': 'Post created successfully'}), 201

@post_bp.route('/posts', methods=['GET'])
def get_all_posts():
    posts = Post.query.order_by(Post.created_at.desc()).all()
    return jsonify([
        {
            'id': p.id,
            'title': p.title,
            'content': p.content,
            'author': p.author.username,
            'created_at': p.created_at.isoformat()
        } for p in posts
    ])

@post_bp.route('/users/<int:user_id>/posts', methods=['GET'])
def get_user_posts(user_id):
    user = User.query.get_or_404(user_id)
    posts = Post.query.filter_by(user_id=user.id).order_by(Post.created_at.desc()).all()
    return jsonify([
        {
            'id': p.id,
            'title': p.title,
            'content': p.content,
            'created_at': p.created_at.isoformat()
        } for p in posts
    ])

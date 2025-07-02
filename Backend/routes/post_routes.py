from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.models import db, Post, User
from datetime import datetime

post_bp = Blueprint('posts_bp', __name__)

@post_bp.route('/posts', methods=['GET'])
def get_posts():
    posts = Post.query.options(db.joinedload(Post.author)).all()
    return jsonify([{
        'id': post.id,
        'title': post.title,
        'content': post.content,
        'created_at': post.created_at.isoformat(),
        'author': {
            'id': post.author.id,
            'username': post.author.username
        }
    } for post in posts]), 200

@post_bp.route('/posts', methods=['POST'])
@jwt_required()
def create_post():
    data = request.get_json()
    if not data.get('title') or not data.get('content'):
        return jsonify({'error': 'Title and content required'}), 400
    user_id = get_jwt_identity()
    print("JWT Identity (user_id):", user_id)

    if not user_id:
        return jsonify({'error': 'Invalid or missing user identity'}), 401

    new_post = Post(
        title=data['title'],
        content=data['content'],
        user_id=get_jwt_identity(),
        created_at=datetime.utcnow()
    )
    db.session.add(new_post)
    db.session.commit()
    return jsonify({'message': 'Post created'}), 201

@post_bp.route('/posts/<int:post_id>', methods=['GET'])
def get_post(post_id):
    post = Post.query.options(db.joinedload(Post.author)).get(post_id)
    if not post:
        return jsonify({'error': 'Post not found'}), 404
    return jsonify({
        'id': post.id,
        'title': post.title,
        'content': post.content,
        'author': {
            'id': post.author.id,
            'username': post.author.username
        }
    }), 200

@post_bp.route('/posts/<int:post_id>', methods=['PATCH'])
@jwt_required()
def update_post(post_id):
    post = Post.query.get(post_id)
    if not post:
        return jsonify({'error': 'Post not found'}), 404
    if post.user_id != get_jwt_identity():
        return jsonify({'error': 'Unauthorized'}), 403

    data = request.get_json()
    post.title = data.get('title', post.title)
    post.content = data.get('content', post.content)
    db.session.commit()
    return jsonify({'message': 'Post updated'}), 200

@post_bp.route('/posts/<int:post_id>', methods=['DELETE'])
@jwt_required()
def delete_post(post_id):
    post = Post.query.get(post_id)
    if not post:
        return jsonify({'error': 'Post not found'}), 404
    if post.user_id != get_jwt_identity():
        return jsonify({'error': 'Unauthorized'}), 403
    db.session.delete(post)
    db.session.commit()
    return jsonify({'message': 'Post deleted'}), 200
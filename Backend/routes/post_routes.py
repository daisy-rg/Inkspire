from flask import Blueprint, request, jsonify
from models.models import db, Post, User
from flask_login import login_required, current_user

post_bp = Blueprint('post_bp', __name__)

@post_bp.route('/posts', methods=['POST'])
@login_required
def create_post():
    data = request.get_json()
    title = data.get('title')
    content = data.get('content')

    user_id = current_user.id
    user = current_user

    if not title or not content:
        return jsonify({'error': 'Missing required fields'}), 400

    new_post = Post(title=title, content=content, user_id=user_id)
    db.session.add(new_post)
    db.session.commit()

    return jsonify({
        'message': 'Post created successfully',
        'post': {
            'id': new_post.id,
            'title': new_post.title,
            'content': new_post.content,
            'author': user.username,
            'created_at': new_post.created_at.isoformat()
        }
    }), 201

@post_bp.route('/posts', methods=['GET'])
def get_user_posts():
    user_id = request.args.get('user_id')

    if not user_id:
        return jsonify({'error': 'User ID is required'}), 400

    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404

    posts = Post.query.filter_by(user_id=user.id).order_by(Post.created_at.desc()).all()

    return jsonify([
        {
            'id': p.id,
            'title': p.title,
            'content': p.content,
            'author': user.username,
            'created_at': p.created_at.isoformat()
        } for p in posts
    ]), 200

@post_bp.route('/users/<int:user_id>/posts', methods=['GET'])
def get_specific_user_posts(user_id):
    user = User.query.get_or_404(user_id)
    posts = Post.query.filter_by(user_id=user.id).order_by(Post.created_at.desc()).all()

    return jsonify([
        {
            'id': post.id,
            'title': post.title,
            'content': post.content,
            'created_at': post.created_at.isoformat()
        } for post in posts
    ]), 200

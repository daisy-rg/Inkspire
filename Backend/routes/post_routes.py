from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from models.models import db, Post
from datetime import datetime

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
@login_required
def create_post():
    data = request.get_json()
    title = data.get('title')
    content = data.get('content')

    if not title or not content:
        return jsonify({'error': 'Missing required fields'}), 400

    new_post = Post(title=title, content=content, user_id=current_user.id)
    db.session.add(new_post)
    db.session.commit()

    return jsonify({
        'message': 'Post created successfully',
        'post': {
            'id': new_post.id,
            'title': new_post.title,
            'content': new_post.content,
            'created_at': new_post.created_at.isoformat(),
            'author': {
                'id': current_user.id,
                'username': current_user.username
            }
        }
    }), 201

@post_bp.route('/posts/<int:post_id>', methods=['DELETE'])
@login_required
def delete_post(post_id):
    post = Post.query.get(post_id)
    if not post:
        return jsonify({'error': 'Post not found'}), 404

    if post.user_id != current_user.id:
        return jsonify({'error': 'Unauthorized'}), 403

    db.session.delete(post)
    db.session.commit()
    return jsonify({'message': 'Post deleted'}), 200

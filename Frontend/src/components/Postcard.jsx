import React from "react";
import './Postcard.css';
import { useNavigate } from "react-router-dom";

function Postcard({ post }) {
  const navigate = useNavigate();

  const handleRead = () => {
    navigate(`/posts/${post.id}`);
  };

  const handleDelete = () => {
    fetch(`http://127.0.0.1:5000/posts/${post.id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then(res => {
        if (res.ok) {
          alert("Post deleted!");
          window.location.reload();
        } else {
          alert("Failed to delete post.");
        }
      })
      .catch(err => {
        console.error("Error deleting post:", err);
        alert("An error occurred.");
      });
  };

  const preview = post.content.length > 100
    ? post.content.slice(0, 100) + "..."
    : post.content;

  return (
    <div className="post-card">
      <h2 className="post-title">{post.title}</h2>
      <p className="post-owner">
        By <span className="font-medium">{post.author?.username || "unknown"}</span>
      </p>
      <p className="post-content">{preview}</p>

      <div className="post-actions">
        <button className="read-btn" onClick={handleRead}>Read</button>
        {localStorage.getItem("user_id") === post.author?.id?.toString() && (
          <button onClick={handleDelete}>Delete</button>
        )}
      </div>
    </div>
  );
}

export default Postcard;

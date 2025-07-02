import React, { useContext } from "react";
import './Postcard.css';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";

function Postcard({ post }) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleRead = () => {
    navigate(`/posts/${post.id}`);
  };

  const handleDelete = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("You must be logged in to delete this post.");
      return;
    }

    fetch(`http://127.0.0.1:5000/posts/${post.id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.ok) {
          alert("Post deleted!");
          window.location.reload();
        } else {
          res.json().then(data => {
            alert(data.error || "Failed to delete post.");
          });
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
        {user?.id === post.author?.id && (
          <button className="delete-btn" onClick={() => {
            if (window.confirm("Are you sure you want to delete this post?")) {
              handleDelete();
            }
          }}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

export default Postcard;

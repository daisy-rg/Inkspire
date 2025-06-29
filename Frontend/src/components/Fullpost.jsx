import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Postcard.css"; 

function FullPost() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/posts`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((p) => p.id === parseInt(postId));
        if (found) {
          setPost(found);
        } else {
          setError("Post not found.");
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load post.");
      });
  }, [postId]);

  if (error) {
    return <p style={{ color: "red", padding: "1rem" }}>{error}</p>;
  }

  if (!post) {
    return <p className="loading">Loading post...</p>;
  }

  return (
    <div className="post-card">
      <h2 className="post-title">{post.title}</h2>
      <p className="post-owner">
        By <span className="font-medium">{post.author?.username || "Unknown"}</span>
      </p>
      <p className="post-content" style={{ whiteSpace: "pre-wrap" }}>{post.content}</p>

      <button
        onClick={() => navigate(-1)}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          borderRadius: "0.5rem",
          border: "1px solid #6b7280",
          backgroundColor: "transparent",
          color: "#6b7280",
          cursor: "pointer",
        }}
      >
        ← Back
      </button>
    </div>
  );
}

export default FullPost;

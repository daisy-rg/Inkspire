import React, { useEffect, useState } from "react";
import Postcard from "../components/Postcard";
import "../components/Postlist.css";

function Postlist() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/posts", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setPosts(data);
        setError(null);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="loading">Loading posts...</p>;
  }

  if (error) {
    return <p className="error">Error: {error}</p>;
  }

  return (
    <section className="post-list">
      <h1 className="post-list-title">📝 All Blog Posts</h1>
      {posts.length > 0 ? (
        posts.map((post) => <Postcard key={post.id} post={post} />)
      ) : (
        <p className="no-posts">No posts available.</p>
      )}
    </section>
  );
}

export default Postlist;

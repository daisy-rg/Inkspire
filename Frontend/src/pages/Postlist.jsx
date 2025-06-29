import React, { useEffect, useState } from "react";
import Postcard from "../components/Postcard";
import "../components/Postlist.css";

function Postlist() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/posts", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }
        return res.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="loading">Loading posts...</p>;
  }

  if (error) {
    return <p className="error">Could not load posts. Please try again later.</p>;
  }

  return (
    <section className="post-list">
      <h1 className="post-list-title">📝 All Blog Posts</h1>
      {posts.length > 0 ? (
        posts.map((post) => <Postcard key={post.id} post={post} />)
      ) : (
        <p className="no-posts">No posts yet.</p>
      )}
    </section>
  );
}

export default Postlist;

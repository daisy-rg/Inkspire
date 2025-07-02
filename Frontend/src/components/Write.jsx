import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Write() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token'); 

    if (!token) {
      alert("You must be logged in to post.");
      return;
    }

    fetch("http://localhost:5000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, 
      },
      body: JSON.stringify({ title, content }),
      credentials: 'include',
    })
      .then(res => {
        if (res.ok) {
          alert("Story posted!");
          navigate('/start');
        } else {
          res.json().then(data => {
            alert(data.error || "Failed to post story");
          });
        }
      })
      .catch(err => {
        console.error("Error posting story:", err);
        alert("Something went wrong");
      });
  };

  return (
    <form onSubmit={handleSubmit} className="write-container">
      <h2>Write a Story</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Your story..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      ></textarea>
      <button type="submit">Post</button>
    </form>
  );
}

export default Write;

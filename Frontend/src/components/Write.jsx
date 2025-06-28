import React, { useState } from "react";
import './Write.css';

function Write() {
   const [title, setTitle] = useState("");
   const [content, setContent] = useState("");
   const [message, setMessage] = useState("");

   const handleSubmit = async (e) => {
      e.preventDefault();

      // Replace with real user_id from localStorage/session
      const user_id = localStorage.getItem("user_id");

      const response = await fetch("http://localhost:5000/posts", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({
            title,
            content,
            user_id,
         }),
      });

      const data = await response.json();

      if (response.ok) {
         setMessage("Story posted successfully!");
         setTitle("");
         setContent("");
      } else {
         setMessage(data.error || "Failed to post story.");
      }
   };

   return (
      <form className="write-form" onSubmit={handleSubmit}>
         <input
            type="text"
            className="story-title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
         />

         <textarea
            className="story-content"
            placeholder="Tell your story..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
         ></textarea>

         <button type="submit" className="story-submit">Post Story</button>
         {message && <p>{message}</p>}
      </form>
   );
}

export default Write;
      
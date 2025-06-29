import React, { useState } from "react";
import './Write.css';

function Write() {
   const [title, setTitle] = useState("");
   const [content, setContent] = useState("");
   const [message, setMessage] = useState("");
   const handleSubmit = (e) => {
  e.preventDefault();
  const user = JSON.parse(localStorage.getItem("user"));
  const user_id = user?.user_id;


  if (!user_id) {
    setMessage("User not logged in.");
    return;
  }
  fetch("http://localhost:5000/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ title, content, user_id }),
  })
    .then((response) =>
      response.json().then((data) => ({ status: response.status, data }))
    )
    .then(({ status, data }) => {
      if (status === 200 || status === 201) {
        setMessage("Story posted successfully!");
        setTitle("");
        setContent("");
      } else {
        setMessage(data.error || "Failed to post story.");
      }
    })
    .catch((error) => {
      console.error("Error posting story:", error);
      setMessage("An error occurred while posting.");
    });
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
      
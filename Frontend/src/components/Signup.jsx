import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Signup.css';

function Signup() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isSignUp ? "register" : "login";
    const payload = isSignUp ? { username, email, password } : { email, password };

    try {
      const response = await fetch(`http://localhost:5000/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data));
        setMessage("Success!");
        navigate("/start"); // ✅ redirect to Postlist
      } else {
        setMessage(data.error || "Something went wrong.");
      }
    } catch (err) {
      setMessage("Server error. Try again later.");
    }
  };

  return (
    <form id="loginForm" onSubmit={handleSubmit}>
      <h2>{isSignUp ? "Create Account" : "Sign In"}</h2>

      {isSignUp && (
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      )}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit">{isSignUp ? "Create Account" : "Sign In"}</button>
      <p style={{ cursor: "pointer", color: "blue" }} onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Create one"}
      </p>

      {message && <p>{message}</p>}
    </form>
  );
}

export default Signup;

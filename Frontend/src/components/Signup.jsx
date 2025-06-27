import React,{useState} from "react";
import './Signup.css';

function Signup({ onLogin }){
  const[Email,setEmail] = useState("");
  const [Password,setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

  if (Email !== "" && Password !== ""){
    alert("log in successful!")
    onLogin(Email)
  } else{
    alert("Invalid Email or password");
  }
};
    return(
        <form id="loginForm" onSubmit={handleSubmit}>
      <input type="email" placeholder="Email"  value={Email} onChange={(e) => setEmail(e.target.value)} name="Email" required />
      <input type="password" placeholder="Password" value={Password} onChange={(e) => setPassword(e.target.value)} name="psw" required />
         <div id="remember-forgot">
        <label>
          <input type="checkbox" /> Remember me
        </label>
        <a href="#">Forgot password</a>
      </div>
      <button type="submit">Login</button>
    </form>
    );
}

export default Signup;
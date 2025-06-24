import React from "react";
import './Signup.css'
function Signup(){
    return(
        <form id="loginForm">
      <input type="email" placeholder="Email" name="Email" required />
      <input type="password" placeholder="Password" name="psw" required />
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
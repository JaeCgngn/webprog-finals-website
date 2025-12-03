import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import Signup from "./signup.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/"); // redirect after login
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>

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

        <button type="submit">Sign In</button>

        <div className="signup-link">
          <Link to="/signup"> Don't have an account? Sign Up</Link>
        </div>

        <div className="back-link">
          <Link to="/">Back to Store</Link>
        </div>
        
        

      </form>
      
    </div>
  );
};



export default Login;

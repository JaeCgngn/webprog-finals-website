import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();

        if (password !== confirm) {
        alert("Passwords do not match!");
        return;
        }

        navigate("/login"); 
    };

    return (
        <div className="signup-container">
        <form className="login-form" onSubmit={handleSignup}>
            <h2>Create Account</h2>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />

            <input
                type="text"
                placeholder="First Name"
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
                required
            />

            <input
                type="text"
                placeholder="Last Name"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
                required
            />


            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            <input
                type="password"
                placeholder="Confirm Password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
            />

            <button type="submit">Sign Up</button>

            <div className="signup-link">
                <Link to="/login">Already have an account? Login</Link>
            </div>

            <div className="back-link">
                <Link to="/">Back to Store</Link>
            </div>
        </form>
    </div>
  );
};

export default Signup;

import React from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';

const LoginModal = ({ isOpen , setLogedin ,setUser }) => {
  const navigate = useNavigate();
  const API = `${import.meta.env.vite_api_base_url}/api/v1/user/login`;

  const { register, handleSubmit } = useForm();

  if (!isOpen) return null;

  const handleClose = () => {
    navigate("/");
  };

  const loginBackend = async (data) => {
    try {
      const res = await axios.post(API, data, {
        headers: { "Content-Type": "application/json" }
      });

      localStorage.setItem('userId', res.data.user.id);
      localStorage.setItem('userName', res.data.user.name); 
      
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
      setLogedin(true);
      setUser(res.data.user);
      navigate("/dashboard");

    } catch (error) {
      console.log("Login error:", error.response?.data || error.message);
      alert("Login failed");
    }
  };

  const submitHandler = (data) => {
    loginBackend(data);
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="login-card" onClick={(e) => e.stopPropagation()}>

        <button className="close-btn" onClick={handleClose}>
          &times;
        </button>

        <div className="brand-header">
          <div className="logo-box">
            <svg width="20" height="20" viewBox="0 0 24 24"
              fill="none" stroke="white" strokeWidth="2.5"
              strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
              <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
              <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z" />
            </svg>
          </div>
          <span className="brand-name">ExpenseTracker</span>
        </div>

        <h2 className="title">Welcome back</h2>
        <p className="subtitle">Log in to your account to continue</p>

        <form className="login-form" onSubmit={handleSubmit(submitHandler)}>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
              {...register("email")}
            />
          </div>

          <div className="form-group">
            <div className="label-row">
              <label>Password</label>
              {/* 🔹 Forgot Password Link Added Here */}
              <span 
                className="forgot-password-link" 
                onClick={() => navigate("/forgot-password")}
              >
                Forgot password?
              </span>
            </div>
            <input
              type="password"
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              {...register("password")}
            />
          </div>

          <button type="submit" className="submit-btn">
            Log In
          </button>

        </form>

        <p className="signup-text">
          Don't have an account?
          <a href="/signup"
             onClick={(e) => {
               e.preventDefault();
               navigate("/signup");
             }}>
            {" "}Sign up
          </a>
        </p>

      </div>
    </div>
  );
};

export default LoginModal;
import React from 'react';
import './SignUp.css';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const SignUp = ({ isOpen }) => {
  const API = `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/signin`;
  
  // register aur watch nikal lo errors ke saath
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const signupBackend = async (data) => {
    try {
      const res = await axios.post(API, data, {
        headers: { "Content-Type": "application/json" }
      });
      localStorage.setItem('userId', res.data.userID);
      localStorage.setItem('signupEmail', data.email);
      localStorage.setItem('userName', data.name);
      localStorage.setItem('canAccessOtp', 'true');
      navigate('/otp');
    } catch (error) {
      if (error.response?.status === 409) {
        alert("Email already registered. Please login.");
      }
      console.log(error);
    }
  };

  const submitHandler = (data) => {
    signupBackend(data);
  };

  if (!isOpen) return null;

  const handleClose = () => {
    navigate("/");
  };

  return (
    <div className="signup-overlay" onClick={handleClose}>
      <div className="signup-card" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={handleClose}>&times;</button>

        <div className="brand-section">
          <div className="logo-square">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4" />
              <path d="M4 6v12c0 1.1.9 2 2 2h14v-4" />
              <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z" />
            </svg>
          </div>
          <span className="brand-text">ExpenseTracker</span>
        </div>

        <h2 className="signup-title">Create your account</h2>
        <p className="signup-subtitle">Start tracking your expenses today</p>

        <form className="signup-form" onSubmit={handleSubmit(submitHandler)}>
          <div className="input-box">
            <label>Full Name</label>
            <input type="text" placeholder="John Doe" required {...register('name')} />
          </div>

          <div className="input-box">
            <label>Email</label>
            <input type="email" placeholder="you@example.com" required {...register('email')} />
          </div>

          <div className="input-box">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="Min. 8 characters" 
              className={errors.password ? "input-error" : ""}
              {...register('password', { 
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long"
                }
              })} 
            />
            {/* 🔹 Dynamic Warning Message */}
            {errors.password && <p className="warning-text">{errors.password.message}</p>}
          </div>

          <button type="submit" className="signup-btn">Sign Up</button>
        </form>

        <p className="login-redirect">
          Already have an account? <a href="/login" onClick={(e) => { e.preventDefault(); navigate("/login"); }}>Log in</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
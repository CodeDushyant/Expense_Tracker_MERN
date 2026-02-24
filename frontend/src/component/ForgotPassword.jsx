import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ArrowLeft, Mail } from 'lucide-react';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      // API call to updatePassword/send OTP
      const res = await axios.post(`${import.meta.env.vite_api_base_url}/api/v1/user/updatePassword`, data);
      
      if (res.data.success) {
        // 🔹 Yahan hum data save kar rahe hain
        // Backend se res.data.userId ya res.data.user._id aana chahiye
        if (res.data.userId) {
          localStorage.setItem('userId', res.data.userId);
        }
        
        // Email ko bhi save kar lo taaki agle page pe dikha sako
        localStorage.setItem('forgotEmail', data.email);

        alert("OTP sent to your email!");
        navigate("/forgot-password-otp-verify"); 
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Something went wrong. Please check your email.");
    }
  };

  return (
    <div className="forgot-page-wrapper">
      <div className="forgot-card">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
          <span>Back to Login</span>
        </button>

        <div className="forgot-header">
          <div className="icon-circle">
            <Mail size={24} color="#4f46e5" />
          </div>
          <h2>Forgot Password?</h2>
          <p>Enter your email and we'll send you an OTP to reset your password.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="forgot-form">
          <div className="forgot-input-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your registered email"
              {...register("email", { 
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
              className={errors.email ? "input-error" : ""}
            />
            {errors.email && <span className="error-text">{errors.email.message}</span>}
          </div>

          <button type="submit" className="forgot-submit-btn">
            Send OTP
          </button>
        </form>

        <div className="forgot-footer">
          <p>Didn't receive the email? <button className="resend-link">Check spam</button></p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
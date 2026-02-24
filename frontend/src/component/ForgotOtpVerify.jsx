import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ShieldCheck, Lock, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import './ForgotOtpVerify.css';

const ForgotOtpVerify = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); 
  const [otpToken, setOtpToken] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const email = localStorage.getItem('forgotEmail') || "your email";

  // --- Step 1: Verify OTP ---
  const handleVerifyOtp = async (data) => {
    try {
      const userId = localStorage.getItem("userId");
      const res = await axios.post(`${import.meta.env.vite_api_base_url}/api/v1/user/verifyOtpforResetPassword`, {
        userId: userId,
        otp: data.otp
      });

      if (res.data.success) {
        setOtpToken(res.data.token); 
        setStep(2); 
      }
    } catch (error) {
      alert(error.response?.data?.message || "Invalid OTP");
    }
  };

  // --- Step 2: Reset Password ---
  const handleResetPassword = async (data) => {
    try {
      const res = await axios.post(`${import.meta.env.vite_api_base_url}/api/v1/user/resetPassword`, 
        { newPassword: data.newPassword }, 
        { headers: { Authorization: `Bearer ${otpToken}` } } 
      );

      if (res.data.success) {
        alert("Password updated successfully!");
        localStorage.removeItem('forgotEmail');
        navigate("/login");
      }
    } catch (error) {
      alert("Session expired. Please try again.");
      setStep(1);
    }
  };

  return (
    <div className="reset-page-wrapper">
      <div className="reset-card">
        <div className="reset-header">
          <div className="icon-badge">
            {step === 1 ? <ShieldCheck size={28} color="#4f46e5" /> : <CheckCircle2 size={28} color="#10b981" />}
          </div>
          <h2>{step === 1 ? "Verify OTP" : "Set New Password"}</h2>
          <p>{step === 1 ? `Code sent to ${email}` : "Create a strong password for your account"}</p>
        </div>

        <form onSubmit={handleSubmit(step === 1 ? handleVerifyOtp : handleResetPassword)} className="reset-form">
          
          {step === 1 && (
            <div className="reset-input-group animate-fade">
              <label>6-Digit OTP</label>
              <input
                type="text"
                placeholder="000000"
                maxLength={6}
                {...register("otp", { required: "OTP is required" })}
              />
              {errors.otp && <span className="error-msg">{errors.otp.message}</span>}
            </div>
          )}

          {step === 2 && (
            <div className="reset-input-group animate-fade">
              <label>New Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("newPassword", { 
                    required: "Password is required",
                    minLength: { value: 8, message: "Min 8 characters" }
                  })}
                />
                <button type="button" className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.newPassword && <span className="error-msg">{errors.newPassword.message}</span>}
            </div>
          )}

          <button type="submit" className="reset-submit-btn">
            {step === 1 ? "Verify Code" : "Update Password"}
          </button>
        </form>

        {step === 1 && (
          <button className="back-to-forgot" onClick={() => navigate("/forgot-password")}>
            Wrong email? Go back
          </button>
        )}
      </div>
    </div>
  );
};

export default ForgotOtpVerify;
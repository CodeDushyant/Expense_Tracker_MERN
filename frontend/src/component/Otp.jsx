import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Otp.css';

const Otp = ({ setLogedin }) => {
  const [otp, setOtp] = useState(new Array(6).fill("")); // Professional 6-box UI
  const [error, setError] = useState('');
  const [resendMsg, setResendMsg] = useState('');
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();
  const inputRefs = useRef([]);

  // --- Logic: Timer Persistent on Refresh ---
  useEffect(() => {
    const startTimer = () => {
      const expiry = localStorage.getItem('otpExpiry');
      const now = Date.now();

      if (expiry && parseInt(expiry) > now) {
        setTimer(Math.floor((parseInt(expiry) - now) / 1000));
      } else {
        const newExpiry = Date.now() + 60000; // 60 seconds from now
        localStorage.setItem('otpExpiry', newExpiry);
        setTimer(60);
      }
    };

    startTimer();
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // --- Logic: Handle OTP Input (Focus shift) ---
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const finalOtp = otp.join("");
    const userID = localStorage.getItem("userId");

    if (finalOtp.length < 6) {
      setError("Please enter all digits");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.vite_api_base_url}/api/v1/user/otpverify`,
        { otp: finalOtp, userId: userID }
      );

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.removeItem('otpExpiry'); // Clean up
        navigate("/dashboard");
        setLogedin(true);
      }
    } catch (err) {
      setError("Invalid OTP, please try again.");
    }
  };

  const resendOtpHandler = () => {
    if (timer > 0) return;
    // Your Axios call for resend here...
    localStorage.setItem('otpExpiry', Date.now() + 60000);
    setTimer(60);
    setResendMsg("OTP Sent!");
  };

  const userName = localStorage.getItem("userName") || "User";

  return (
    <div className="otp-page-wrapper">
      <div className="otp-card">
        <h2>Verify Identity</h2>
        <p className="subtitle">Hello {userName}, we've sent a code to your email.</p>
        
        <form onSubmit={submitHandler}>
          <div className="otp-inputs-container">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                className="otp-field"
                value={data}
                onChange={e => handleChange(e.target, index)}
                onFocus={e => e.target.select()}
              />
            ))}
          </div>

          <button type="submit" className="verify-btn">Verify Account</button>
        </form>

        <div className="footer-actions">
          {timer > 0 ? (
            <p className="timer-text">Resend available in <span>{timer}s</span></p>
          ) : (
            <button className="resend-link" onClick={resendOtpHandler}>Resend Code</button>
          )}
        </div>

        {error && <p className="error-toast">{error}</p>}
        {resendMsg && <p className="success-toast">{resendMsg}</p>}
      </div>
    </div>
  );
};

export default Otp;
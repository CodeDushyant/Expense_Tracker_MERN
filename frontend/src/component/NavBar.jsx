import React, { useState, useEffect } from "react";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";

function NavBar({ isDarkMode, toggleTheme, setLogedin, isLoggedin, user }) {
  // Ye effect body par class add/remove karega puri site ke liye
  const navigate = useNavigate();

  const loginHandler = () => {
    navigate("/login");
  };
  const signupHandler = () => {
    navigate("/signup");
  };
  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
    setLogedin(false);
  };
  return (
    <nav className="navbar-container">
      <div className="navbar-content">
        <div className="nav-logo-section">
          <div className="nav-icon-box">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="nav-wallet-icon"
            >
              <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"></path>
              <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"></path>
            </svg>
          </div>
          <span className="nav-logo-text">ExpenseTracker</span>
        </div>

        <div className="nav-actions-wrapper">
          <button className="theme-toggle" onClick={toggleTheme}>
            {isDarkMode ? "☀️" : "🌙"}
          </button>
          <div className="auth-buttons">
            {isLoggedin ? (
              <div className="user-logged-in">
                <h3>Hello, {user.name}</h3>
                <button className="nav-btn btn-logout" onClick={logoutHandler}>
                  Log Out
                </button>
              </div>
            ) : (
              <div className="nav-actions">
                <button className="nav-btn btn-login" onClick={loginHandler}>
                  Log In
                </button>
                <button className="nav-btn btn-signup" onClick={signupHandler}>
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

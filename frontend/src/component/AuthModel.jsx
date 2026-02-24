import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import '.';

function AuthModal({ type }) {
    const navigate = useNavigate();

    // Close button ya overlay click karne par home page par wapas le jayega
    const handleClose = () => navigate('/');

    return (
        <div className="modal-overlay" onClick={handleClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={handleClose}>&times;</button>
                
                <div className="modal-header">
                    <div className="nav-icon-box small">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-wallet-icon"><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"></path><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"></path></svg>
                    </div>
                    <span>ExpenseTracker</span>
                </div>

                <h2>{type === 'login' ? 'Welcome back' : 'Create your account'}</h2>
                <p className="modal-sub">{type === 'login' ? 'Log in to your account to continue' : 'Start tracking your expenses today'}</p>

                <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
                    {type === 'signup' && (
                        <div className="input-group">
                            <label>Full Name</label>
                            <input type="text" placeholder="John Doe" required />
                        </div>
                    )}
                    <div className="input-group">
                        <label>Email</label>
                        <input type="email" placeholder="you@example.com" required />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input type="password" placeholder={type === 'login' ? 'Enter your password' : 'Create a password'} required />
                    </div>

                    <button type="submit" className="btn-auth-submit">
                        {type === 'login' ? 'Log In' : 'Sign Up'}
                    </button>
                </form>

                <div className="modal-footer">
                    {type === 'login' ? (
                        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
                    ) : (
                        <p>Already have an account? <Link to="/login">Log in</Link></p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AuthModal;
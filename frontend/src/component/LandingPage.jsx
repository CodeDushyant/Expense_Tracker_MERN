import React from 'react';
import './LandingPage.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
function LandingPage() {
    const navigate = useNavigate();
    const loginHandler = () =>{
        navigate('/login');
        // setLogedin(!isLoggedin);
    } 
    const signupHandler = () =>{
        navigate('/signup')
    }
    return (
        <div className="landing-page">
            <header className="hero-section">
                <div className="hero-badge"> Smart Financial Management</div>
                <h1>Take Control of Your <span>Financial Future</span></h1>
                <p>Track expenses, manage budgets, and get real-time email insights into your spending habits with our powerful platform.</p>
                <div className="hero-btns">
                    <button className="btn-get-started shadow-glow" onClick={signupHandler}>Get Started Free →</button>
                    <button className="btn-sign-in-hero" onClick={loginHandler}>Sign In</button>
                </div>
            </header>

            {/* Feature Cards Section */}
            <section className="feature-cards-container">
                <div className="f-card">
                    <div className="f-icon purple-bg">👛</div>
                    <h3>Easy Expense Tracking</h3>
                    <p>Quickly log your daily expenses and keep track of where your money goes.</p>
                </div>
                <div className="f-card">
                    <div className="f-icon violet-bg">📊</div>
                    <h3>Visual Reports</h3>
                    <p>Beautiful charts and graphs help you understand your spending patterns.</p>
                </div>
                {/* NEW EMAIL NOTIFICATION CARD */}
                <div className="f-card highlighted-card">
                    <div className="f-icon pink-bg">📧</div>
                    <h3>Email Notifications</h3>
                    <p>Never miss a bill! Get recurring expense alerts and monthly summaries directly in your inbox.</p>
                </div>
            </section>

            {/* Detailed Feature Section with Mockup */}
            <section className="detailed-info">
                <div className="info-text-side">
                    <h2>Everything You Need to Manage Your Money</h2>
                    <p className="sub-head">Powerful features to help you stay on top of your finances</p>
                    
                    <ul className="info-list">
                        <li><span>✔</span> <strong>Category-Based Tracking:</strong> Organize expenses into categories like Food, Travel, etc.</li>
                        <li><span>✔</span> <strong>Monthly Insights:</strong> Get detailed breakdowns of your monthly spending.</li>
                        <li><span>✔</span> <strong>Budget Management:</strong> Set budgets and receive alerts when close to limits.</li>
                        <li><span>✔</span> <strong>Smart Email Alerts:</strong> Automatically receive notifications for recurring payments and over-budget warnings.</li>
                    </ul>
                </div>

                <div className="info-visual-side">
                    <div className="expense-mockup-card floating-anim">
                        <div className="total-expenses-banner">
                            <p>Total Expenses</p>
                            <h3>$3,847.50</h3>
                            <span className="trend-icon">📉</span>
                        </div>
                        <div className="category-bars">
                            <div className="bar-item">
                                <p>Food & Dining <span>$1,245</span></p>
                                <div className="bar-bg"><div className="bar-fill orange" style={{width: '75%'}}></div></div>
                            </div>
                            <div className="bar-item">
                                <p>Transportation <span>$845</span></p>
                                <div className="bar-bg"><div className="bar-fill blue" style={{width: '50%'}}></div></div>
                            </div>
                            <div className="bar-item">
                                <p>Entertainment <span>$520</span></p>
                                <div className="bar-bg"><div className="bar-fill purple" style={{width: '35%'}}></div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Purple Banner */}
            <section className="cta-banner">
                <h2>Start Tracking Your Expenses Today</h2>
                <p>Join thousands of users who have taken control of their finances</p>
                <button className="btn-white pulse-anim" onClick={signupHandler}>Create Free Account</button>
            </section>

            {/* Footer */}
            {/* Expanded Footer Section */}
<footer className="footer-expanded">
    <div className="footer-container">
        <div className="footer-brand-side">
            <div className="footer-logo">
                <div className="nav-icon-box small">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="nav-wallet-icon"><path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"></path><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"></path></svg>
                </div>
                <span>ExpenseTracker</span>
            </div>
            <p>Empowering you to take control of your money with smart tracking and automated email insights. Start your journey to financial freedom today.</p>
            <div className="social-icons">
                <a href="https://www.linkedin.com/in/dushyant-chauhan-825a46288/" target='_blank'>Li</a>
                <a href="https://github.com/CodeDushyant" target='_blank'>Gh</a>
            </div>
        </div>

        <div className="footer-links-grid">
            <div className="footer-col">
                <h4>Product</h4>
                <ul>
                    <li><Link to="/expense-tracking">Expense Tracking</Link></li>
                    <li><Link to="/budget-planning">Budget Planning</Link></li>
                    <li><Link to="/email-alerts">Email Alerts</Link></li>
                    <li><Link to="/visual-reports">Visual Reports</Link></li>
                </ul>
            </div>
            <div className="footer-col">
                <h4>Company</h4>
                <ul>
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                    <li><Link to="/term-service">Terms of Service</Link></li>
                    <li><Link to="/contact-support">Contact Support</Link></li>
                </ul>
            </div>
            <div className="footer-col">
                <h4>Resources</h4>
                <ul>
                    <li><Link to="/help-center">Help Center</Link></li>
                    <li><Link to="/api-documentation">API Documentation</Link></li>
                </ul>
            </div>
        </div>
    </div>
    
    <div className="footer-bottom-bar">
        <p>© 2026 ExpenseTracker MERN Project. Designed with ❤️ for better finance.</p>
        <div className="footer-bottom-links">
            <Link to="/status">Status</Link>
            <Link to="/cookies">Cookies</Link>
        </div>
    </div>
</footer>
        </div>
    );
}

export default LandingPage;
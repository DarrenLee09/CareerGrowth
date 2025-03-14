import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>CareerBoost</h3>
                    <p>Empowering students to build better careers with AI-powered tools and guidance.</p>
                </div>

                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to="/profile">Profile</Link></li>
                        <li><Link to="/resume">Resume</Link></li>
                        <li><Link to="/jobs">Jobs</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Resources</h3>
                    <ul>
                        <li><a href="/blog">Blog</a></li>
                        <li><a href="/faq">FAQ</a></li>
                        <li><a href="/support">Support</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Legal</h3>
                    <ul>
                        <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                        <li><Link to="/terms-of-service">Terms of Service</Link></li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {currentYear} CareerBoost. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer; 
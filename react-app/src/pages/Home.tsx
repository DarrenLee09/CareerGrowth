import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Pages.css';

const Home: React.FC = () => {
    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section">
                <motion.div
                    className="hero-content"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1>Your AI Career Coach for Landing Dream Jobs</h1>
                    <p className="hero-subtitle">
                        Let AI help you craft the perfect resume, match with ideal jobs, and prepare for interviews. Join thousands of students accelerating their careers.
                    </p>
                    <div className="hero-stats">
                        <div className="stat-highlight">
                            <span className="stat-number">90%</span>
                            <span className="stat-label">Higher Interview Rate</span>
                        </div>
                        <div className="stat-highlight">
                            <span className="stat-number">15k+</span>
                            <span className="stat-label">Students Placed</span>
                        </div>
                        <div className="stat-highlight">
                            <span className="stat-number">500+</span>
                            <span className="stat-label">Partner Companies</span>
                        </div>
                    </div>
                    <div className="hero-cta">
                        <Link to="/register" className="cta-button primary">Start Free Trial</Link>
                        <Link to="/resume" className="cta-button secondary">Try Resume Builder</Link>
                    </div>
                </motion.div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <h2>AI-Powered Career Development</h2>
                <div className="features-grid">
                    <motion.div
                        className="feature-card"
                        whileHover={{ y: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <div className="feature-icon">🤖</div>
                        <h3>Smart Resume Analysis</h3>
                        <p>Our AI analyzes your resume in real-time, suggesting improvements for maximum impact and higher callback rates.</p>
                    </motion.div>
                    <motion.div
                        className="feature-card"
                        whileHover={{ y: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <div className="feature-icon">🎯</div>
                        <h3>Personalized Job Matching</h3>
                        <p>Get matched with jobs that align with your skills, experience, and career goals using our AI matching algorithm.</p>
                    </motion.div>
                    <motion.div
                        className="feature-card"
                        whileHover={{ y: -5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        <div className="feature-icon">🎓</div>
                        <h3>Interview Preparation</h3>
                        <p>Practice with our AI interviewer and get instant feedback on your responses and presentation.</p>
                    </motion.div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="how-it-works-section">
                <h2>How It Works</h2>
                <div className="steps-grid">
                    <div className="step-item">
                        <div className="step-number">1</div>
                        <h3>Create Your Profile</h3>
                        <p>Sign up and input your education, skills, and experience. Our AI starts learning about your career goals.</p>
                    </div>
                    <div className="step-item">
                        <div className="step-number">2</div>
                        <h3>Build Your Resume</h3>
                        <p>Use our AI-powered resume builder to create an ATS-friendly resume that stands out to employers.</p>
                    </div>
                    <div className="step-item">
                        <div className="step-number">3</div>
                        <h3>Get Matched</h3>
                        <p>Receive personalized job recommendations and apply with confidence using AI-optimized applications.</p>
                    </div>
                    <div className="step-item">
                        <div className="step-number">4</div>
                        <h3>Ace Interviews</h3>
                        <p>Practice with our AI interviewer and get coached on your responses, body language, and presentation.</p>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="stats-grid">
                    <div className="stat-item">
                        <h3>90%</h3>
                        <p>Higher Interview Rate</p>
                    </div>
                    <div className="stat-item">
                        <h3>15k+</h3>
                        <p>Students Placed</p>
                    </div>
                    <div className="stat-item">
                        <h3>500+</h3>
                        <p>Partner Companies</p>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="testimonials-section">
                <h2>Success Stories</h2>
                <div className="testimonials-grid">
                    <motion.div
                        className="testimonial-card"
                        whileHover={{ y: -5 }}
                    >
                        <div className="testimonial-content">
                            <p>"The AI resume feedback helped me completely transform my resume. I landed interviews at top tech companies within weeks!"</p>
                        </div>
                        <div className="testimonial-author">
                            <img src="/testimonial1.jpg" alt="Sarah Chen" />
                            <div>
                                <h4>Sarah Chen</h4>
                                <p>Computer Science, Stanford</p>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div
                        className="testimonial-card"
                        whileHover={{ y: -5 }}
                    >
                        <div className="testimonial-content">
                            <p>"The interview practice feature was a game-changer. I felt so much more confident and prepared for my actual interviews."</p>
                        </div>
                        <div className="testimonial-author">
                            <img src="/testimonial2.jpg" alt="James Wilson" />
                            <div>
                                <h4>James Wilson</h4>
                                <p>Business, NYU</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <h2>Ready to Launch Your Career?</h2>
                <p>Join thousands of students who have found their dream jobs through AI-powered guidance</p>
                <div className="cta-buttons">
                    <Link to="/register" className="cta-button primary">Start Free Trial</Link>
                    <Link to="/about" className="cta-button secondary">Learn More</Link>
                </div>
            </section>
        </div>
    );
};

export default Home; 
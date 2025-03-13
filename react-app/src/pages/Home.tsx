import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiBriefcase, FiTrendingUp, FiUsers, FiAward, FiCheckCircle, FiStar } from 'react-icons/fi';
import './HomePage.css';

const Home = () => {
    useEffect(() => {
        // Reset any previous page styles
        document.body.style.backgroundColor = '';
        document.body.style.color = '';

        return () => {
            // Cleanup
            document.body.style.backgroundColor = '';
            document.body.style.color = '';
        };
    }, []);

    return (
        <div className="home-page">
            <section className="hero">
                <div className="container">
                    <motion.div
                        className="hero-content"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.div
                            className="hero-text"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, delay: 0.2 }}
                        >
                            <h1 className="hero-title">Find Your <span>Dream Job</span> in Tech Today</h1>
                            <p className="hero-subtitle">Connect with top employers and discover opportunities that match your skills and aspirations. Our platform helps professionals find roles they love.</p>
                            <div className="hero-actions">
                                <Link to="/jobs" className="btn btn-primary btn-lg">Browse Jobs</Link>
                                <Link to="/about" className="btn btn-secondary btn-lg">Learn More</Link>
                            </div>
                        </motion.div>
                        <motion.div
                            className="hero-image"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.7, delay: 0.4 }}
                        >
                            <img src="/hero-image.svg" alt="Job Search Illustration" />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <section className="statistics">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="section-title">Trusted by Thousands</h2>
                        <p className="section-subtitle">Join our growing community of job seekers and employers</p>
                    </motion.div>
                    <motion.div
                        className="stats-grid"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <motion.div
                            className="stat-card"
                            whileHover={{ y: -5 }}
                        >
                            <div className="stat-icon">
                                <FiUsers size={24} />
                            </div>
                            <div className="stat-number">100K+</div>
                            <div className="stat-label">Active Users</div>
                        </motion.div>
                        <motion.div
                            className="stat-card"
                            whileHover={{ y: -5 }}
                        >
                            <div className="stat-icon">
                                <FiBriefcase size={24} />
                            </div>
                            <div className="stat-number">50K+</div>
                            <div className="stat-label">Jobs Posted</div>
                        </motion.div>
                        <motion.div
                            className="stat-card"
                            whileHover={{ y: -5 }}
                        >
                            <div className="stat-icon">
                                <FiCheckCircle size={24} />
                            </div>
                            <div className="stat-number">75%</div>
                            <div className="stat-label">Success Rate</div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <section className="features">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="section-title">Why Choose Us</h2>
                        <p className="section-subtitle">We offer tools and resources to help you succeed in your job search</p>
                    </motion.div>
                    <motion.div
                        className="features-grid"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <motion.div
                            className="feature-card"
                            whileHover={{ y: -5 }}
                        >
                            <div className="feature-icon">
                                <FiSearch size={24} />
                            </div>
                            <h3 className="feature-title">Smart Job Matching</h3>
                            <p className="feature-description">Our AI-powered system matches you with jobs that perfectly align with your skills and experience</p>
                        </motion.div>
                        <motion.div
                            className="feature-card"
                            whileHover={{ y: -5 }}
                        >
                            <div className="feature-icon">
                                <FiTrendingUp size={24} />
                            </div>
                            <h3 className="feature-title">Career Growth</h3>
                            <p className="feature-description">Access resources and insights to help you grow in your career and achieve your professional goals</p>
                        </motion.div>
                        <motion.div
                            className="feature-card"
                            whileHover={{ y: -5 }}
                        >
                            <div className="feature-icon">
                                <FiAward size={24} />
                            </div>
                            <h3 className="feature-title">Top Companies</h3>
                            <p className="feature-description">Connect with leading companies and organizations across various industries worldwide</p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <section className="testimonials">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="section-title">What Our Users Say</h2>
                        <p className="section-subtitle">Hear from people who found their dream jobs through our platform</p>
                    </motion.div>
                    <motion.div
                        className="testimonials-grid"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="testimonial-card">
                            <div className="testimonial-content">
                                I found my dream job within two weeks of signing up. The matching algorithm is incredibly accurate!
                            </div>
                            <div className="testimonial-author">
                                <div className="testimonial-avatar">
                                    <FiStar />
                                </div>
                                <div>
                                    <div className="testimonial-name">Sarah Johnson</div>
                                    <div className="testimonial-position">UX Designer</div>
                                </div>
                            </div>
                        </div>
                        <div className="testimonial-card">
                            <div className="testimonial-content">
                                As an employer, we've hired five amazing team members through this platform. The quality of candidates is outstanding.
                            </div>
                            <div className="testimonial-author">
                                <div className="testimonial-avatar">
                                    <FiStar />
                                </div>
                                <div>
                                    <div className="testimonial-name">Mark Thompson</div>
                                    <div className="testimonial-position">CTO, TechStart</div>
                                </div>
                            </div>
                        </div>
                        <div className="testimonial-card">
                            <div className="testimonial-content">
                                The career resources helped me negotiate a 20% higher salary than I initially expected. Incredibly valuable service!
                            </div>
                            <div className="testimonial-author">
                                <div className="testimonial-avatar">
                                    <FiStar />
                                </div>
                                <div>
                                    <div className="testimonial-name">David Chen</div>
                                    <div className="testimonial-position">Software Engineer</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="cta">
                <div className="container">
                    <motion.div
                        className="cta-content"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="cta-title">Ready to Start Your Journey?</h2>
                        <p className="cta-text">Join thousands of professionals who found their dream jobs through our platform</p>
                        <Link to="/register" className="btn btn-white btn-lg">Get Started Today</Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Home; 
import React from 'react';
import './Body.css';

function Body() {
    return (
        <div className="body-container">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content">
                    <h1>Welcome to Our Platform</h1>
                    <p>Discover amazing features and services that will transform your experience</p>
                    <button className="cta-button">Get Started</button>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <h2>Our Features</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="feature-icon">🚀</div>
                        <h3>Fast & Efficient</h3>
                        <p>Lightning-fast performance that saves your time</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🛡️</div>
                        <h3>Secure</h3>
                        <p>Your data is protected with top-notch security</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">💡</div>
                        <h3>Innovative</h3>
                        <p>Cutting-edge solutions for modern problems</p>
                    </div>
                    <div className="feature-card">
                        <div className="feature-icon">🤝</div>
                        <h3>Supportive</h3>
                        <p>24/7 customer support at your service</p>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="cta-section">
                <div className="cta-content">
                    <h2>Ready to Get Started?</h2>
                    <p>Join thousands of satisfied users today</p>
                    <button className="cta-button">Sign Up Now</button>
                </div>
            </section>
        </div>
    );
}

export default Body; 
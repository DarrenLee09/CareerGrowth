import React from 'react';
import './Pages.css';

function Services() {
    return (
        <div className="page-container">
            <div className="page-content">
                <h1>Our Services</h1>

                <div className="services-grid">
                    <div className="service-card">
                        <div className="service-icon">💻</div>
                        <h3>Web Development</h3>
                        <p>Custom web applications built with modern technologies and best practices.</p>
                    </div>

                    <div className="service-card">
                        <div className="service-icon">📱</div>
                        <h3>Mobile Development</h3>
                        <p>Native and cross-platform mobile applications for iOS and Android.</p>
                    </div>

                    <div className="service-card">
                        <div className="service-icon">🎨</div>
                        <h3>UI/UX Design</h3>
                        <p>Beautiful and intuitive user interfaces designed for optimal user experience.</p>
                    </div>

                    <div className="service-card">
                        <div className="service-icon">🔒</div>
                        <h3>Cybersecurity</h3>
                        <p>Comprehensive security solutions to protect your digital assets.</p>
                    </div>
                </div>

                <div className="content-section">
                    <h2>Why Choose Us?</h2>
                    <ul className="benefits-list">
                        <li>Expert team with years of experience</li>
                        <li>Customized solutions for your needs</li>
                        <li>Agile development methodology</li>
                        <li>24/7 support and maintenance</li>
                        <li>Competitive pricing</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Services; 
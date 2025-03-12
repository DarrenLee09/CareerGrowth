import React from 'react';
import './Pages.css';

function About() {
    return (
        <div className="page-container">
            <div className="page-content">
                <h1>About Us</h1>
                <div className="content-section">
                    <h2>Our Story</h2>
                    <p>
                        We are a passionate team dedicated to delivering exceptional solutions
                        and experiences to our clients. With years of experience and a
                        commitment to excellence, we strive to make a difference in everything
                        we do.
                    </p>
                </div>

                <div className="content-section">
                    <h2>Our Mission</h2>
                    <p>
                        Our mission is to provide innovative solutions that help our clients
                        achieve their goals. We believe in creating lasting partnerships and
                        delivering value through quality, reliability, and outstanding service.
                    </p>
                </div>

                <div className="content-section">
                    <h2>Our Values</h2>
                    <ul className="values-list">
                        <li>Excellence in everything we do</li>
                        <li>Innovation and creativity</li>
                        <li>Integrity and transparency</li>
                        <li>Customer satisfaction</li>
                        <li>Continuous improvement</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default About; 
import React, { useState } from 'react';
import './Pages.css';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted:', formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="page-container">
            <div className="page-content">
                <h1>Contact Us</h1>

                <div className="contact-container">
                    <div className="contact-info">
                        <h2>Get in Touch</h2>
                        <p>We'd love to hear from you. Please fill out the form below or use our contact information.</p>

                        <div className="contact-details">
                            <div className="contact-item">
                                <span className="contact-icon">📍</span>
                                <p>123 Business Street, Suite 100<br />City, State 12345</p>
                            </div>
                            <div className="contact-item">
                                <span className="contact-icon">📞</span>
                                <p>+1 (555) 123-4567</p>
                            </div>
                            <div className="contact-item">
                                <span className="contact-icon">✉️</span>
                                <p>info@yourcompany.com</p>
                            </div>
                        </div>
                    </div>

                    <form className="contact-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="subject">Subject</label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={5}
                            />
                        </div>

                        <button type="submit" className="submit-button">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Contact; 
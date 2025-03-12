import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '../components/Toast/ToastContext';
import FadeInSection from '../components/FadeInSection';
import './Pages.css';

const Login: React.FC = () => {
    const { showToast } = useToast();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement actual login logic
        showToast('Login functionality coming soon!', 'info');
    };

    return (
        <div className="page-container">
            <div className="page-content login-page">
                <FadeInSection>
                    <section className="login-container">
                        <h1>Welcome Back</h1>
                        <p>Sign in to continue to CareerBoost</p>

                        <form onSubmit={handleSubmit} className="login-form">
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        email: e.target.value
                                    }))}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        password: e.target.value
                                    }))}
                                    required
                                />
                            </div>

                            <button type="submit" className="login-button">
                                Sign In
                            </button>
                        </form>

                        <div className="login-footer">
                            <p>Don't have an account? <a href="/signup">Sign up</a></p>
                            <a href="/forgot-password">Forgot password?</a>
                        </div>
                    </section>
                </FadeInSection>
            </div>
        </div>
    );
};

export default Login; 
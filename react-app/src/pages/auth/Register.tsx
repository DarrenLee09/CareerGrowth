import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../../components/Toast/ToastContext';
import './Auth.css';

interface RegisterFormData {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    university: string;
    graduationYear: string;
    major: string;
}

const Register: React.FC = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<RegisterFormData>({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        university: '',
        graduationYear: '',
        major: ''
    });
    const navigate = useNavigate();
    const { showToast } = useToast();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateStep1 = () => {
        if (!formData.email || !formData.password || !formData.confirmPassword) {
            showToast('Please fill in all fields', 'error');
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            showToast('Passwords do not match', 'error');
            return false;
        }
        if (formData.password.length < 8) {
            showToast('Password must be at least 8 characters', 'error');
            return false;
        }
        return true;
    };

    const validateStep2 = () => {
        if (!formData.firstName || !formData.lastName) {
            showToast('Please fill in all fields', 'error');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (step === 1 && validateStep1()) {
            setStep(2);
        } else if (step === 2 && validateStep2()) {
            setStep(3);
        } else if (step === 3) {
            try {
                // TODO: Implement registration API call
                showToast('Registration successful!', 'success');
                navigate('/login');
            } catch (error) {
                showToast('Registration failed. Please try again.', 'error');
            }
        }
    };

    return (
        <div className="auth-container">
            <motion.div
                className="auth-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1>Create Your Account</h1>
                <div className="step-indicator">
                    {[1, 2, 3].map((num) => (
                        <div
                            key={num}
                            className={`step ${step >= num ? 'active' : ''}`}
                        />
                    ))}
                </div>
                <form onSubmit={handleSubmit}>
                    {step === 1 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
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
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <div className="form-group">
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <div className="form-group">
                                <label htmlFor="university">University</label>
                                <input
                                    type="text"
                                    id="university"
                                    name="university"
                                    value={formData.university}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="graduationYear">Expected Graduation Year</label>
                                <input
                                    type="text"
                                    id="graduationYear"
                                    name="graduationYear"
                                    value={formData.graduationYear}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="major">Major</label>
                                <input
                                    type="text"
                                    id="major"
                                    name="major"
                                    value={formData.major}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </motion.div>
                    )}

                    <div className="form-actions">
                        {step > 1 && (
                            <button
                                type="button"
                                onClick={() => setStep(prev => prev - 1)}
                                className="button secondary"
                            >
                                Back
                            </button>
                        )}
                        <button type="submit" className="button primary">
                            {step === 3 ? 'Create Account' : 'Next'}
                        </button>
                    </div>
                </form>
                <p className="auth-footer">
                    Already have an account? <Link to="/login">Sign in</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Register; 
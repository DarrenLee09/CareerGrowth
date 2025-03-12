import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../../components/Toast/ToastContext';
import './Auth.css';

interface LoginFormData {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const [formData, setFormData] = useState<LoginFormData>({
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { showToast } = useToast();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            showToast('Please fill in all fields', 'error');
            return;
        }

        setIsLoading(true);
        try {
            // TODO: Implement login API call
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
            showToast('Login successful!', 'success');
            navigate('/profile');
        } catch (error) {
            showToast('Invalid email or password', 'error');
        } finally {
            setIsLoading(false);
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
                <h1>Welcome Back</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            disabled={isLoading}
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
                            disabled={isLoading}
                        />
                    </div>
                    <div className="form-actions">
                        <button
                            type="submit"
                            className="button primary"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </div>
                </form>
                <p className="auth-footer">
                    Don't have an account? <Link to="/register">Sign up</Link>
                </p>
                <p className="auth-footer">
                    <Link to="/forgot-password">Forgot your password?</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login; 
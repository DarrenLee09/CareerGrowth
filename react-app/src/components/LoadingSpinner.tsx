import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner: React.FC = () => {
    return (
        <div className="loading-container" role="status" aria-label="Loading content">
            <div className="spinner"></div>
            <span className="visually-hidden">Loading...</span>
        </div>
    );
};

export default LoadingSpinner; 
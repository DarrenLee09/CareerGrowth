import React from 'react';
import './PageSkeleton.css';

const PageSkeleton: React.FC = () => {
    return (
        <div className="page-skeleton" aria-label="Loading content">
            {/* Header skeleton */}
            <div className="skeleton-header">
                <div className="loading-skeleton" style={{ width: '60%', height: '40px', marginBottom: '20px' }} />
                <div className="loading-skeleton" style={{ width: '40%', height: '20px', marginBottom: '40px' }} />
            </div>

            {/* Content skeleton */}
            <div className="skeleton-content">
                {/* Section 1 */}
                <div className="loading-skeleton" style={{ width: '100%', height: '200px', marginBottom: '30px' }} />

                {/* Section 2 */}
                <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
                    <div className="loading-skeleton" style={{ width: '30%', height: '150px' }} />
                    <div className="loading-skeleton" style={{ width: '30%', height: '150px' }} />
                    <div className="loading-skeleton" style={{ width: '30%', height: '150px' }} />
                </div>

                {/* Section 3 */}
                <div className="loading-skeleton" style={{ width: '80%', height: '100px', marginBottom: '20px' }} />
                <div className="loading-skeleton" style={{ width: '90%', height: '100px' }} />
            </div>
        </div>
    );
};

export default PageSkeleton; 
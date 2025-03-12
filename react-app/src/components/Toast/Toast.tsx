import React, { useEffect } from 'react';
import './Toast.css';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastProps {
    id: string;
    message: string;
    type: ToastType;
    duration?: number;
    onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ id, message, type, duration = 3000, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(id);
        }, duration);

        return () => clearTimeout(timer);
    }, [id, duration, onClose]);

    return (
        <div className={`toast toast-${type}`} role="alert">
            <div className="toast-content">
                <span className="toast-message">{message}</span>
                <button
                    className="toast-close"
                    onClick={() => onClose(id)}
                    aria-label="Close notification"
                >
                    ×
                </button>
            </div>
        </div>
    );
};

export default Toast; 
import React from 'react';
import Toast, { ToastProps } from './Toast';
import './Toast.css';

interface ToastContainerProps {
    toasts: Omit<ToastProps, 'onClose'>[];
    onClose: (id: string) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onClose }) => {
    return (
        <div className="toast-container" role="region" aria-label="Notifications">
            {toasts.map(toast => (
                <Toast key={toast.id} {...toast} onClose={onClose} />
            ))}
        </div>
    );
};

export default ToastContainer; 
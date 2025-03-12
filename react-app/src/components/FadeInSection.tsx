import React from 'react';
import { motion } from 'framer-motion';
import './FadeInSection.css';

interface FadeInSectionProps {
    children: React.ReactNode;
    delay?: number;
}

const FadeInSection: React.FC<FadeInSectionProps> = ({ children, delay = 0.2 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.6,
                delay: delay,
                ease: [0.43, 0.13, 0.23, 0.96]
            }}
        >
            {children}
        </motion.div>
    );
};

export default FadeInSection; 
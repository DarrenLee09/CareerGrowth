import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Resume } from '../../types';
import './Resume.css';

interface ResumeAnalysisProps {
    resume: Resume;
    onImprove: (section: string) => void;
}

const ResumeAnalysis: React.FC<ResumeAnalysisProps> = ({ resume, onImprove }) => {
    const [activeSection, setActiveSection] = useState<string | null>(null);

    const scoreColor = (score: number) => {
        if (score >= 80) return '#10B981';
        if (score >= 60) return '#F59E0B';
        return '#EF4444';
    };

    const impactColor = (impact: 'high' | 'medium' | 'low') => {
        switch (impact) {
            case 'high':
                return '#EF4444';
            case 'medium':
                return '#F59E0B';
            case 'low':
                return '#10B981';
            default:
                return '#3B82F6';
        }
    };

    return (
        <div className="resume-analysis">
            <div className="analysis-header">
                <div className="score-container">
                    <div
                        className="score-circle"
                        style={{
                            borderColor: scoreColor(resume.aiAnalysis.score),
                            color: scoreColor(resume.aiAnalysis.score)
                        }}
                    >
                        {resume.aiAnalysis.score}
                    </div>
                    <h3>Resume Score</h3>
                </div>
            </div>

            <div className="feedback-sections">
                {resume.aiAnalysis.feedback.map((feedback, index) => (
                    <motion.div
                        key={feedback.category}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="feedback-section"
                    >
                        <button
                            className="section-header"
                            onClick={() => setActiveSection(
                                activeSection === feedback.category ? null : feedback.category
                            )}
                            aria-expanded={activeSection === feedback.category}
                        >
                            <div className="section-title">
                                <h4>{feedback.category}</h4>
                                <span
                                    className="impact-badge"
                                    style={{ backgroundColor: impactColor(feedback.impact) }}
                                >
                                    {feedback.impact} impact
                                </span>
                            </div>
                            <span className="toggle-icon">
                                {activeSection === feedback.category ? '−' : '+'}
                            </span>
                        </button>

                        <AnimatePresence>
                            {activeSection === feedback.category && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="section-content"
                                >
                                    <ul className="suggestions-list">
                                        {feedback.suggestions.map((suggestion, i) => (
                                            <li key={i}>{suggestion}</li>
                                        ))}
                                    </ul>
                                    <button
                                        className="improve-button"
                                        onClick={() => onImprove(feedback.category)}
                                    >
                                        Improve this section
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>

            {resume.aiAnalysis.improvedContent && (
                <div className="improved-content">
                    <h3>AI Suggested Improvements</h3>
                    <div className="content-preview">
                        {resume.aiAnalysis.improvedContent}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResumeAnalysis; 
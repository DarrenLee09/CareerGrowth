import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '../components/Toast/ToastContext';
import './Pages.css';

interface ResumeAnalysis {
    score: number;
    suggestions: {
        category: string;
        items: string[];
    }[];
    keywords: string[];
    missingSkills: string[];
}

const Resume: React.FC = () => {
    const { showToast } = useToast();
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysis, setAnalysis] = useState<ResumeAnalysis | null>(null);
    const [activeTab, setActiveTab] = useState<'builder' | 'analyzer'>('builder');

    const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.type !== 'application/pdf') {
                showToast('Please upload a PDF file', 'error');
                return;
            }
            setResumeFile(file);
            showToast('Resume uploaded successfully', 'success');
            analyzeResume(file);
        }
    };

    const analyzeResume = async (file: File) => {
        setIsAnalyzing(true);
        try {
            // TODO: Implement actual API call to analyze resume
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
            setAnalysis({
                score: 85,
                suggestions: [
                    {
                        category: 'Content',
                        items: [
                            'Add more quantifiable achievements',
                            'Include relevant certifications',
                            'Strengthen action verbs in experience section'
                        ]
                    },
                    {
                        category: 'Format',
                        items: [
                            'Improve section spacing',
                            'Consider using bullet points for better readability',
                            'Ensure consistent font usage'
                        ]
                    },
                    {
                        category: 'Keywords',
                        items: [
                            'Add more industry-specific keywords',
                            'Include technical skills section',
                            'Highlight relevant tools and technologies'
                        ]
                    }
                ],
                keywords: ['JavaScript', 'React', 'Node.js', 'Project Management'],
                missingSkills: ['TypeScript', 'AWS', 'CI/CD']
            });
            showToast('Resume analysis complete!', 'success');
        } catch (error) {
            showToast('Failed to analyze resume. Please try again.', 'error');
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="resume-page">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="resume-header">
                    <h1>AI Resume Builder</h1>
                    <p>Create an ATS-friendly resume with real-time AI feedback</p>
                </div>

                <div className="resume-tabs">
                    <button
                        className={`tab-button ${activeTab === 'builder' ? 'active' : ''}`}
                        onClick={() => setActiveTab('builder')}
                    >
                        Resume Builder
                    </button>
                    <button
                        className={`tab-button ${activeTab === 'analyzer' ? 'active' : ''}`}
                        onClick={() => setActiveTab('analyzer')}
                    >
                        Resume Analyzer
                    </button>
                </div>

                {activeTab === 'builder' ? (
                    <div className="resume-builder">
                        <div className="builder-sidebar">
                            <h2>Sections</h2>
                            <ul className="section-list">
                                <li className="active">Personal Info</li>
                                <li>Summary</li>
                                <li>Experience</li>
                                <li>Education</li>
                                <li>Skills</li>
                                <li>Projects</li>
                                <li>Certifications</li>
                            </ul>
                            <div className="ai-assistant">
                                <h3>AI Assistant</h3>
                                <div className="ai-suggestions">
                                    <p>💡 Try adding specific metrics to your achievements</p>
                                    <p>💡 Use action verbs to start bullet points</p>
                                    <p>💡 Include relevant keywords from job descriptions</p>
                                </div>
                            </div>
                        </div>
                        <div className="builder-main">
                            <div className="resume-preview">
                                <div className="resume-template">
                                    {/* Resume template content */}
                                    <p className="placeholder-text">Resume preview will appear here</p>
                                </div>
                            </div>
                            <div className="builder-actions">
                                <button className="action-button primary">Save Draft</button>
                                <button className="action-button secondary">Export PDF</button>
                                <button className="action-button">Preview</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="resume-analyzer">
                        <div className="upload-section">
                            <input
                                type="file"
                                id="resume"
                                accept=".pdf"
                                onChange={handleResumeUpload}
                                style={{ display: 'none' }}
                            />
                            <label htmlFor="resume" className="upload-button">
                                {resumeFile ? resumeFile.name : 'Upload Resume (PDF)'}
                            </label>
                            {isAnalyzing ? (
                                <div className="analyzing-indicator">
                                    <div className="spinner"></div>
                                    <p>Analyzing your resume...</p>
                                </div>
                            ) : analysis && (
                                <div className="analysis-results">
                                    <div className="score-card">
                                        <div className="score-circle">
                                            <svg viewBox="0 0 36 36">
                                                <path
                                                    d="M18 2.0845
                                                    a 15.9155 15.9155 0 0 1 0 31.831
                                                    a 15.9155 15.9155 0 0 1 0 -31.831"
                                                    fill="none"
                                                    stroke="var(--primary-color)"
                                                    strokeWidth="3"
                                                    strokeDasharray={`${analysis.score}, 100`}
                                                />
                                            </svg>
                                            <span className="score">{analysis.score}</span>
                                        </div>
                                        <h3>Resume Score</h3>
                                    </div>

                                    <div className="analysis-sections">
                                        {analysis.suggestions.map((section, index) => (
                                            <div key={index} className="analysis-section">
                                                <h3>{section.category}</h3>
                                                <ul>
                                                    {section.items.map((item, i) => (
                                                        <li key={i}>{item}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="keyword-analysis">
                                        <h3>Detected Keywords</h3>
                                        <div className="keyword-tags">
                                            {analysis.keywords.map((keyword, index) => (
                                                <span key={index} className="keyword-tag">
                                                    {keyword}
                                                </span>
                                            ))}
                                        </div>

                                        <h3>Suggested Skills to Add</h3>
                                        <div className="keyword-tags missing">
                                            {analysis.missingSkills.map((skill, index) => (
                                                <span key={index} className="keyword-tag">
                                                    + {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default Resume; 
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import UploadBox from '../resume-components/UploadBox';
import ResumeAnalysis from '../resume-components/ResumeAnalysis';
import ResumePreview from '../resume-components/ResumePreview';
import styles from './Resume.module.css';

interface Analysis {
    score: number;
    suggestions: {
        category: string;
        items: string[];
    }[];
    keywords: string[];
    missingSkills: string[];
}

interface Section {
    title: string;
    content: string;
    suggestions: string[];
    score: number;
}

const Resume: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [analysis, setAnalysis] = useState<Analysis | null>(null);
    const [sections, setSections] = useState<Section[]>([]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isProcessingOCR, setIsProcessingOCR] = useState(false);
    const [showPreview, setShowPreview] = useState(false);

    const handleFileUpload = async (uploadedFile: File) => {
        setFile(uploadedFile);
        setIsAnalyzing(true);
        setIsProcessingOCR(true);

        try {
            // TODO: Implement actual OCR and analysis
            // For now, using mock data
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Mock OCR results
            const mockSections: Section[] = [
                {
                    title: 'Professional Summary',
                    content: 'Experienced software developer with expertise in React and TypeScript...',
                    suggestions: [
                        'Add more quantifiable achievements',
                        'Include specific industry impact',
                        'Highlight leadership experience'
                    ],
                    score: 85
                },
                {
                    title: 'Work Experience',
                    content: 'Senior Developer at Tech Corp (2020-2023)\n- Led team of 5 developers...',
                    suggestions: [
                        'Add more metrics and numbers',
                        'Include specific project outcomes',
                        'Highlight technical challenges solved'
                    ],
                    score: 90
                },
                {
                    title: 'Education',
                    content: 'BS in Computer Science\nUniversity of Technology (2015-2019)',
                    suggestions: [
                        'Add relevant coursework',
                        'Include GPA if above 3.5',
                        'List academic achievements'
                    ],
                    score: 75
                }
            ];

            setSections(mockSections);

            // Mock overall analysis
            setAnalysis({
                score: 85,
                suggestions: [
                    {
                        category: 'Content',
                        items: [
                            'Add more quantifiable achievements',
                            'Include relevant certifications',
                            'Expand on leadership experience'
                        ]
                    },
                    {
                        category: 'Format',
                        items: [
                            'Improve section spacing',
                            'Use consistent formatting',
                            'Add clear section headers'
                        ]
                    }
                ],
                keywords: ['React', 'TypeScript', 'Node.js', 'AWS'],
                missingSkills: ['Docker', 'GraphQL', 'CI/CD']
            });

            setShowPreview(true);
        } catch (error) {
            console.error('Error processing resume:', error);
        } finally {
            setIsAnalyzing(false);
            setIsProcessingOCR(false);
        }
    };

    const handleSectionUpdate = (sectionIndex: number, updatedContent: string) => {
        setSections(prev => prev.map((section, index) =>
            index === sectionIndex
                ? { ...section, content: updatedContent }
                : section
        ));
    };

    return (
        <div className={styles.pageContainer}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={styles.resumePage}
            >
                <h1>Resume Builder</h1>
                <p className={styles.subtitle}>Upload your resume for AI-powered analysis and improvements</p>

                <div className={styles.content}>
                    {!showPreview ? (
                        <div className={styles.uploadSection}>
                            <UploadBox
                                onFileUpload={handleFileUpload}
                                acceptedFileTypes={['.pdf', '.doc', '.docx']}
                                maxSize={5 * 1024 * 1024} // 5MB
                            />
                        </div>
                    ) : (
                        <ResumePreview
                            sections={sections.map(({ title, content }) => ({ title, content }))}
                            onSectionUpdate={handleSectionUpdate}
                        />
                    )}

                    {(isAnalyzing || isProcessingOCR) && (
                        <div className={styles.loading}>
                            <div className={styles.spinner}></div>
                            <p>
                                {isProcessingOCR
                                    ? 'Processing your resume with OCR...'
                                    : 'Analyzing your resume...'}
                            </p>
                        </div>
                    )}

                    {analysis && !showPreview && (
                        <div className={styles.analysisSection}>
                            <ResumeAnalysis
                                score={analysis.score}
                                suggestions={analysis.suggestions}
                                keywords={analysis.keywords}
                                missingSkills={analysis.missingSkills}
                            />
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default Resume;
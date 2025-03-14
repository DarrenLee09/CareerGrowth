import React, { useState } from 'react';
import styles from './ResumeSectionAnalysis.module.css';

interface Section {
    title: string;
    content: string;
    suggestions: string[];
    score: number;
}

interface ResumeSectionAnalysisProps {
    sections: Section[];
    onSectionUpdate: (sectionIndex: number, updatedContent: string) => void;
}

const ResumeSectionAnalysis: React.FC<ResumeSectionAnalysisProps> = ({
    sections,
    onSectionUpdate
}) => {
    const [activeSection, setActiveSection] = useState<number | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState('');

    const handleEditStart = (section: Section, index: number) => {
        setEditContent(section.content);
        setActiveSection(index);
        setIsEditing(true);
    };

    const handleEditSave = () => {
        if (activeSection !== null) {
            onSectionUpdate(activeSection, editContent);
            setIsEditing(false);
        }
    };

    const handleEditCancel = () => {
        setIsEditing(false);
        setActiveSection(null);
    };

    return (
        <div className={styles.sectionAnalysis}>
            <h2>Resume Sections Analysis</h2>
            <div className={styles.sectionsGrid}>
                {sections.map((section, index) => (
                    <div key={index} className={styles.sectionCard}>
                        <div className={styles.sectionHeader}>
                            <h3>{section.title}</h3>
                            <div className={styles.sectionScore}>
                                Score: {section.score}/100
                            </div>
                        </div>

                        <div className={styles.sectionContent}>
                            {isEditing && activeSection === index ? (
                                <div className={styles.editMode}>
                                    <textarea
                                        value={editContent}
                                        onChange={(e) => setEditContent(e.target.value)}
                                        className={styles.editTextarea}
                                    />
                                    <div className={styles.editActions}>
                                        <button
                                            onClick={handleEditSave}
                                            className={styles.saveButton}
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={handleEditCancel}
                                            className={styles.cancelButton}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <p>{section.content}</p>
                                    <button
                                        onClick={() => handleEditStart(section, index)}
                                        className={styles.editButton}
                                    >
                                        Edit Section
                                    </button>
                                </>
                            )}
                        </div>

                        <div className={styles.suggestions}>
                            <h4>AI Suggestions</h4>
                            <ul>
                                {section.suggestions.map((suggestion, i) => (
                                    <li key={i}>{suggestion}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ResumeSectionAnalysis; 
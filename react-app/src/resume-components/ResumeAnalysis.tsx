import React from 'react';
import styles from './ResumeAnalysis.module.css';

interface ResumeAnalysisProps {
    score: number;
    suggestions: {
        category: string;
        items: string[];
    }[];
    keywords: string[];
    missingSkills: string[];
}

const ResumeAnalysis: React.FC<ResumeAnalysisProps> = ({
    score,
    suggestions,
    keywords,
    missingSkills
}) => {
    return (
        <div className={styles.analysisContainer}>
            <div className={styles.scoreCard}>
                <div className={styles.scoreCircle}>
                    <svg viewBox="0 0 36 36">
                        <path
                            d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="var(--primary-color)"
                            strokeWidth="3"
                            strokeDasharray={`${score}, 100`}
                        />
                    </svg>
                    <span className={styles.score}>{score}</span>
                </div>
                <h3>Resume Score</h3>
            </div>

            <div className={styles.analysisSections}>
                {suggestions.map((section, index) => (
                    <div key={index} className={styles.analysisSection}>
                        <h3>{section.category}</h3>
                        <ul>
                            {section.items.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className={styles.keywordAnalysis}>
                <h3>Detected Keywords</h3>
                <div className={styles.keywordTags}>
                    {keywords.map((keyword, index) => (
                        <span key={index} className={styles.keywordTag}>
                            {keyword}
                        </span>
                    ))}
                </div>

                <h3>Suggested Skills to Add</h3>
                <div className={`${styles.keywordTags} ${styles.missing}`}>
                    {missingSkills.map((skill, index) => (
                        <span key={index} className={styles.keywordTag}>
                            + {skill}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ResumeAnalysis; 
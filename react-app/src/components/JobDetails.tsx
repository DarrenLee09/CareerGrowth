import React from 'react';
import { Job } from '../types';
import './JobModal.css';

interface JobDetailsProps {
    job: Job;
    onClose: () => void;
}

const JobDetails: React.FC<JobDetailsProps> = ({ job, onClose }) => {
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="job-details-modal" onClick={handleOverlayClick}>
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>×</button>

                <div className="job-details-header">
                    <div className="job-title-section">
                        <h2>{job.title}</h2>
                        <h3>{job.company}</h3>
                    </div>
                    {job.matchScore && (
                        <div className="match-score">
                            <span>{job.matchScore}%</span>
                            <label>Match</label>
                        </div>
                    )}
                </div>

                <div className="job-meta">
                    <span className="location">{job.location}</span>
                    <span className="type">{job.type}</span>
                    {job.salary && (
                        <span className="salary">
                            ${job.salary.min}k - ${job.salary.max}k
                        </span>
                    )}
                    <span className="posted-date">
                        Posted {new Date(job.postedDate).toLocaleDateString()}
                    </span>
                </div>

                <div className="job-description">
                    <h4>Description</h4>
                    <p>{job.description}</p>
                </div>

                <div className="job-requirements">
                    <h4>Requirements</h4>
                    <ul>
                        {job.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                        ))}
                    </ul>
                </div>

                <div className="job-skills">
                    <h4>Required Skills</h4>
                    <div className="skills-list">
                        {job.skills.map(skill => (
                            <span key={skill} className="skill-tag">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="job-footer">
                    <a
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="apply-button"
                    >
                        Apply Now
                    </a>
                </div>
            </div>
        </div>
    );
};

export default JobDetails; 
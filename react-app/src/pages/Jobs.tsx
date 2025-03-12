import React, { useState } from 'react';
import { motion } from 'framer-motion';
import FadeInSection from '../components/FadeInSection';
import { Job } from '../types';
import './Pages.css';

const Jobs: React.FC = () => {
    const [jobs, setJobs] = useState<Job[]>([
        {
            id: '1',
            title: 'Software Engineering Intern',
            company: 'Tech Corp',
            location: 'San Francisco, CA',
            description: 'Looking for a passionate software engineering intern to join our team...',
            requirements: [
                'Currently pursuing a BS in Computer Science or related field',
                'Experience with React, TypeScript, and Node.js',
                'Strong problem-solving skills'
            ],
            type: 'internship',
            salary: {
                min: 25,
                max: 35,
                currency: 'USD'
            },
            url: '#',
            source: 'LinkedIn',
            postedDate: new Date('2024-03-01'),
            matchScore: 85,
            skills: ['React', 'TypeScript', 'Node.js'],
            createdAt: new Date(),
            updatedAt: new Date()
        },
        // Add more mock jobs here
    ]);

    const [filters, setFilters] = useState({
        type: 'all',
        location: 'all',
        matchScore: 0
    });

    const filteredJobs = jobs.filter(job => {
        if (filters.type !== 'all' && job.type !== filters.type) return false;
        if (filters.matchScore > 0 && job.matchScore && job.matchScore < filters.matchScore) return false;
        return true;
    });

    return (
        <div className="page-container">
            <div className="page-content jobs-page">
                <FadeInSection>
                    <section className="jobs-header">
                        <h1>Job Matches</h1>
                        <p>Discover opportunities that match your skills and experience</p>
                    </section>
                </FadeInSection>

                <div className="jobs-content">
                    <FadeInSection delay={0.2}>
                        <section className="filters-section">
                            <h2>Filters</h2>
                            <div className="filters-grid">
                                <div className="filter-group">
                                    <label htmlFor="type">Job Type</label>
                                    <select
                                        id="type"
                                        value={filters.type}
                                        onChange={(e) => setFilters(prev => ({
                                            ...prev,
                                            type: e.target.value
                                        }))}
                                    >
                                        <option value="all">All Types</option>
                                        <option value="internship">Internship</option>
                                        <option value="full-time">Full Time</option>
                                        <option value="part-time">Part Time</option>
                                        <option value="contract">Contract</option>
                                    </select>
                                </div>

                                <div className="filter-group">
                                    <label htmlFor="matchScore">Minimum Match Score</label>
                                    <input
                                        type="range"
                                        id="matchScore"
                                        min="0"
                                        max="100"
                                        value={filters.matchScore}
                                        onChange={(e) => setFilters(prev => ({
                                            ...prev,
                                            matchScore: parseInt(e.target.value)
                                        }))}
                                    />
                                    <span>{filters.matchScore}%</span>
                                </div>
                            </div>
                        </section>
                    </FadeInSection>

                    <FadeInSection delay={0.3}>
                        <section className="jobs-list">
                            {filteredJobs.map((job, index) => (
                                <motion.div
                                    key={job.id}
                                    className="job-card"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <div className="job-header">
                                        <div className="job-title">
                                            <h3>{job.title}</h3>
                                            <span className="company">{job.company}</span>
                                        </div>
                                        {job.matchScore && (
                                            <div className="match-score">
                                                <span>{job.matchScore}%</span>
                                                <label>Match</label>
                                            </div>
                                        )}
                                    </div>

                                    <div className="job-details">
                                        <span className="location">{job.location}</span>
                                        <span className="type">{job.type}</span>
                                        {job.salary && (
                                            <span className="salary">
                                                ${job.salary.min}k - ${job.salary.max}k
                                            </span>
                                        )}
                                    </div>

                                    <p className="job-description">{job.description}</p>

                                    <div className="skills-list">
                                        {job.skills.map(skill => (
                                            <span key={skill} className="skill-tag">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="job-footer">
                                        <span className="posted-date">
                                            Posted {new Date(job.postedDate).toLocaleDateString()}
                                        </span>
                                        <a
                                            href={job.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="apply-button"
                                        >
                                            Apply Now
                                        </a>
                                    </div>
                                </motion.div>
                            ))}
                        </section>
                    </FadeInSection>
                </div>
            </div>
        </div>
    );
};

export default Jobs; 
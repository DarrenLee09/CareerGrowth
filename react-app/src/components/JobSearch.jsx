import React, { useState } from 'react';

const JobSearch = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [location, setLocation] = useState('');
    const [skills, setSkills] = useState([]);
    const [jobType, setJobType] = useState([]);
    const [matchScore, setMatchScore] = useState(0);
    const [skillInput, setSkillInput] = useState('');

    const handleAddSkill = (skill) => {
        if (skill && !skills.includes(skill)) {
            setSkills([...skills, skill]);
            setSkillInput('');
        }
    };

    const handleRemoveSkill = (skillToRemove) => {
        setSkills(skills.filter(skill => skill !== skillToRemove));
    };

    const handleJobTypeChange = (type) => {
        if (jobType.includes(type)) {
            setJobType(jobType.filter(t => t !== type));
        } else {
            setJobType([...jobType, type]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle search submission
        console.log({
            searchQuery,
            location,
            skills,
            jobType,
            matchScore
        });
    };

    return (
        <div className="jobs-search">
            <form className="search-form" onSubmit={handleSubmit}>
                <div className="search-main">
                    <div className="search-inputs">
                        <div className="search-field">
                            <label htmlFor="job-search">Search Jobs</label>
                            <input
                                type="search"
                                id="job-search"
                                placeholder="Job title or keywords"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="search-field">
                            <label htmlFor="location">Location</label>
                            <input
                                type="text"
                                id="location"
                                placeholder="City, country, or remote"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>
                    </div>
                    <button type="submit" className="search-button">
                        <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20">
                            <path d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
                        </svg>
                        Search
                    </button>
                </div>

                <div className="advanced-filters">
                    <div className="filters-grid">
                        {/* Skills Filter */}
                        <div className="filter-group">
                            <label>Skills</label>
                            <div className="skills-input-container">
                                <input
                                    type="text"
                                    className="skills-input"
                                    placeholder="Add skills..."
                                    value={skillInput}
                                    onChange={(e) => setSkillInput(e.target.value)}
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            handleAddSkill(skillInput);
                                        }
                                    }}
                                />
                            </div>
                            {skills.length > 0 && (
                                <div className="skills-list">
                                    {skills.map((skill) => (
                                        <span key={skill} className="skill-tag">
                                            {skill}
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveSkill(skill)}
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Match Score Filter */}
                        <div className="filter-group">
                            <label>Match Score</label>
                            <div className="match-score-range">
                                <input
                                    type="range"
                                    className="range-slider"
                                    min="0"
                                    max="100"
                                    value={matchScore}
                                    onChange={(e) => setMatchScore(e.target.value)}
                                />
                                <div className="range-values">
                                    <span>0%</span>
                                    <span>{matchScore}%</span>
                                    <span>100%</span>
                                </div>
                            </div>
                        </div>

                        {/* Job Type Filter */}
                        <div className="filter-group">
                            <label>Job Type</label>
                            <div className="checkbox-group">
                                {['Full-time', 'Part-time', 'Contract', 'Remote'].map((type) => (
                                    <label key={type} className="checkbox-item">
                                        <input
                                            type="checkbox"
                                            checked={jobType.includes(type)}
                                            onChange={() => handleJobTypeChange(type)}
                                        />
                                        {type}
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Visa Sponsorship Filter */}
                        <div className="filter-group">
                            <label>Visa Sponsorship</label>
                            <div className="checkbox-group">
                                <label className="checkbox-item">
                                    <input type="checkbox" />
                                    Offers Sponsorship
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default JobSearch; 
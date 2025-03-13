import React, { useState, useEffect, useRef } from 'react';
import './JobFilters.css';

interface JobSearchProps {
    onSearch?: (params: {
        searchQuery: string;
        location: string;
        skills: string[];
        jobType: string[];
        matchScore: number;
        sponsorship: boolean;
    }) => void;
}

const JobSearch: React.FC<JobSearchProps> = ({ onSearch }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [location, setLocation] = useState('');
    const [skills, setSkills] = useState<string[]>([]);
    const [skillInput, setSkillInput] = useState('');
    const [jobType, setJobType] = useState<string[]>([]);
    const [matchScore, setMatchScore] = useState(0);
    const [sponsorship, setSponsorship] = useState(false);
    const skillsContainerRef = useRef<HTMLDivElement>(null);

    // Update container height when skills change
    useEffect(() => {
        if (skillsContainerRef.current) {
            const container = skillsContainerRef.current;
            const height = skills.length > 0 ? Math.max(48, container.scrollHeight) : 48;
            container.style.minHeight = `${height}px`;
        }
    }, [skills]);

    const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && skillInput.trim()) {
            if (!skills.includes(skillInput.trim())) {
                setSkills([...skills, skillInput.trim()]);
            }
            setSkillInput('');
        }
    };

    const handleRemoveSkill = (skillToRemove: string) => {
        setSkills(skills.filter(skill => skill !== skillToRemove));
    };

    const handleJobTypeChange = (type: string) => {
        setJobType(prev =>
            prev.includes(type)
                ? prev.filter(t => t !== type)
                : [...prev, type]
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch?.({
            searchQuery,
            location,
            skills,
            jobType,
            matchScore,
            sponsorship
        });
    };

    return (
        <form onSubmit={handleSubmit} className="search-form">
            <div className="search-main">
                <div className="search-inputs">
                    <div className="search-field">
                        <label>Job Title or Keywords</label>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search jobs..."
                        />
                    </div>
                    <div className="search-field">
                        <label>Location</label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="City, state, or remote"
                        />
                    </div>
                </div>
                <button type="submit" className="search-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                    Search Jobs
                </button>
            </div>
            <div className="advanced-filters">
                <div className="filters-grid">
                    <div className="filter-group">
                        <label>Skills</label>
                        <div className="skills-input-container" ref={skillsContainerRef}>
                            <input
                                type="text"
                                className="skills-input"
                                value={skillInput}
                                onChange={(e) => setSkillInput(e.target.value)}
                                onKeyDown={handleAddSkill}
                                placeholder="Add skills..."
                            />
                            {skills.length > 0 && (
                                <div className="skills-list">
                                    {skills.map((skill) => (
                                        <div key={skill} className="skill-tag">
                                            {skill}
                                            <button type="button" onClick={() => handleRemoveSkill(skill)}>×</button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="filter-group">
                        <label>Match Score</label>
                        <div className="match-score-range">
                            <input
                                type="range"
                                className="range-slider"
                                min="0"
                                max="100"
                                value={matchScore}
                                onChange={(e) => setMatchScore(parseInt(e.target.value))}
                            />
                            <div className="range-values">
                                <span>0%</span>
                                <span>{matchScore}%</span>
                                <span>100%</span>
                            </div>
                        </div>
                    </div>
                    <div className="filter-group">
                        <label>Job Type</label>
                        <div className="checkbox-group">
                            {['Full-time', 'Part-time', 'Contract', 'Remote', 'Internship'].map((type) => (
                                <label key={type} className="checkbox-item">
                                    <input
                                        type="checkbox"
                                        checked={jobType.includes(type)}
                                        onChange={() => handleJobTypeChange(type)}
                                    />
                                    <span>{type}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="filter-group">
                        <label>Visa Sponsorship</label>
                        <div className="checkbox-group">
                            <label className="checkbox-item">
                                <input
                                    type="checkbox"
                                    checked={sponsorship}
                                    onChange={(e) => setSponsorship(e.target.checked)}
                                />
                                <span>Offers Sponsorship</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default JobSearch; 
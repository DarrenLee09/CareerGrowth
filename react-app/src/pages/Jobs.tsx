import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Job } from '../types';
import JobDetails from '../components/JobDetails';
import { useTheme } from '../contexts/ThemeContext';
import './JobsPage.css';

const Jobs: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    // State for search, filters, and jobs
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [sortOption, setSortOption] = useState('relevance');
    const skillInputRef = useRef<HTMLInputElement>(null);
    const [filters, setFilters] = useState({
        country: '',
        jobType: '',
        experienceLevel: '',
        salary: '',
        sponsorship: '',
        skills: [] as string[]
    });

    // Use the global theme context instead of local state
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';

    // Apply theme changes globally when component mounts
    useEffect(() => {
        // Set theme on document element - this is the root HTML element that controls the entire page
        document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');

        // Also apply to body for consistent behavior
        document.body.style.backgroundColor = `var(--bg-main)`;
        document.body.style.color = `var(--text-primary)`;

        // Force a repaint to ensure styles are properly applied
        document.body.style.display = 'none';
        document.body.offsetHeight; // Trigger a reflow
        document.body.style.display = '';
    }, [isDarkMode]); // Added isDarkMode as a dependency to ensure it updates when changed

    // Simulate loading state
    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, [searchQuery, filters, sortOption]);

    // Mock job data
    const [jobs, setJobs] = useState<Job[]>([
        {
            id: '1',
            title: 'Senior Frontend Developer',
            company: 'Tech Innovations Inc.',
            location: 'San Francisco, CA',
            type: 'full-time',
            description: 'We are looking for an experienced Frontend Developer to join our team and help build beautiful, responsive web applications.',
            requirements: [
                'Minimum 5 years of experience with React',
                'Strong understanding of modern JavaScript',
                'Experience with TypeScript',
                'Knowledge of responsive design and CSS preprocessors'
            ],
            skills: ['React', 'TypeScript', 'SASS', 'Redux', 'Node.js', 'GraphQL'],
            salary: {
                min: 120,
                max: 180,
                currency: 'USD'
            },
            postedDate: new Date('2024-03-15'),
            matchScore: 95,
            source: 'Internal',
            url: '#',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: '2',
            title: 'UX/UI Designer',
            company: 'Creative Solutions',
            location: 'Remote',
            type: 'full-time',
            description: 'Join our design team to create beautiful, intuitive interfaces for our enterprise clients.',
            requirements: [
                'At least 3 years of experience in UX/UI design',
                'Proficiency with Figma and Adobe tools',
                'Portfolio showcasing user-centered design process',
                'Collaboration experience with development teams'
            ],
            skills: ['Figma', 'UI Design', 'User Research', 'Wireframing', 'Prototyping'],
            salary: {
                min: 90,
                max: 130,
                currency: 'USD'
            },
            postedDate: new Date('2024-03-18'),
            matchScore: 88,
            source: 'Design Jobs',
            url: '#',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: '3',
            title: 'Backend Developer',
            company: 'DataSystems Corp',
            location: 'Austin, TX',
            type: 'full-time',
            description: 'Looking for a skilled backend developer to work on our cloud infrastructure and API services.',
            requirements: [
                'Strong knowledge of Node.js and Express',
                'Experience with database design and optimization',
                'Understanding of microservices architecture',
                'Familiarity with AWS or Azure cloud services'
            ],
            skills: ['Node.js', 'Express', 'MongoDB', 'AWS', 'Microservices'],
            salary: {
                min: 110,
                max: 160,
                currency: 'USD'
            },
            postedDate: new Date('2024-03-10'),
            matchScore: 82,
            source: 'Tech Careers',
            url: '#',
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ]);

    // Handler for search input
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    // Handler for filter changes
    const handleFilterChange = (name: string, value: string | string[]) => {
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handler for clearing all filters
    const handleClearFilters = () => {
        setFilters({
            country: '',
            jobType: '',
            experienceLevel: '',
            salary: '',
            sponsorship: '',
            skills: []
        });
    };

    // Handler for adding a skill to filters
    const handleAddSkill = () => {
        if (skillInputRef.current?.value) {
            const newSkill = skillInputRef.current.value.trim();

            // Don't add if it's empty or already exists
            if (newSkill && !filters.skills.includes(newSkill)) {
                setFilters(prev => ({
                    ...prev,
                    skills: [...prev.skills, newSkill]
                }));
                skillInputRef.current.value = '';
            }
        }
    };

    // Handler for adding a skill on Enter key
    const handleSkillInputKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddSkill();
        }
    };

    // Handler for removing a skill
    const handleRemoveSkill = (skillToRemove: string) => {
        setFilters(prev => ({
            ...prev,
            skills: prev.skills.filter(skill => skill !== skillToRemove)
        }));
    };

    // Handler for job card view details
    const handleViewDetails = (job: Job, e: React.MouseEvent) => {
        e.preventDefault();
        setSelectedJob(job);
    };

    // Handler for job application
    const handleApply = (job: Job, e: React.MouseEvent) => {
        e.preventDefault();
        window.open(job.url, '_blank');
    };

    // Filter and sort jobs
    const filteredJobs = jobs.filter(job => {
        // Search query filtering
        if (searchQuery && !job.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !job.company.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !job.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))) {
            return false;
        }

        // Filter by country
        if (filters.country && !job.location.includes(filters.country)) return false;

        // Filter by job type
        if (filters.jobType && job.type !== filters.jobType) return false;

        // Filter by experience level (would need to add this field to job type)

        // Filter by salary range
        if (filters.salary) {
            const [min, max] = filters.salary.split('-').map(Number);
            if (job.salary && (job.salary.min < min || (max && job.salary.max > max))) return false;
        }

        // Filter by skills
        if (filters.skills.length > 0 && !filters.skills.some(skill =>
            job.skills.some(jobSkill => jobSkill.toLowerCase().includes(skill.toLowerCase()))
        )) {
            return false;
        }

        return true;
    }).sort((a, b) => {
        // Sort by relevance (match score)
        if (sortOption === 'relevance') {
            return (b.matchScore || 0) - (a.matchScore || 0);
        }

        // Sort by date
        if (sortOption === 'recent') {
            return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime();
        }

        // Sort by salary
        if (sortOption === 'salary-high') {
            return (b.salary?.max || 0) - (a.salary?.max || 0);
        }

        return 0;
    });

    // Skeleton loading component
    const JobSkeleton = () => (
        <div className="job-card skeleton-card">
            <div className="job-main">
                <div className="job-header">
                    <div>
                        <div className="skeleton skeleton-title"></div>
                        <div className="skeleton skeleton-company"></div>
                    </div>
                </div>
                <div className="skeleton-meta">
                    <div className="skeleton skeleton-meta-item"></div>
                    <div className="skeleton skeleton-meta-item"></div>
                    <div className="skeleton skeleton-meta-item"></div>
                </div>
                <div className="skeleton-skills">
                    <div className="skeleton skeleton-skill"></div>
                    <div className="skeleton skeleton-skill"></div>
                    <div className="skeleton skeleton-skill"></div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="jobs-page">
            {/* Search Bar */}
            <div className="search-bar">
                <div className="search-container">
                    <div className="search-input-wrapper">
                        <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search for jobs, skills, or companies..."
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                    </div>
                    <motion.button
                        className="search-button"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                        Search
                    </motion.button>
                </div>
            </div>

            {/* Main Content */}
            <div className="jobs-content">
                {/* Filters Panel */}
                <aside className="filters-panel animate-slideIn">
                    <div className="filters-header">
                        <h2>Filters</h2>
                        <motion.button
                            className="clear-filters"
                            onClick={handleClearFilters}
                            whileHover={{ x: 3 }}
                            whileTap={{ x: -2 }}
                        >
                            Clear all
                        </motion.button>
                    </div>
                    <div className="filters-body">
                        <motion.div
                            className="filter-group"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <label htmlFor="country">Country</label>
                            <select
                                id="country"
                                className="filter-select"
                                value={filters.country}
                                onChange={(e) => handleFilterChange('country', e.target.value)}
                            >
                                <option value="">All Countries</option>
                                <option value="United States">United States</option>
                                <option value="United Kingdom">United Kingdom</option>
                                <option value="Canada">Canada</option>
                                <option value="Australia">Australia</option>
                                <option value="Germany">Germany</option>
                                <option value="France">France</option>
                                <option value="Remote">Remote</option>
                            </select>
                        </motion.div>

                        <motion.div
                            className="filter-group"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                        >
                            <label htmlFor="jobType">Job Type</label>
                            <select
                                id="jobType"
                                className="filter-select"
                                value={filters.jobType}
                                onChange={(e) => handleFilterChange('jobType', e.target.value)}
                            >
                                <option value="">All Types</option>
                                <option value="full-time">Full Time</option>
                                <option value="part-time">Part Time</option>
                                <option value="contract">Contract</option>
                                <option value="internship">Internship</option>
                                <option value="temporary">Temporary</option>
                            </select>
                        </motion.div>

                        <motion.div
                            className="filter-group"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                        >
                            <label htmlFor="experienceLevel">Experience Level</label>
                            <select
                                id="experienceLevel"
                                className="filter-select"
                                value={filters.experienceLevel}
                                onChange={(e) => handleFilterChange('experienceLevel', e.target.value)}
                            >
                                <option value="">All Levels</option>
                                <option value="entry">Entry Level</option>
                                <option value="mid">Mid Level</option>
                                <option value="senior">Senior Level</option>
                                <option value="lead">Lead</option>
                                <option value="executive">Executive</option>
                            </select>
                        </motion.div>

                        <motion.div
                            className="filter-group"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.3 }}
                        >
                            <label htmlFor="salary">Salary Range</label>
                            <select
                                id="salary"
                                className="filter-select"
                                value={filters.salary}
                                onChange={(e) => handleFilterChange('salary', e.target.value)}
                            >
                                <option value="">Any Salary</option>
                                <option value="0-50">Under $50k</option>
                                <option value="50-80">$50k - $80k</option>
                                <option value="80-120">$80k - $120k</option>
                                <option value="120-160">$120k - $160k</option>
                                <option value="160-0">$160k+</option>
                            </select>
                        </motion.div>

                        <motion.div
                            className="filter-group"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.4 }}
                        >
                            <label htmlFor="sponsorship">Visa Sponsorship</label>
                            <select
                                id="sponsorship"
                                className="filter-select"
                                value={filters.sponsorship}
                                onChange={(e) => handleFilterChange('sponsorship', e.target.value)}
                            >
                                <option value="">All</option>
                                <option value="yes">Available</option>
                                <option value="no">Not Available</option>
                            </select>
                        </motion.div>

                        <motion.div
                            className="filter-group"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: 0.5 }}
                        >
                            <label htmlFor="skills">Your Skills</label>
                            <div className="skills-input-container">
                                <input
                                    ref={skillInputRef}
                                    id="skills"
                                    className="skills-input"
                                    placeholder="Add a skill (e.g. React, Python)"
                                    onKeyPress={handleSkillInputKeyPress}
                                />
                                <button
                                    className="skills-add-btn"
                                    onClick={handleAddSkill}
                                    aria-label="Add skill"
                                    type="button"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="12" y1="5" x2="12" y2="19"></line>
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                    </svg>
                                </button>
                            </div>
                            {filters.skills.length > 0 && (
                                <div className="skills-list">
                                    {filters.skills.map((skill, index) => (
                                        <motion.div
                                            key={index}
                                            className="skill-tag"
                                            initial={{ scale: 0.8, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            exit={{ scale: 0.8, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            {skill}
                                            <button
                                                className="skill-remove"
                                                onClick={() => handleRemoveSkill(skill)}
                                                aria-label={`Remove ${skill} skill`}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                                </svg>
                                            </button>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </div>
                </aside>

                {/* Jobs List */}
                <section className="jobs-list-section animate-fadeIn">
                    <div className="jobs-list-header">
                        <div className="results-count">
                            {isLoading ? 'Loading...' : `${filteredJobs.length} jobs found`}
                        </div>
                        <div className="sort-options">
                            <span className="sort-label">Sort by:</span>
                            <select
                                className="sort-select"
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                                disabled={isLoading}
                            >
                                <option value="relevance">Best Match</option>
                                <option value="recent">Most Recent</option>
                                <option value="salary-high">Highest Salary</option>
                            </select>
                        </div>
                    </div>

                    <div className="jobs-list">
                        <AnimatePresence mode="wait">
                            {isLoading ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    {[...Array(3)].map((_, index) => (
                                        <JobSkeleton key={index} />
                                    ))}
                                </motion.div>
                            ) : filteredJobs.length > 0 ? (
                                filteredJobs.map((job, index) => (
                                    <motion.div
                                        key={job.id}
                                        className="job-card"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                    >
                                        <div className="job-main">
                                            <div className="job-header">
                                                <div>
                                                    <h3 className="job-title">
                                                        {job.title}
                                                        {new Date(job.postedDate).getTime() > Date.now() - 3 * 24 * 60 * 60 * 1000 && (
                                                            <span className="job-badge badge-new">New</span>
                                                        )}
                                                    </h3>
                                                    <div className="job-company">{job.company}</div>
                                                </div>
                                                {job.matchScore && (
                                                    <motion.div
                                                        className="match-badge"
                                                        whileHover={{ scale: 1.05 }}
                                                    >
                                                        {job.matchScore}% Match
                                                    </motion.div>
                                                )}
                                            </div>

                                            <div className="job-meta">
                                                <div className="job-meta-item">
                                                    <svg className="job-meta-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                                        <circle cx="12" cy="10" r="3"></circle>
                                                    </svg>
                                                    {job.location}
                                                </div>

                                                <div className="job-meta-item">
                                                    <svg className="job-meta-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                                                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                                                    </svg>
                                                    {job.type.replace('-', ' ')}
                                                </div>

                                                {job.salary && (
                                                    <div className="job-meta-item">
                                                        <svg className="job-meta-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                            <line x1="12" y1="1" x2="12" y2="23"></line>
                                                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                                        </svg>
                                                        ${job.salary.min}k - ${job.salary.max}k
                                                    </div>
                                                )}

                                                <div className="job-meta-item">
                                                    <svg className="job-meta-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                                        <line x1="16" y1="2" x2="16" y2="6"></line>
                                                        <line x1="8" y1="2" x2="8" y2="6"></line>
                                                        <line x1="3" y1="10" x2="21" y2="10"></line>
                                                    </svg>
                                                    Posted {new Date(job.postedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                </div>
                                            </div>

                                            <div className="job-skills">
                                                {job.skills.slice(0, 5).map(skill => (
                                                    <motion.span
                                                        key={skill}
                                                        className="job-skill"
                                                        whileHover={{ y: -3 }}
                                                    >
                                                        {skill}
                                                    </motion.span>
                                                ))}
                                                {job.skills.length > 5 && (
                                                    <span className="job-skill">+{job.skills.length - 5}</span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="job-actions">
                                            <motion.button
                                                className="action-button btn-view"
                                                onClick={(e) => handleViewDetails(job, e)}
                                                whileHover={{ y: -3, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
                                                whileTap={{ y: 0, boxShadow: '0 0px 0px rgba(0,0,0,0.0)' }}
                                            >
                                                View Details
                                            </motion.button>
                                            <motion.button
                                                className="action-button btn-apply"
                                                onClick={(e) => handleApply(job, e)}
                                                whileHover={{ y: -3, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
                                                whileTap={{ y: 0, boxShadow: '0 0px 0px rgba(0,0,0,0.0)' }}
                                            >
                                                Apply Now
                                            </motion.button>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <motion.div
                                    className="no-results"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <p>No jobs match your search criteria. Try adjusting your filters.</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {filteredJobs.length > 0 && (
                        <motion.div
                            className="pagination"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                        >
                            <motion.div
                                className="page-item active"
                                whileHover={{ y: -2 }}
                            >1</motion.div>
                            <motion.div
                                className="page-item"
                                whileHover={{ y: -2 }}
                            >2</motion.div>
                            <motion.div
                                className="page-item"
                                whileHover={{ y: -2 }}
                            >3</motion.div>
                            <motion.div
                                className="page-item"
                                whileHover={{ y: -2 }}
                            >4</motion.div>
                            <motion.div
                                className="page-item"
                                whileHover={{ y: -2 }}
                            >5</motion.div>
                        </motion.div>
                    )}
                </section>
            </div>

            {/* Job Details Modal */}
            {selectedJob && (
                <JobDetails
                    job={selectedJob}
                    onClose={() => setSelectedJob(null)}
                />
            )}
        </div>
    );
};

export default Jobs; 
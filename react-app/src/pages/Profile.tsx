import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '../components/Toast/ToastContext';
import './Pages.css';

interface ProfileData {
    personalInfo: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        location: string;
        bio: string;
    };
    education: {
        university: string;
        major: string;
        graduationYear: string;
        gpa: string;
    };
    skills: string[];
    experience: {
        title: string;
        company: string;
        startDate: string;
        endDate: string;
        description: string;
    }[];
}

const Profile: React.FC = () => {
    const { showToast } = useToast();
    const [profileData, setProfileData] = useState<ProfileData>({
        personalInfo: {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            location: '',
            bio: ''
        },
        education: {
            university: '',
            major: '',
            graduationYear: '',
            gpa: ''
        },
        skills: [],
        experience: []
    });
    const [newSkill, setNewSkill] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [activeSection, setActiveSection] = useState('personal');

    const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProfileData(prev => ({
            ...prev,
            personalInfo: { ...prev.personalInfo, [name]: value }
        }));
    };

    const handleEducationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProfileData(prev => ({
            ...prev,
            education: { ...prev.education, [name]: value }
        }));
    };

    const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && newSkill.trim()) {
            e.preventDefault();
            if (!profileData.skills.includes(newSkill.trim())) {
                setProfileData(prev => ({
                    ...prev,
                    skills: [...prev.skills, newSkill.trim()]
                }));
                setNewSkill('');
            }
        }
    };

    const handleRemoveSkill = (skillToRemove: string) => {
        setProfileData(prev => ({
            ...prev,
            skills: prev.skills.filter(skill => skill !== skillToRemove)
        }));
    };

    const handleExperienceChange = (index: number, field: keyof ProfileData['experience'][0], value: string) => {
        setProfileData(prev => {
            const updatedExperience = [...prev.experience];
            const currentExp = { ...updatedExperience[index] };

            // Handle date validation
            if (field === 'startDate' || field === 'endDate') {
                const startDate = field === 'startDate' ? value : currentExp.startDate;
                const endDate = field === 'endDate' ? value : currentExp.endDate;

                // If end date is before start date, show error
                if (endDate && startDate && new Date(endDate) < new Date(startDate)) {
                    showToast('End date cannot be before start date', 'error');
                    return prev;
                }
            }

            currentExp[field] = value;
            updatedExperience[index] = currentExp;

            return {
                ...prev,
                experience: updatedExperience
            };
        });
    };

    const handleAddExperience = () => {
        setProfileData(prev => ({
            ...prev,
            experience: [...prev.experience, {
                title: '',
                company: '',
                startDate: '',
                endDate: '',
                description: ''
            }]
        }));
    };

    const handleRemoveExperience = (index: number) => {
        setProfileData(prev => ({
            ...prev,
            experience: prev.experience.filter((_, i) => i !== index)
        }));
    };

    const handleSave = () => {
        // TODO: Implement API call to save profile data
        showToast('Profile updated successfully!', 'success');
        setIsEditing(false);
    };

    return (
        <div className="profile-page">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="profile-container"
            >
                <div className="profile-header">
                    <div className="profile-avatar">
                        <div className="avatar-placeholder">
                            {profileData.personalInfo.firstName[0]?.toUpperCase() || '?'}
                        </div>
                        {isEditing && (
                            <button className="change-photo-btn">
                                Change Photo
                            </button>
                        )}
                    </div>
                    <div className="profile-title">
                        <h1>My Profile</h1>
                        <p>Manage your personal information and career details</p>
                    </div>
                    <div className="profile-actions">
                        <button
                            className={`action-button ${isEditing ? 'cancel' : 'edit'}`}
                            onClick={() => setIsEditing(!isEditing)}
                        >
                            {isEditing ? 'Cancel' : 'Edit Profile'}
                        </button>
                    </div>
                </div>

                <div className="profile-navigation">
                    <button
                        className={`nav-item ${activeSection === 'personal' ? 'active' : ''}`}
                        onClick={() => setActiveSection('personal')}
                    >
                        Personal Info
                    </button>
                    <button
                        className={`nav-item ${activeSection === 'education' ? 'active' : ''}`}
                        onClick={() => setActiveSection('education')}
                    >
                        Education
                    </button>
                    <button
                        className={`nav-item ${activeSection === 'skills' ? 'active' : ''}`}
                        onClick={() => setActiveSection('skills')}
                    >
                        Skills
                    </button>
                    <button
                        className={`nav-item ${activeSection === 'experience' ? 'active' : ''}`}
                        onClick={() => setActiveSection('experience')}
                    >
                        Experience
                    </button>
                </div>

                <div className="profile-content">
                    <AnimatePresence mode="wait">
                        {activeSection === 'personal' && (
                            <motion.section
                                key="personal"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="profile-section"
                            >
                                <h2>Personal Information</h2>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label htmlFor="firstName">First Name</label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            value={profileData.personalInfo.firstName}
                                            onChange={handlePersonalInfoChange}
                                            disabled={!isEditing}
                                            placeholder="Enter your first name"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="lastName">Last Name</label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            value={profileData.personalInfo.lastName}
                                            onChange={handlePersonalInfoChange}
                                            disabled={!isEditing}
                                            placeholder="Enter your last name"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={profileData.personalInfo.email}
                                            onChange={handlePersonalInfoChange}
                                            disabled={!isEditing}
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phone">Phone</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={profileData.personalInfo.phone}
                                            onChange={handlePersonalInfoChange}
                                            disabled={!isEditing}
                                            placeholder="Enter your phone number"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="location">Location</label>
                                        <input
                                            type="text"
                                            id="location"
                                            name="location"
                                            value={profileData.personalInfo.location}
                                            onChange={handlePersonalInfoChange}
                                            disabled={!isEditing}
                                            placeholder="Enter your location"
                                        />
                                    </div>
                                    <div className="form-group full-width">
                                        <label htmlFor="bio">Bio</label>
                                        <textarea
                                            id="bio"
                                            name="bio"
                                            value={profileData.personalInfo.bio}
                                            onChange={handlePersonalInfoChange}
                                            disabled={!isEditing}
                                            placeholder="Tell us about yourself"
                                            rows={4}
                                        />
                                    </div>
                                </div>
                            </motion.section>
                        )}

                        {activeSection === 'education' && (
                            <motion.section
                                key="education"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="profile-section"
                            >
                                <h2>Education</h2>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label htmlFor="university">University</label>
                                        <input
                                            type="text"
                                            id="university"
                                            name="university"
                                            value={profileData.education.university}
                                            onChange={handleEducationChange}
                                            disabled={!isEditing}
                                            placeholder="Enter your university"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="major">Major</label>
                                        <input
                                            type="text"
                                            id="major"
                                            name="major"
                                            value={profileData.education.major}
                                            onChange={handleEducationChange}
                                            disabled={!isEditing}
                                            placeholder="Enter your major"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="graduationYear">Expected Graduation Year</label>
                                        <input
                                            type="text"
                                            id="graduationYear"
                                            name="graduationYear"
                                            value={profileData.education.graduationYear}
                                            onChange={handleEducationChange}
                                            disabled={!isEditing}
                                            placeholder="Enter graduation year"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="gpa">GPA</label>
                                        <input
                                            type="text"
                                            id="gpa"
                                            name="gpa"
                                            value={profileData.education.gpa}
                                            onChange={handleEducationChange}
                                            disabled={!isEditing}
                                            placeholder="Enter your GPA"
                                        />
                                    </div>
                                </div>
                            </motion.section>
                        )}

                        {activeSection === 'skills' && (
                            <motion.section
                                key="skills"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="profile-section"
                            >
                                <h2>Skills</h2>
                                {isEditing && (
                                    <div className="skills-input-container">
                                        <input
                                            type="text"
                                            value={newSkill}
                                            onChange={(e) => setNewSkill(e.target.value)}
                                            onKeyDown={handleAddSkill}
                                            placeholder="Type a skill and press Enter"
                                            className="skills-input"
                                        />
                                    </div>
                                )}
                                <div className="skills-list">
                                    {profileData.skills.map((skill, index) => (
                                        <motion.div
                                            key={index}
                                            className="skill-tag"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                        >
                                            {skill}
                                            {isEditing && (
                                                <button
                                                    onClick={() => handleRemoveSkill(skill)}
                                                    className="remove-skill"
                                                    aria-label={`Remove ${skill}`}
                                                >
                                                    ×
                                                </button>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.section>
                        )}

                        {activeSection === 'experience' && (
                            <motion.section
                                key="experience"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="profile-section"
                            >
                                <div className="section-header">
                                    <h2>Experience</h2>
                                    {isEditing && (
                                        <button
                                            onClick={handleAddExperience}
                                            className="add-experience-button"
                                        >
                                            Add Experience
                                        </button>
                                    )}
                                </div>
                                <div className="experience-list">
                                    {profileData.experience.map((exp, index) => (
                                        <motion.div
                                            key={index}
                                            className="experience-item"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                        >
                                            <div className="experience-header">
                                                <h3>Experience #{index + 1}</h3>
                                                {isEditing && (
                                                    <button
                                                        onClick={() => handleRemoveExperience(index)}
                                                        className="remove-experience-button"
                                                        aria-label="Remove experience"
                                                    >
                                                        Remove
                                                    </button>
                                                )}
                                            </div>
                                            <div className="form-grid">
                                                <div className="form-group">
                                                    <label>Title</label>
                                                    <input
                                                        type="text"
                                                        value={exp.title}
                                                        onChange={(e) => handleExperienceChange(index, 'title', e.target.value)}
                                                        disabled={!isEditing}
                                                        placeholder="Job title"
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label>Company</label>
                                                    <input
                                                        type="text"
                                                        value={exp.company}
                                                        onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                                                        disabled={!isEditing}
                                                        placeholder="Company name"
                                                    />
                                                </div>
                                                <div className="form-group date-group">
                                                    <label>Start Date</label>
                                                    <div className="date-input-wrapper">
                                                        <input
                                                            type="month"
                                                            value={exp.startDate}
                                                            onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                                                            disabled={!isEditing}
                                                            min="1900-01"
                                                            max={new Date().toISOString().slice(0, 7)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group date-group">
                                                    <label>End Date</label>
                                                    <div className="date-input-wrapper">
                                                        <input
                                                            type="month"
                                                            value={exp.endDate}
                                                            onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                                                            disabled={!isEditing}
                                                            min={exp.startDate || "1900-01"}
                                                            max={new Date().toISOString().slice(0, 7)}
                                                        />
                                                        <div className="date-hint">
                                                            {!exp.endDate && "Leave empty for current position"}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group full-width">
                                                    <label>Description</label>
                                                    <textarea
                                                        value={exp.description}
                                                        onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                                                        disabled={!isEditing}
                                                        placeholder="Describe your role and responsibilities"
                                                        rows={4}
                                                    />
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                    {profileData.experience.length === 0 && (
                                        <div className="empty-state">
                                            <p>No experience added yet. Click "Add Experience" to get started.</p>
                                        </div>
                                    )}
                                </div>
                            </motion.section>
                        )}
                    </AnimatePresence>
                </div>

                {isEditing && (
                    <div className="profile-footer">
                        <button onClick={handleSave} className="save-button">
                            Save Changes
                        </button>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default Profile; 
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '../components/Toast/ToastContext';
import './Pages.css';

interface ProfileData {
    personalInfo: {
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        location: string;
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
            location: ''
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

    const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    const handleExperienceChange = (index: number, field: string, value: string) => {
        setProfileData(prev => ({
            ...prev,
            experience: prev.experience.map((exp, i) =>
                i === index ? { ...exp, [field]: value } : exp
            )
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
            >
                <div className="profile-header">
                    <h1>My Profile</h1>
                    <p>Manage your personal information and career details</p>
                </div>

                <div className="profile-grid">
                    {/* Personal Information Section */}
                    <section className="profile-section">
                        <div className="section-header">
                            <h2>Personal Information</h2>
                            <button
                                className="edit-button"
                                onClick={() => setIsEditing(!isEditing)}
                            >
                                {isEditing ? 'Cancel' : 'Edit'}
                            </button>
                        </div>
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={profileData.personalInfo.firstName}
                                onChange={handlePersonalInfoChange}
                                disabled={!isEditing}
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
                            />
                        </div>
                    </section>

                    {/* Education Section */}
                    <section className="profile-section">
                        <h2>Education</h2>
                        <div className="form-group">
                            <label htmlFor="university">University</label>
                            <input
                                type="text"
                                id="university"
                                name="university"
                                value={profileData.education.university}
                                onChange={handleEducationChange}
                                disabled={!isEditing}
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
                            />
                        </div>
                    </section>

                    {/* Skills Section */}
                    <section className="profile-section">
                        <h2>Skills</h2>
                        {isEditing && (
                            <div className="form-group">
                                <label htmlFor="newSkill">Add Skill</label>
                                <input
                                    type="text"
                                    id="newSkill"
                                    value={newSkill}
                                    onChange={(e) => setNewSkill(e.target.value)}
                                    onKeyDown={handleAddSkill}
                                    placeholder="Press Enter to add"
                                />
                            </div>
                        )}
                        <div className="skills-list">
                            {profileData.skills.map((skill, index) => (
                                <div key={index} className="skill-tag">
                                    {skill}
                                    {isEditing && (
                                        <button
                                            onClick={() => handleRemoveSkill(skill)}
                                            className="remove-skill"
                                        >
                                            ×
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Experience Section */}
                    <section className="profile-section">
                        <h2>Experience</h2>
                        {isEditing && (
                            <button
                                onClick={handleAddExperience}
                                className="add-experience-button"
                            >
                                Add Experience
                            </button>
                        )}
                        {profileData.experience.map((exp, index) => (
                            <div key={index} className="experience-item">
                                <div className="form-group">
                                    <label>Title</label>
                                    <input
                                        type="text"
                                        value={exp.title}
                                        onChange={(e) => handleExperienceChange(index, 'title', e.target.value)}
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Company</label>
                                    <input
                                        type="text"
                                        value={exp.company}
                                        onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div className="date-range">
                                    <div className="form-group">
                                        <label>Start Date</label>
                                        <input
                                            type="date"
                                            value={exp.startDate}
                                            onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>End Date</label>
                                        <input
                                            type="date"
                                            value={exp.endDate}
                                            onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea
                                        value={exp.description}
                                        onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                                        disabled={!isEditing}
                                    />
                                </div>
                                {isEditing && (
                                    <button
                                        onClick={() => handleRemoveExperience(index)}
                                        className="remove-experience-button"
                                    >
                                        Remove Experience
                                    </button>
                                )}
                            </div>
                        ))}
                    </section>
                </div>

                {isEditing && (
                    <div className="profile-actions">
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
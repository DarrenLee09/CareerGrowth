export interface Student {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    university?: string;
    graduationYear?: number;
    major?: string;
    skills: string[];
    careerInterests: string[];
    experience: Experience[];
    education: Education[];
    resumeId?: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Experience {
    id: string;
    title: string;
    company: string;
    location?: string;
    startDate: Date;
    endDate?: Date;
    current: boolean;
    description: string[];
    skills: string[];
}

export interface Education {
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: Date;
    endDate?: Date;
    gpa?: number;
    achievements: string[];
}

export interface Resume {
    id: string;
    studentId: string;
    fileName: string;
    fileUrl: string;
    parsedContent: {
        rawText: string;
        sections: {
            type: 'education' | 'experience' | 'skills' | 'summary' | 'other';
            content: string;
        }[];
    };
    aiAnalysis: {
        score: number;
        feedback: {
            category: string;
            suggestions: string[];
            impact: 'high' | 'medium' | 'low';
        }[];
        improvedContent?: string;
    };
    version: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    description: string;
    requirements: string[];
    type: 'internship' | 'full-time' | 'part-time' | 'contract';
    salary?: {
        min: number;
        max: number;
        currency: string;
    };
    url: string;
    source: string;
    postedDate: Date;
    matchScore?: number;
    skills: string[];
    createdAt: Date;
    updatedAt: Date;
}

export interface ResumeChat {
    id: string;
    studentId: string;
    resumeId: string;
    messages: ChatMessage[];
    createdAt: Date;
    updatedAt: Date;
}

export interface ChatMessage {
    id: string;
    text?: string;
    content?: string;
    sender?: 'user' | 'ai';
    role?: 'user' | 'assistant';
    timestamp: Date;
    context?: {
        section?: string;
        suggestion?: boolean;
    };
}

export interface ResumeData {
    id: string;
    fileName: string;
    content: string;
    sections: {
        [key: string]: string;
    };
    skills: string[];
    experience: {
        title: string;
        company: string;
        startDate: Date;
        endDate?: Date;
        description: string[];
    }[];
    education: {
        degree: string;
        school: string;
        graduationDate: Date;
        gpa?: number;
    }[];
    uploadedAt: Date;
    lastAnalyzed: Date;
} 
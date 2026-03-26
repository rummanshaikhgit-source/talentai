const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    personalInfo: {
        fullName: String,
        headline: String,
        email: String,
        phone: String,
        location: String,
        experienceLevel: {
            type: String,
            enum: ['fresher', '1-3 years', '3-5 years', '5+ years']
        },
        linkedin: String,
        github: String,
        portfolio: String
    },
    skills: [{
        name: String,
        level: {
            type: String,
            enum: ['beginner', 'intermediate', 'advanced', 'expert']
        },
        yearsOfExperience: Number
    }],
    experience: [{
        company: String,
        role: String,
        startDate: String,
        endDate: String,
        current: Boolean,
        description: String,
        achievements: [String]
    }],
    projects: [{
        title: String,
        techStack: String,
        description: String,
        link: String,
        github: String,
        startDate: String,
        endDate: String
    }],
    education: [{
        degree: String,
        institution: String,
        year: Number,
        grade: String
    }],
    aiGenerated: {
        summary: String,
        projectDescriptions: [String],
        skillSuggestions: [String]
    },
    visibility: {
        type: String,
        enum: ['public', 'recruiters-only', 'private'],
        default: 'public'
    },
    completionScore: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

profileSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Profile', profileSchema);
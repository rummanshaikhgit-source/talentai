const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: ['candidate', 'recruiter'],
        default: 'candidate'
    },
    profileId: {
        type: String,
        unique: true,
        sparse: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastLogin: Date,
    profileViews: {
        type: Number,
        default: 0
    },
    resumeDownloads: {
        type: Number,
        default: 0
    }
});

// Generate profile ID before saving
userSchema.pre('save', async function(next) {
    if (!this.profileId) {
        this.profileId = 'TAL-' + Math.random().toString(36).substr(2, 8).toUpperCase();
    }
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
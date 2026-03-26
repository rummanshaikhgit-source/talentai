const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/User');
const Profile = require('../models/Profile');

const router = express.Router();

// Get user analytics
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        const profile = await Profile.findOne({ user: req.userId });
        
        const analytics = {
            profileViews: user.profileViews || 0,
            resumeDownloads: user.resumeDownloads || 0,
            completionScore: profile?.completionScore || 0,
            lastLogin: user.lastLogin,
            memberSince: user.createdAt,
            profileStrength: calculateProfileStrength(profile),
            recentActivity: await getRecentActivity(req.userId)
        };
        
        res.json({ success: true, analytics });
    } catch (error) {
        console.error('Get analytics error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Track profile view
router.post('/view/:profileId', async (req, res) => {
    try {
        const { profileId } = req.params;
        
        const user = await User.findOne({ profileId });
        if (user) {
            user.profileViews = (user.profileViews || 0) + 1;
            await user.save();
        }
        
        res.json({ success: true });
    } catch (error) {
        console.error('Track view error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Track resume download
router.post('/download/:profileId', async (req, res) => {
    try {
        const { profileId } = req.params;
        
        const user = await User.findOne({ profileId });
        if (user) {
            user.resumeDownloads = (user.resumeDownloads || 0) + 1;
            await user.save();
        }
        
        res.json({ success: true });
    } catch (error) {
        console.error('Track download error:', error);
        res.status(500).json({ error: error.message });
    }
});

function calculateProfileStrength(profile) {
    if (!profile) return 0;
    
    let score = 0;
    if (profile.personalInfo && Object.keys(profile.personalInfo).length > 0) score += 25;
    if (profile.skills && profile.skills.length > 0) score += 25;
    if (profile.experience && profile.experience.length > 0) score += 25;
    if (profile.projects && profile.projects.length > 0) score += 25;
    
    return score;
}

async function getRecentActivity(userId) {
    return [
        {
            type: 'view',
            message: 'Your profile was viewed by a recruiter',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
        },
        {
            type: 'download',
            message: 'Your resume was downloaded',
            timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000)
        },
        {
            type: 'ai',
            message: 'AI generated new skill suggestions',
            timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
        }
    ];
}

module.exports = router;
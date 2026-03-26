const express = require('express');
const auth = require('../middleware/auth');
const Profile = require('../models/Profile');
const User = require('../models/User');
const aiService = require('../services/aiService');

const router = express.Router();

// Get user profile
router.get('/', auth, async (req, res) => {
    try {
        let profile = await Profile.findOne({ user: req.userId });
        
        if (!profile) {
            profile = new Profile({ user: req.userId });
            await profile.save();
        }
        
        res.json({ success: true, profile });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Update profile
router.put('/', auth, async (req, res) => {
    try {
        const profile = await Profile.findOneAndUpdate(
            { user: req.userId },
            { 
                ...req.body,
                updatedAt: new Date()
            },
            { new: true, upsert: true }
        );
        
        // Calculate completion score
        let completionScore = 0;
        if (profile.personalInfo && Object.keys(profile.personalInfo).length > 0) completionScore += 25;
        if (profile.skills && profile.skills.length > 0) completionScore += 25;
        if (profile.experience && profile.experience.length > 0) completionScore += 25;
        if (profile.projects && profile.projects.length > 0) completionScore += 25;
        
        profile.completionScore = completionScore;
        await profile.save();
        
        res.json({ success: true, profile });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Generate AI summary - FIXED
router.post('/generate-summary', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.userId });
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
        
        console.log('📝 Generating AI summary for user:', req.userId);
        
        const summary = await aiService.generateSummary(profile);
        
        if (!profile.aiGenerated) profile.aiGenerated = {};
        profile.aiGenerated.summary = summary;
        await profile.save();
        
        res.json({ success: true, summary });
    } catch (error) {
        console.error('Generate summary error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Generate project description - FIXED
router.post('/generate-project', auth, async (req, res) => {
    try {
        const { title, techStack, userInput } = req.body;
        
        console.log('📝 Generating project description for:', title);
        
        const description = await aiService.generateProjectDescription(title, techStack, userInput);
        
        res.json({ success: true, description });
    } catch (error) {
        console.error('Generate project error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Generate skill suggestions - FIXED
router.post('/suggest-skills', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.userId });
        if (!profile) {
            return res.status(404).json({ error: 'Profile not found' });
        }
        
        console.log('📝 Generating skill suggestions...');
        
        const suggestions = await aiService.suggestSkills(
            profile.experience || [],
            profile.projects || [],
            profile.skills || []
        );
        
        res.json({ success: true, suggestions });
    } catch (error) {
        console.error('Generate skill suggestions error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Enhance description - FIXED
router.post('/enhance-description', auth, async (req, res) => {
    try {
        const { description, context } = req.body;
        
        console.log('📝 Enhancing description...');
        
        const enhanced = await aiService.enhanceDescription(description, context);
        
        res.json({ success: true, enhanced });
    } catch (error) {
        console.error('Enhance description error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Get public profile
router.get('/public/:profileId', async (req, res) => {
    try {
        const { profileId } = req.params;
        
        const user = await User.findOne({ profileId });
        if (!user) {
            return res.status(404).json({ error: 'Profile not found' });
        }
        
        const profile = await Profile.findOne({ user: user._id });
        if (!profile || profile.visibility === 'private') {
            return res.status(404).json({ error: 'Profile not found' });
        }
        
        profile.profileViews = (profile.profileViews || 0) + 1;
        await profile.save();
        
        user.profileViews = (user.profileViews || 0) + 1;
        await user.save();
        
        res.json({
            success: true,
            profile: {
                ...profile.toObject(),
                user: {
                    name: user.name,
                    email: user.email,
                    profileId: user.profileId,
                    createdAt: user.createdAt
                }
            }
        });
    } catch (error) {
        console.error('Get public profile error:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
// Profile Management Service with AI Integration

import API from './api.js';

class ProfileService {
    constructor() {
        this.profile = null;
        this.listeners = [];
    }

    async loadProfile() {
        try {
            const data = await API.getProfile();
            this.profile = data.profile;
            this.notifyListeners();
            return this.profile;
        } catch (error) {
            console.error('Failed to load profile:', error);
            throw error;
        }
    }

    async updateProfile(profileData) {
        try {
            const data = await API.updateProfile(profileData);
            this.profile = data.profile;
            this.notifyListeners();
            return this.profile;
        } catch (error) {
            console.error('Failed to update profile:', error);
            throw error;
        }
    }

    // ==================== AI METHODS ====================
    
    /**
     * Generate AI professional summary
     */
    async generateAISummary() {
        try {
            console.log('🎯 Generating AI summary...');
            const data = await API.generateSummary();
            
            if (this.profile) {
                if (!this.profile.aiGenerated) this.profile.aiGenerated = {};
                this.profile.aiGenerated.summary = data.summary;
                await this.updateProfile(this.profile);
            }
            
            return data.summary;
        } catch (error) {
            console.error('Failed to generate summary:', error);
            throw error;
        }
    }

    /**
     * Generate AI project description
     */
    async generateAIProjectDescription(title, techStack, userInput) {
        try {
            console.log('🎯 Generating AI project description...');
            const data = await API.generateProjectDescription(title, techStack, userInput);
            return data.description;
        } catch (error) {
            console.error('Failed to generate project description:', error);
            throw error;
        }
    }

    /**
     * Get AI skill suggestions
     */
    async getAISkillSuggestions() {
        try {
            console.log('🎯 Getting AI skill suggestions...');
            const data = await API.getSkillSuggestions();
            return data.suggestions;
        } catch (error) {
            console.error('Failed to get skill suggestions:', error);
            throw error;
        }
    }

    /**
     * Enhance existing description with AI
     */
    async enhanceWithAI(description, context = '') {
        try {
            console.log('🎯 Enhancing description with AI...');
            const data = await API.enhanceDescription(description, context);
            return data.enhanced;
        } catch (error) {
            console.error('Failed to enhance description:', error);
            throw error;
        }
    }

    // ==================== UTILITY METHODS ====================
    
    calculateCompletionScore(profile) {
        let score = 0;
        if (profile.personalInfo && Object.keys(profile.personalInfo).length > 0) score += 25;
        if (profile.skills && profile.skills.length > 0) score += 25;
        if (profile.experience && profile.experience.length > 0) score += 25;
        if (profile.projects && profile.projects.length > 0) score += 25;
        return score;
    }

    addListener(callback) {
        this.listeners.push(callback);
    }

    removeListener(callback) {
        this.listeners = this.listeners.filter(l => l !== callback);
    }

    notifyListeners() {
        this.listeners.forEach(callback => callback(this.profile));
    }
}

export default new ProfileService();
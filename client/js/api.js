// API Service for TalentAI

const API_BASE_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:5000/api' 
    : 'https://talentai-hpa6.onrender.com/api';

class TalentAIAPI {
    constructor() {
        this.token = localStorage.getItem('authToken');
    }

    setToken(token) {
        this.token = token;
        if (token) {
            localStorage.setItem('authToken', token);
        } else {
            localStorage.removeItem('authToken');
        }
    }

    async request(endpoint, options = {}) {
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };

        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        try {
            const response = await fetch(`${API_BASE_URL}${endpoint}`, {
                ...options,
                headers
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || data.message || 'Something went wrong');
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // ==================== AUTH ENDPOINTS ====================
    
    async signup(email, password, name, role = 'candidate') {
        const data = await this.request('/auth/signup', {
            method: 'POST',
            body: JSON.stringify({ email, password, name, role })
        });
        if (data.token) {
            this.setToken(data.token);
        }
        return data;
    }

    async login(email, password) {
        const data = await this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
        if (data.token) {
            this.setToken(data.token);
        }
        return data;
    }

    async logout() {
        this.setToken(null);
        localStorage.removeItem('user');
        window.location.href = '/';
    }

    async getCurrentUser() {
        return this.request('/auth/me');
    }

    // ==================== PROFILE ENDPOINTS ====================
    
    async getProfile() {
        return this.request('/profile');
    }

    async updateProfile(profileData) {
        return this.request('/profile', {
            method: 'PUT',
            body: JSON.stringify(profileData)
        });
    }

    async getPublicProfile(profileId) {
        return this.request(`/profile/public/${profileId}`);
    }

    // ==================== AI ENDPOINTS - FULLY IMPLEMENTED ====================
    
    /**
     * Generate AI professional summary based on profile data
     * POST /api/profile/generate-summary
     */
    async generateSummary() {
        try {
            console.log('🤖 API: Requesting AI summary generation...');
            const response = await this.request('/profile/generate-summary', {
                method: 'POST'
            });
            console.log('✅ API: Summary generated successfully');
            return response;
        } catch (error) {
            console.error('❌ API: Summary generation failed:', error);
            throw error;
        }
    }

    /**
     * Generate AI project description
     * POST /api/profile/generate-project
     * @param {string} title - Project title
     * @param {string} techStack - Technologies used
     * @param {string} userInput - User's description of the project
     */
    async generateProjectDescription(title, techStack, userInput) {
        try {
            console.log('🤖 API: Requesting project description generation...');
            const response = await this.request('/profile/generate-project', {
                method: 'POST',
                body: JSON.stringify({ title, techStack, userInput })
            });
            console.log('✅ API: Project description generated successfully');
            return response;
        } catch (error) {
            console.error('❌ API: Project description generation failed:', error);
            throw error;
        }
    }

    /**
     * Get AI skill suggestions based on experience and projects
     * POST /api/profile/suggest-skills
     */
    async getSkillSuggestions() {
        try {
            console.log('🤖 API: Requesting skill suggestions...');
            const response = await this.request('/profile/suggest-skills', {
                method: 'POST'
            });
            console.log('✅ API: Skill suggestions received:', response.suggestions);
            return response;
        } catch (error) {
            console.error('❌ API: Skill suggestions failed:', error);
            throw error;
        }
    }

    /**
     * Enhance existing description with AI
     * POST /api/profile/enhance-description
     * @param {string} description - Original description to enhance
     * @param {string} context - Optional context about the role/project
     */
    async enhanceDescription(description, context = '') {
        try {
            console.log('🤖 API: Requesting description enhancement...');
            const response = await this.request('/profile/enhance-description', {
                method: 'POST',
                body: JSON.stringify({ description, context })
            });
            console.log('✅ API: Description enhanced successfully');
            return response;
        } catch (error) {
            console.error('❌ API: Description enhancement failed:', error);
            throw error;
        }
    }

    // ==================== RESUME ENDPOINTS ====================
    
    async downloadResume() {
        try {
            const response = await fetch(`${API_BASE_URL}/resume/download`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.token}`
                }
            });
            
            if (!response.ok) throw new Error('Failed to download resume');
            
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `resume.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
            return { success: true };
        } catch (error) {
            console.error('❌ Resume download failed:', error);
            return { success: false, error: error.message };
        }
    }

    async getTextResume() {
        return this.request('/resume/generate-text', {
            method: 'POST'
        });
    }

    // ==================== ANALYTICS ENDPOINTS ====================
    
    async getAnalytics() {
        return this.request('/analytics');
    }

    async trackProfileView(profileId) {
        return this.request(`/analytics/view/${profileId}`, {
            method: 'POST'
        });
    }

    async trackResumeDownload(profileId) {
        return this.request(`/analytics/download/${profileId}`, {
            method: 'POST'
        });
    }
}

export default new TalentAIAPI();

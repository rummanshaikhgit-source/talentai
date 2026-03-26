// Authentication Service

import API from './api.js';

class AuthService {
    constructor() {
        this.user = null;
        this.listeners = [];
        this.loadUserFromStorage();
    }

    loadUserFromStorage() {
        const userStr = localStorage.getItem('user');
        if (userStr) {
            try {
                this.user = JSON.parse(userStr);
            } catch (e) {
                console.error('Failed to parse user from storage');
            }
        }
    }

    async login(email, password) {
        try {
            const data = await API.login(email, password);
            this.user = data.user;
            localStorage.setItem('user', JSON.stringify(data.user));
            this.notifyListeners();
            return { success: true, user: data.user };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async signup(email, password, name, role = 'candidate') {
        try {
            const data = await API.signup(email, password, name, role);
            this.user = data.user;
            localStorage.setItem('user', JSON.stringify(data.user));
            this.notifyListeners();
            return { success: true, user: data.user };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }

    async logout() {
        await API.logout();
        this.user = null;
        localStorage.removeItem('user');
        this.notifyListeners();
        window.location.href = '/';
    }

    isAuthenticated() {
        return !!API.token;
    }

    getUser() {
        return this.user;
    }

    addListener(callback) {
        this.listeners.push(callback);
    }

    removeListener(callback) {
        this.listeners = this.listeners.filter(l => l !== callback);
    }

    notifyListeners() {
        this.listeners.forEach(callback => callback(this.user));
    }
}

export default new AuthService();
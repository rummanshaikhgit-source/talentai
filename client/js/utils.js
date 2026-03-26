// Utility Functions

class Utils {
    // Show toast notification
    static showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `fixed bottom-4 right-4 z-50 px-6 py-3 rounded-xl text-white font-medium shadow-lg transition-all toast-slide`;
        
        const colors = {
            success: 'bg-gradient-to-r from-green-500 to-emerald-500',
            error: 'bg-gradient-to-r from-red-500 to-pink-500',
            info: 'bg-gradient-to-r from-blue-500 to-indigo-500',
            warning: 'bg-gradient-to-r from-yellow-500 to-orange-500'
        };
        
        toast.className += ` ${colors[type] || colors.info}`;
        toast.innerHTML = `
            <div class="flex items-center gap-2">
                <i data-lucide="${type === 'success' ? 'check-circle' : type === 'error' ? 'alert-circle' : 'info'}" size="18"></i>
                <span>${message}</span>
            </div>
        `;
        document.body.appendChild(toast);
        
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Show loading spinner
    static showLoading(elementId, message = 'Loading...') {
        const element = document.getElementById(elementId);
        if (element) {
            const originalContent = element.innerHTML;
            element.setAttribute('data-original', originalContent);
            element.innerHTML = `
                <div class="flex items-center justify-center gap-2">
                    <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>${message}</span>
                </div>
            `;
            element.disabled = true;
        }
    }

    // Hide loading spinner
    static hideLoading(elementId) {
        const element = document.getElementById(elementId);
        if (element && element.hasAttribute('data-original')) {
            element.innerHTML = element.getAttribute('data-original');
            element.removeAttribute('data-original');
            element.disabled = false;
        }
    }

    // Format date
    static formatDate(date) {
        if (!date) return '';
        const d = new Date(date);
        return d.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    // Format date with time
    static formatDateTime(date) {
        if (!date) return '';
        const d = new Date(date);
        return d.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    // Generate random ID
    static generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Debounce function
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Throttle function
    static throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Copy to clipboard
    static async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            this.showToast('Copied to clipboard!', 'success');
            return true;
        } catch (err) {
            this.showToast('Failed to copy', 'error');
            return false;
        }
    }

    // Download file
    static downloadFile(content, fileName, type = 'text/plain') {
        const blob = new Blob([content], { type });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Validate email
    static isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Validate phone (simple)
    static isValidPhone(phone) {
        const re = /^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/;
        return re.test(phone);
    }

    // Get initial from name
    static getInitial(name) {
        if (!name) return '?';
        return name.charAt(0).toUpperCase();
    }

    // Truncate text
    static truncate(text, length = 100) {
        if (!text) return '';
        if (text.length <= length) return text;
        return text.substring(0, length) + '...';
    }

    // Create confetti effect
    static createConfetti() {
        for (let i = 0; i < 100; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.position = 'fixed';
                confetti.style.width = Math.random() * 8 + 4 + 'px';
                confetti.style.height = confetti.style.width;
                confetti.style.background = `hsl(${Math.random() * 360}, 70%, 50%)`;
                confetti.style.left = Math.random() * window.innerWidth + 'px';
                confetti.style.top = '-10px';
                confetti.style.borderRadius = '50%';
                confetti.style.pointerEvents = 'none';
                confetti.style.zIndex = '9999';
                confetti.style.animation = 'fall 3s linear forwards';
                document.body.appendChild(confetti);
                
                const style = document.createElement('style');
                style.textContent = `
                    @keyframes fall {
                        to {
                            transform: translateY(100vh) rotate(360deg);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(style);
                
                setTimeout(() => confetti.remove(), 3000);
            }, i * 30);
        }
    }

    // Scroll to element
    static scrollToElement(elementId, offset = 80) {
        const element = document.getElementById(elementId);
        if (element) {
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    }

    // Format text with emojis
    static addEmojis(text) {
        const emojiMap = {
            'achievement': '🏆',
            'success': '✨',
            'team': '👥',
            'leader': '👑',
            'improved': '📈',
            'reduced': '⬇️',
            'increased': '⬆️',
            'developed': '💻',
            'designed': '🎨',
            'built': '🔨'
        };
        
        let result = text;
        for (const [key, emoji] of Object.entries(emojiMap)) {
            const regex = new RegExp(`\\b${key}\\b`, 'gi');
            result = result.replace(regex, `${emoji} ${key}`);
        }
        return result;
    }
}

export default Utils;
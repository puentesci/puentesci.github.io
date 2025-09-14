// Event Handling Module

class EventHandlerManager {
    constructor(app) {
        this.app = app;
        this.boundHandlers = new Map();
    }

    initialize() {
        this.setupGlobalEventListeners();
    }

    setupGlobalEventListeners() {
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.handlePageHidden();
            } else {
                this.handlePageVisible();
            }
        });

        window.addEventListener('online', () => this.handleOnlineStatus(true));
        window.addEventListener('offline', () => this.handleOnlineStatus(false));

        const debouncedResize = debounce(() => {
            this.handleWindowResize();
        }, 250);
        window.addEventListener('resize', debouncedResize);
        this.boundHandlers.set('resize', debouncedResize);

        const throttledScroll = throttle(() => {
            this.handleScroll();
        }, 16);
        window.addEventListener('scroll', throttledScroll);
        this.boundHandlers.set('scroll', throttledScroll);

        document.addEventListener('keydown', (e) => {
            this.handleKeyboardNavigation(e);
        });
    }

    handlePageHidden() {
        if (window.animationController) {
            window.animationController.pauseAllAnimations();
        }
    }

    handlePageVisible() {
        if (window.animationController) {
            window.animationController.resumeAllAnimations();
        }
    }

    handleOnlineStatus(isOnline) {
        const message = isOnline ? 
            'Connection restored' : 
            'You are currently offline. Some features may not work.';
        
        this.showNotification(message, isOnline ? 'success' : 'warning');
        
        if (this.app.accessibilityManager) {
            this.app.accessibilityManager.announceToScreenReader(message);
        }
    }

    handleWindowResize() {
        const deviceType = getDeviceType();
        document.body.setAttribute('data-device', deviceType);
        
        dispatchCustomEvent('deviceTypeChange', { deviceType });
    }

    handleScroll() {
        const scrollPercentage = getScrollPercentage();
        
        const progressIndicator = document.querySelector('.scroll-progress');
        if (progressIndicator) {
            progressIndicator.style.width = `${scrollPercentage}%`;
        }
    }

    handleKeyboardNavigation(e) {
        if (e.key === 'Escape') {
            if (this.app.accessibilityManager) {
                this.app.accessibilityManager.handleEscapeKey();
            }
        }

        if (e.key === 'Enter' && e.target.matches('[role="button"]')) {
            e.target.click();
        }
    }

    showNotification(message, type = 'info', duration = 5000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 0.5rem;
            color: white;
            font-weight: 500;
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
            max-width: 300px;
            box-shadow: var(--shadow-lg);
        `;

        const colors = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#3b82f6'
        };
        notification.style.background = colors[type] || colors.info;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, duration);
    }

    destroy() {
        this.boundHandlers.forEach((handler, event) => {
            window.removeEventListener(event, handler);
        });
        this.boundHandlers.clear();
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = EventHandlerManager;
}
// Main Application JavaScript

class PuenteScientificApp {
    constructor() {
        this.isInitialized = false;
        this.components = {};
        this.config = {
            animationDuration: 600,
            scrollOffset: 80,
            breakpoints: {
                mobile: 768,
                tablet: 1024,
                desktop: 1280
            }
        };
        
        this.init();
    }

    async init() {
        try {
            // Wait for DOM to be fully loaded
            if (document.readyState === 'loading') {
                await new Promise(resolve => {
                    document.addEventListener('DOMContentLoaded', resolve);
                });
            }

            // Initialize core functionality
            this.setupGlobalEventListeners();
            this.initializePerformanceOptimizations();
            this.setupAccessibility();
            this.initializeAnalytics();
            
            // Mark as initialized
            this.isInitialized = true;
            
            // Dispatch app ready event
            dispatchCustomEvent('appReady', { app: this });
            
            console.log('🚀 Puente Scientific website initialized successfully');
            
        } catch (error) {
            console.error('❌ Error initializing Puente Scientific app:', error);
        }
    }

    setupGlobalEventListeners() {
        // Handle page visibility changes
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.handlePageHidden();
            } else {
                this.handlePageVisible();
            }
        });

        // Handle online/offline status
        window.addEventListener('online', () => this.handleOnlineStatus(true));
        window.addEventListener('offline', () => this.handleOnlineStatus(false));

        // Handle window resize with debouncing
        window.addEventListener('resize', debounce(() => {
            this.handleWindowResize();
        }, 250));

        // Handle scroll events
        window.addEventListener('scroll', throttle(() => {
            this.handleScroll();
        }, 16));

        // Handle keyboard navigation
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardNavigation(e);
        });

        // Handle form submissions globally
        document.addEventListener('submit', (e) => {
            this.handleFormSubmission(e);
        });

        // Handle clicks for analytics
        document.addEventListener('click', (e) => {
            this.handleClickTracking(e);
        });
    }

    initializePerformanceOptimizations() {
        // Lazy load images
        lazyLoadImages('img[data-src]');

        // Preload critical resources
        this.preloadCriticalResources();

        // Setup service worker for caching (if supported)
        this.setupServiceWorker();

        // Optimize font loading
        this.optimizeFontLoading();
    }

    preloadCriticalResources() {
        const criticalResources = [
            '/assets/css/main.css',
            '/assets/js/animations.js',
            '/assets/images/logo.png'
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource;
            
            if (resource.endsWith('.css')) {
                link.as = 'style';
            } else if (resource.endsWith('.js')) {
                link.as = 'script';
            } else if (resource.match(/\.(png|jpg|jpeg|webp)$/)) {
                link.as = 'image';
            }
            
            document.head.appendChild(link);
        });
    }

    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('✅ Service Worker registered:', registration);
                })
                .catch(error => {
                    console.log('❌ Service Worker registration failed:', error);
                });
        }
    }

    optimizeFontLoading() {
        // Use font-display: swap for better performance
        const fontLinks = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
        fontLinks.forEach(link => {
            link.href += '&display=swap';
        });
    }

    setupAccessibility() {
        // Add skip link for keyboard navigation
        this.addSkipLink();

        // Enhance focus management
        this.setupFocusManagement();

        // Add ARIA live regions for dynamic content
        this.setupLiveRegions();

        // Handle reduced motion preferences
        this.handleReducedMotion();
    }

    addSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--primary-teal);
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 10000;
            transition: top 0.3s;
        `;

        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });

        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });

        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    setupFocusManagement() {
        // Track focus for better keyboard navigation
        let focusedElement = null;

        document.addEventListener('focusin', (e) => {
            focusedElement = e.target;
        });

        // Trap focus in modals (if any)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                this.handleTabNavigation(e);
            }
        });
    }

    setupLiveRegions() {
        // Create live region for announcements
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.id = 'live-region';
        document.body.appendChild(liveRegion);

        this.liveRegion = liveRegion;
    }

    announceToScreenReader(message) {
        if (this.liveRegion) {
            this.liveRegion.textContent = message;
            
            // Clear after announcement
            setTimeout(() => {
                this.liveRegion.textContent = '';
            }, 1000);
        }
    }

    handleReducedMotion() {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        const handleMotionPreference = (e) => {
            if (e.matches) {
                document.body.classList.add('reduced-motion');
                this.announceToScreenReader('Animations have been reduced for better accessibility');
            } else {
                document.body.classList.remove('reduced-motion');
            }
        };

        mediaQuery.addEventListener('change', handleMotionPreference);
        handleMotionPreference(mediaQuery);
    }

    initializeAnalytics() {
        // Google Analytics setup
        this.analytics = {
            pageViews: 0,
            interactions: 0,
            timeOnPage: Date.now(),
            trackingId: 'G-XV96WERESM'
        };

        // Wait for gtag to be available
        this.waitForGtag().then(() => {
            // Track initial page view
            this.trackEvent('page_view', {
                page_title: document.title,
                page_location: window.location.href,
                page_path: window.location.pathname
            });

            // Track user engagement
            this.setupEngagementTracking();
        });
    }

    waitForGtag() {
        return new Promise((resolve) => {
            if (typeof gtag !== 'undefined') {
                resolve();
            } else {
                // Wait for gtag to load
                const checkGtag = setInterval(() => {
                    if (typeof gtag !== 'undefined') {
                        clearInterval(checkGtag);
                        resolve();
                    }
                }, 100);
            }
        });
    }

    setupEngagementTracking() {
        // Track scroll depth
        let maxScrollDepth = 0;
        const trackScrollDepth = throttle(() => {
            const scrollDepth = Math.round(getScrollPercentage());
            if (scrollDepth > maxScrollDepth) {
                maxScrollDepth = scrollDepth;
                
                // Track milestone scroll depths
                if (scrollDepth >= 25 && scrollDepth < 50 && !this.scrollMilestones?.quarter) {
                    this.trackEvent('scroll', { scroll_depth: 25 });
                    this.scrollMilestones = { ...this.scrollMilestones, quarter: true };
                } else if (scrollDepth >= 50 && scrollDepth < 75 && !this.scrollMilestones?.half) {
                    this.trackEvent('scroll', { scroll_depth: 50 });
                    this.scrollMilestones = { ...this.scrollMilestones, half: true };
                } else if (scrollDepth >= 75 && scrollDepth < 90 && !this.scrollMilestones?.threeQuarter) {
                    this.trackEvent('scroll', { scroll_depth: 75 });
                    this.scrollMilestones = { ...this.scrollMilestones, threeQuarter: true };
                } else if (scrollDepth >= 90 && !this.scrollMilestones?.complete) {
                    this.trackEvent('scroll', { scroll_depth: 90 });
                    this.scrollMilestones = { ...this.scrollMilestones, complete: true };
                }
            }
        }, 1000);

        window.addEventListener('scroll', trackScrollDepth);

        // Track time on page milestones
        setTimeout(() => this.trackEvent('engagement', { time_on_page: 30 }), 30000);
        setTimeout(() => this.trackEvent('engagement', { time_on_page: 60 }), 60000);
        setTimeout(() => this.trackEvent('engagement', { time_on_page: 120 }), 120000);
    }

    trackEvent(eventName, data = {}) {
        // Log for debugging (remove in production if desired)
        console.log('📊 Analytics Event:', eventName, data);
        
        // Send to Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, {
                ...data,
                // Add custom parameters
                custom_map: {
                    'dimension1': 'puente_scientific_website'
                }
            });
        }
        
        // Update internal analytics counter
        this.analytics.interactions++;
    }

    handlePageHidden() {
        // Pause animations and reduce activity when page is hidden
        if (animationController) {
            animationController.pauseAllAnimations();
        }
    }

    handlePageVisible() {
        // Resume animations when page becomes visible
        if (animationController) {
            animationController.resumeAllAnimations();
        }
    }

    handleOnlineStatus(isOnline) {
        const message = isOnline ? 
            'Connection restored' : 
            'You are currently offline. Some features may not work.';
        
        this.showNotification(message, isOnline ? 'success' : 'warning');
        this.announceToScreenReader(message);
    }

    handleWindowResize() {
        const deviceType = getDeviceType();
        document.body.setAttribute('data-device', deviceType);
        
        // Dispatch resize event with device info
        dispatchCustomEvent('deviceTypeChange', { deviceType });
    }

    handleScroll() {
        const scrollPercentage = getScrollPercentage();
        
        // Update scroll progress indicator if it exists
        const progressIndicator = document.querySelector('.scroll-progress');
        if (progressIndicator) {
            progressIndicator.style.width = `${scrollPercentage}%`;
        }

        // Scroll tracking is now handled in setupEngagementTracking()
    }

    handleKeyboardNavigation(e) {
        // Handle escape key globally
        if (e.key === 'Escape') {
            this.handleEscapeKey();
        }

        // Handle enter key on interactive elements
        if (e.key === 'Enter' && e.target.matches('[role="button"]')) {
            e.target.click();
        }
    }

    handleTabNavigation(e) {
        // Enhanced tab navigation for better accessibility
        const focusableElements = document.querySelectorAll(`
            a[href], button, input, textarea, select, details,
            [tabindex]:not([tabindex="-1"])
        `);

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }

    handleEscapeKey() {
        // Close any open modals, menus, etc.
        const openElements = document.querySelectorAll('.active, .open, [aria-expanded="true"]');
        openElements.forEach(element => {
            if (element.classList.contains('nav-menu')) {
                // Close mobile menu
                const navComponent = this.components.navigation;
                if (navComponent) {
                    navComponent.closeMobileMenu();
                }
            }
        });
    }

    handleFormSubmission(e) {
        // Global form submission handling
        const form = e.target;
        if (form.tagName === 'FORM') {
            // Get form data for analytics (without sensitive info)
            const formData = new FormData(form);
            const hasName = formData.has('name');
            const hasEmail = formData.has('email');
            const hasCompany = formData.has('company');
            const hasMessage = formData.has('message');
            
            this.trackEvent('form_submit', {
                form_id: form.id || 'contact_form',
                form_name: form.name || 'contact',
                has_name: hasName,
                has_email: hasEmail,
                has_company: hasCompany,
                has_message: hasMessage,
                field_count: formData.keys().length
            });
        }
    }

    handleClickTracking(e) {
        const element = e.target;
        
        // Track button clicks
        if (element.matches('button, .btn')) {
            const buttonText = element.textContent.trim();
            this.trackEvent('click', {
                event_category: 'button',
                event_label: buttonText,
                button_text: buttonText,
                button_class: element.className,
                button_type: element.type || 'button'
            });
        }

        // Track navigation link clicks
        if (element.matches('.nav-link')) {
            this.trackEvent('click', {
                event_category: 'navigation',
                event_label: element.textContent.trim(),
                link_text: element.textContent.trim(),
                link_href: element.href
            });
        }

        // Track external link clicks
        if (element.matches('a[href]') && !element.href.startsWith(window.location.origin)) {
            this.trackEvent('click', {
                event_category: 'outbound_link',
                event_label: element.href,
                link_text: element.textContent.trim(),
                link_url: element.href
            });
        }

        // Track service card clicks
        if (element.closest('.service-card')) {
            const serviceCard = element.closest('.service-card');
            const serviceTitle = serviceCard.querySelector('h3')?.textContent || 'Unknown Service';
            this.trackEvent('click', {
                event_category: 'service',
                event_label: serviceTitle,
                service_name: serviceTitle
            });
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

        // Set background color based on type
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#3b82f6'
        };
        notification.style.background = colors[type] || colors.info;

        document.body.appendChild(notification);

        // Auto-remove notification
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, duration);
    }

    // Public API methods
    getConfig() {
        return { ...this.config };
    }

    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
    }

    getAnalytics() {
        return {
            ...this.analytics,
            timeOnPage: Date.now() - this.analytics.timeOnPage
        };
    }

    destroy() {
        // Cleanup method for SPA navigation
        Object.values(this.components).forEach(component => {
            if (component.destroy) {
                component.destroy();
            }
        });
    }
}

// Initialize the application
let app;

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        app = new PuenteScientificApp();
    });
} else {
    app = new PuenteScientificApp();
}

// Make app globally available for debugging
window.PuenteScientificApp = app;

// Handle page unload
window.addEventListener('beforeunload', () => {
    if (app) {
        const analytics = app.getAnalytics();
        const sessionDuration = Math.round((Date.now() - analytics.timeOnPage) / 1000);
        
        app.trackEvent('session_end', {
            session_duration: sessionDuration,
            total_interactions: analytics.interactions,
            page_path: window.location.pathname
        });
    }
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PuenteScientificApp;
}

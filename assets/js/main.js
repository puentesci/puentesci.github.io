// Main Application JavaScript
// Import required modules (ensure these are loaded before main.js in HTML)

const THEME_STORAGE_KEY = 'theme';

function createFallbackConfig() {
    return {
        getAll: () => ({}),
        update: () => {},
        get: () => undefined,
        set: () => {},
        reset: () => {}
    };
}

class PuenteScientificApp {
    constructor() {
        this.isInitialized = false;
        this.components = {};
        this.currentTheme = null;
        
        // Initialize configuration
        const hasAppConfig = typeof AppConfig !== 'undefined';
        this.appConfig = hasAppConfig ? new AppConfig() : createFallbackConfig();
        this.config = typeof this.appConfig.getAll === 'function' ? this.appConfig.getAll() : {};
        
        // Initialize modules
        this.performanceManager = typeof PerformanceManager !== 'undefined' ? new PerformanceManager(this.config.performance) : null;
        this.accessibilityManager = typeof AccessibilityManager !== 'undefined' ? new AccessibilityManager() : null;
        this.analyticsManager = typeof AnalyticsManager !== 'undefined' ? new AnalyticsManager(this.config.analytics) : null;
        this.eventHandlerManager = typeof EventHandlerManager !== 'undefined' ? new EventHandlerManager(this) : null;
        
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

            // Initialize modules
            if (this.performanceManager?.initialize) {
                this.performanceManager.initialize();
            }

            if (this.accessibilityManager?.initialize) {
                this.accessibilityManager.initialize();
            }

            if (this.eventHandlerManager?.initialize) {
                this.eventHandlerManager.initialize();
            }

            this.initializeThemeToggle();
            
            // Initialize analytics in parallel (non-blocking)
            if (this.analyticsManager?.initialize) {
                this.analyticsManager.initialize().catch(error => {
                    console.warn('Analytics initialization failed, continuing without analytics:', error);
                });
            }
            
            // Mark as initialized
            this.isInitialized = true;
            
            // Dispatch app ready event
            dispatchCustomEvent('appReady', { app: this });
            
            console.log('🚀 Puente Scientific website initialized successfully');
            
        } catch (error) {
            console.error('❌ Error initializing Puente Scientific app:', error);
        }
    }

    // Event listeners are now handled by EventHandlerManager

    // Performance optimizations are now handled by PerformanceManager

    // Accessibility features are now handled by AccessibilityManager

    // Analytics tracking is now handled by AnalyticsManager

    // Event handling methods are now in EventHandlerManager
    
    showNotification(message, type = 'info', duration = 5000) {
        if (this.eventHandlerManager) {
            this.eventHandlerManager.showNotification(message, type, duration);
        }
    }

    // Public API methods
    getConfig() {
        return typeof this.appConfig?.getAll === 'function' ? this.appConfig.getAll() : {};
    }

    updateConfig(newConfig) {
        if (typeof this.appConfig?.update === 'function') {
            this.appConfig.update(newConfig);
        }
        this.config = this.getConfig();
    }

    getAnalytics() {
        return this.analyticsManager ? this.analyticsManager.getAnalytics() : null;
    }

    destroy() {
        // Cleanup method for SPA navigation
        Object.values(this.components).forEach(component => {
            if (component.destroy) {
                component.destroy();
            }
        });
        
        // Cleanup modules
        if (this.eventHandlerManager?.destroy) {
            this.eventHandlerManager.destroy();
        }
    }

    initializeThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) return;

        // Get saved theme or default to system preference
        const savedTheme = safeStorageGet(THEME_STORAGE_KEY);
        const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const systemPrefersDark = colorSchemeQuery.matches;
        const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
        
        // Apply initial theme
        this.setTheme(initialTheme);
        themeToggle.setAttribute('aria-pressed', initialTheme === 'dark');

        // Add click event listener
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            this.setTheme(newTheme);
            
            // Save preference
            safeStorageSet(THEME_STORAGE_KEY, newTheme);
            themeToggle.setAttribute('aria-pressed', newTheme === 'dark');
            dispatchCustomEvent('themeChange', {
                theme: newTheme,
                previousTheme: currentTheme
            });
            
            // Track theme change
            if (this.analyticsManager) {
                this.analyticsManager.trackEvent('theme_change', {
                    theme: newTheme,
                    previous_theme: currentTheme
                });
            }
        });

        // Listen for system theme changes
        const handleSystemThemeChange = (event) => {
            if (!safeStorageGet(THEME_STORAGE_KEY)) {
                const updatedTheme = event.matches ? 'dark' : 'light';
                this.setTheme(updatedTheme);
                themeToggle.setAttribute('aria-pressed', updatedTheme === 'dark');
            }
        };

        if (typeof colorSchemeQuery.addEventListener === 'function') {
            colorSchemeQuery.addEventListener('change', handleSystemThemeChange);
        } else if (typeof colorSchemeQuery.addListener === 'function') {
            colorSchemeQuery.addListener(handleSystemThemeChange);
        }
    }

    setTheme(theme) {
        if (this.currentTheme === theme) {
            return;
        }

        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        if (document.body) {
            document.body.setAttribute('data-theme', theme);
        }
        document.documentElement.style.colorScheme = theme === 'dark' ? 'dark' : 'light';
        
        // Update meta theme-color for mobile browsers
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', theme === 'dark' ? '#0F172A' : '#FFFFFF');
        }
    }
}

// Initialize the application
let app;

const initializeApp = () => {
    app = new PuenteScientificApp();
    window.PuenteScientificApp = app;
};

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Handle page unload
window.addEventListener('beforeunload', () => {
    if (app?.analyticsManager?.trackSessionEnd) {
        app.analyticsManager.trackSessionEnd();
    }
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PuenteScientificApp;
}

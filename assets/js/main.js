// Main Application JavaScript
// Import required modules (ensure these are loaded before main.js in HTML)

class PuenteScientificApp {
    constructor() {
        this.isInitialized = false;
        this.components = {};
        
        // Initialize configuration
        this.appConfig = new AppConfig();
        this.config = this.appConfig.getAll();
        
        // Initialize modules
        this.performanceManager = new PerformanceManager(this.config.performance);
        this.accessibilityManager = new AccessibilityManager();
        this.analyticsManager = new AnalyticsManager(this.config.analytics);
        this.eventHandlerManager = new EventHandlerManager(this);
        
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
            this.performanceManager.initialize();
            this.accessibilityManager.initialize();
            this.eventHandlerManager.initialize();
            
            // Initialize analytics in parallel (non-blocking)
            this.analyticsManager.initialize().catch(error => {
                console.warn('Analytics initialization failed, continuing without analytics:', error);
            });
            
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
        return this.appConfig.getAll();
    }

    updateConfig(newConfig) {
        this.appConfig.update(newConfig);
        this.config = this.appConfig.getAll();
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
        if (this.eventHandlerManager) {
            this.eventHandlerManager.destroy();
        }
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
    if (app && app.analyticsManager) {
        app.analyticsManager.trackSessionEnd();
    }
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PuenteScientificApp;
}

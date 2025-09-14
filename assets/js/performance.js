// Performance Optimization Module

class PerformanceManager {
    constructor(config = {}) {
        this.config = {
            criticalResources: [
                '/assets/css/main.css',
                '/assets/js/animations.js',
                '/assets/images/logo.png'
            ],
            ...config
        };
    }

    initialize() {
        this.setupLazyLoading();
        this.preloadCriticalResources();
        this.setupServiceWorker();
        this.optimizeFontLoading();
    }

    setupLazyLoading() {
        lazyLoadImages('img[data-src]');
    }

    preloadCriticalResources() {
        this.config.criticalResources.forEach(resource => {
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
        const fontLinks = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
        fontLinks.forEach(link => {
            if (!link.href.includes('display=swap')) {
                link.href += '&display=swap';
            }
        });
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = PerformanceManager;
}
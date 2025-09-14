// Application Configuration Module

class AppConfig {
    constructor() {
        this.config = {
            animationDuration: 600,
            scrollOffset: 80,
            breakpoints: {
                mobile: 768,
                tablet: 1024,
                desktop: 1280
            },
            analytics: {
                trackingId: 'G-XV96WERESM'
            },
            performance: {
                criticalResources: [
                    '/assets/css/main.css',
                    '/assets/js/animations.js',
                    '/assets/images/logo.png'
                ]
            },
            notifications: {
                defaultDuration: 5000,
                position: {
                    top: '20px',
                    right: '20px'
                }
            },
            accessibility: {
                skipLinkStyles: {
                    position: 'absolute',
                    top: '-40px',
                    left: '6px',
                    background: 'var(--primary-teal)',
                    color: 'white',
                    padding: '8px',
                    textDecoration: 'none',
                    borderRadius: '4px',
                    zIndex: '10000',
                    transition: 'top 0.3s'
                }
            },
            debounceDelays: {
                resize: 250,
                search: 300,
                scroll: 100
            },
            throttleLimits: {
                scroll: 16,
                resize: 100
            }
        };
    }

    get(path) {
        return path.split('.').reduce((obj, key) => obj?.[key], this.config);
    }

    set(path, value) {
        const keys = path.split('.');
        const lastKey = keys.pop();
        const target = keys.reduce((obj, key) => {
            if (!obj[key]) obj[key] = {};
            return obj[key];
        }, this.config);
        
        target[lastKey] = value;
    }

    update(newConfig) {
        this.config = this.deepMerge(this.config, newConfig);
    }

    deepMerge(target, source) {
        const result = { ...target };
        
        for (const key in source) {
            if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                result[key] = this.deepMerge(target[key] || {}, source[key]);
            } else {
                result[key] = source[key];
            }
        }
        
        return result;
    }

    getAll() {
        return { ...this.config };
    }

    reset() {
        this.config = new AppConfig().config;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = AppConfig;
}
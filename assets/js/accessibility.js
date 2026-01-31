// Accessibility Management Module

class AccessibilityManager {
    constructor() {
        this.liveRegion = null;
    }

    initialize() {
        this.addSkipLink();
        this.setupFocusManagement();
        this.setupLiveRegions();
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
        let focusedElement = null;

        document.addEventListener('focusin', (e) => {
            focusedElement = e.target;
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                this.handleTabNavigation(e);
            }
        });
    }

    handleTabNavigation(e) {
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

    setupLiveRegions() {
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

    handleEscapeKey() {
        const openElements = document.querySelectorAll('.active, .open, [aria-expanded="true"]');
        openElements.forEach(element => {
            if (element.classList.contains('nav-menu')) {
                const navComponent = this.components?.navigation;
                if (navComponent) {
                    navComponent.closeMobileMenu();
                }
            }
        });
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = AccessibilityManager;
}
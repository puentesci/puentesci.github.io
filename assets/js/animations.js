// Animation Controllers and Effects

class AnimationController {
    constructor() {
        this.observers = new Map();
        this.animations = new Map();
        this.isReducedMotion = prefersReducedMotion();
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupScrollAnimations();
        this.setupParticleSystem();
        this.setupCounterAnimations();
        
        // Listen for reduced motion changes
        window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
            this.isReducedMotion = e.matches;
            this.handleReducedMotionChange();
        });
    }

    setupIntersectionObserver() {
        const observerOptions = {
            root: null,
            rootMargin: '-10% 0px -10% 0px',
            threshold: [0, 0.25, 0.5, 0.75, 1]
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.isReducedMotion) {
                    this.triggerAnimation(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements with animation classes
        const animatedElements = document.querySelectorAll(`
            .fade-in-on-scroll,
            .slide-in-left-on-scroll,
            .slide-in-right-on-scroll,
            .scale-in-on-scroll,
            .service-card,
            .stat-item,
            .contact-item
        `);

        animatedElements.forEach(el => {
            observer.observe(el);
        });

        this.observers.set('intersection', observer);
    }

    triggerAnimation(element) {
        if (element.classList.contains('visible')) return;

        element.classList.add('visible');

        // Special handling for different element types
        if (element.classList.contains('stat-item')) {
            this.animateStatNumber(element);
        }

        if (element.classList.contains('service-card')) {
            this.animateServiceCard(element);
        }

        // Dispatch custom event
        dispatchCustomEvent('elementAnimated', { element }, element);
    }

    animateStatNumber(statItem) {
        const numberElement = statItem.querySelector('.stat-number');
        if (!numberElement || numberElement.dataset.animated) return;

        // Special handling for the 2025 year - don't count up, just show 2025 immediately
        if (numberElement.classList.contains('year-2025')) {
            numberElement.dataset.animated = 'true';
            numberElement.textContent = '2025';
            this.animateYear2025(numberElement);
            return;
        }

        // Regular counting animation for other stats
        const targetValue = parseInt(numberElement.dataset.count) || 0;
        const suffix = numberElement.textContent.replace(/\d/g, '');
        
        numberElement.dataset.animated = 'true';
        animateNumber(numberElement, targetValue, 2000, suffix);
    }

    animateServiceCard(card) {
        if (this.isReducedMotion) return;

        const icon = card.querySelector('.service-icon');
        if (icon) {
            icon.style.animation = 'pulse 0.6s ease-out';
            setTimeout(() => {
                icon.style.animation = '';
            }, 600);
        }
    }

    animateYear2025(yearElement) {
        if (this.isReducedMotion) return;

        // Start the wiggle animation immediately since we're not counting up
        setTimeout(() => {
            yearElement.classList.add('animate-year-wiggle');
        }, 500); // Small delay to let the element settle
    }

    setupScrollAnimations() {
        const navbar = document.getElementById('navbar');
        let lastScrollY = window.scrollY;

        const handleScroll = throttle(() => {
            const currentScrollY = window.scrollY;
            
            // Navbar scroll effect
            if (navbar) {
                if (currentScrollY > 100) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }

                // Hide/show navbar on scroll
                if (currentScrollY > lastScrollY && currentScrollY > 200) {
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    navbar.style.transform = 'translateY(0)';
                }
            }

            // Parallax effect for hero background
            this.updateParallax(currentScrollY);

            lastScrollY = currentScrollY;
        }, 16);

        window.addEventListener('scroll', handleScroll);
    }

    updateParallax(scrollY) {
        if (this.isReducedMotion) return;
        if (isTouchDevice() || window.innerWidth < 640) return;

        const heroParticles = document.querySelector('.hero-particles');
        const heroGrid = document.querySelector('.hero-grid');
        
        if (heroParticles) {
            const speed = scrollY * 0.5;
            heroParticles.style.transform = `translateY(${speed}px)`;
        }

        if (heroGrid) {
            const speed = scrollY * 0.3;
            heroGrid.style.transform = `translateY(${speed}px)`;
        }
    }

    setupParticleSystem() {
        if (this.isReducedMotion) return;

        const heroParticles = document.querySelector('.hero-particles');
        if (!heroParticles) return;

        this.createFloatingParticles(heroParticles);
    }

    createFloatingParticles(container) {
        const particleCount = isTouchDevice() ? 8 : 20;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 2}px;
                height: ${Math.random() * 4 + 2}px;
                background: rgba(45, 139, 139, ${Math.random() * 0.3 + 0.1});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: particleFloat ${Math.random() * 20 + 15}s linear infinite;
                animation-delay: ${Math.random() * 5}s;
                pointer-events: none;
            `;
            container.appendChild(particle);
        }
    }

    setupCounterAnimations() {
        // This will be triggered by the intersection observer
        // when stat items come into view
    }

    handleReducedMotionChange() {
        if (this.isReducedMotion) {
            // Disable all animations
            document.body.classList.add('reduced-motion');
            
            // Stop particle animations
            const particles = document.querySelectorAll('.floating-particle');
            particles.forEach(particle => {
                particle.style.animation = 'none';
            });
        } else {
            document.body.classList.remove('reduced-motion');
        }
    }

    // Public methods for manual animation control
    animateElement(element, animationType = 'fadeIn') {
        if (this.isReducedMotion) return;

        element.style.animation = `${animationType} 0.6s ease-out forwards`;
    }

    pauseAllAnimations() {
        document.body.style.animationPlayState = 'paused';
        document.querySelectorAll('*').forEach(el => {
            el.style.animationPlayState = 'paused';
        });
    }

    resumeAllAnimations() {
        document.body.style.animationPlayState = 'running';
        document.querySelectorAll('*').forEach(el => {
            el.style.animationPlayState = 'running';
        });
    }

    destroy() {
        // Clean up observers and event listeners
        this.observers.forEach(observer => observer.disconnect());
        this.observers.clear();
        
        // Remove event listeners
        window.removeEventListener('scroll', this.handleScroll);
    }
}

// Specific animation functions
class TypewriterEffect {
    constructor(element, text, speed = 50) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.currentIndex = 0;
    }

    start() {
        if (prefersReducedMotion()) {
            this.element.textContent = this.text;
            return Promise.resolve();
        }

        return new Promise((resolve) => {
            this.element.textContent = '';
            
            const typeInterval = setInterval(() => {
                if (this.currentIndex < this.text.length) {
                    this.element.textContent += this.text[this.currentIndex];
                    this.currentIndex++;
                } else {
                    clearInterval(typeInterval);
                    resolve();
                }
            }, this.speed);
        });
    }
}

class StaggeredAnimation {
    constructor(elements, animationClass = 'animate-slide-up', delay = 100) {
        this.elements = Array.from(elements);
        this.animationClass = animationClass;
        this.delay = delay;
    }

    start() {
        if (prefersReducedMotion()) {
            this.elements.forEach(el => el.classList.add('visible'));
            return Promise.resolve();
        }

        return new Promise((resolve) => {
            this.elements.forEach((element, index) => {
                setTimeout(() => {
                    element.classList.add(this.animationClass);
                    element.classList.add('visible');
                    
                    if (index === this.elements.length - 1) {
                        setTimeout(resolve, 600); // Wait for animation to complete
                    }
                }, index * this.delay);
            });
        });
    }
}

class LoadingAnimation {
    constructor() {
        this.loadingScreen = document.getElementById('loading-screen');
        this.progressBar = document.querySelector('.progress-bar');
        this.isComplete = false;
        try {
            this.skip = sessionStorage.getItem('ps_loader_shown') === '1';
        } catch (e) {
            this.skip = false;
        }
        this.loadingStartTime = performance.now();
        this.minLoadingTime = this.getMinLoadingTime();
        this.resourceProgress = {
            dom: 0,
            css: 0,
            js: 0,
            images: 0,
            fonts: 0,
            total: 0
        };
        this.resourceWeights = {
            dom: 20,
            css: 25,
            js: 25,
            images: 20,
            fonts: 10
        };
        this.networkInfo = this.getNetworkInfo();
    }

    getMinLoadingTime() {
        // Adjust minimum loading time based on network conditions and device type
        const isMobile = isTouchDevice() || window.innerWidth < 768;
        
        if (navigator.connection) {
            const connection = navigator.connection;
            if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
                return isMobile ? 800 : 600; // Much faster without logo
            } else if (connection.effectiveType === '3g') {
                return isMobile ? 600 : 400; // Much faster without logo
            }
        }
        return isMobile ? 500 : 300; // Very fast without logo
    }

    getNetworkInfo() {
        if (navigator.connection) {
            return {
                effectiveType: navigator.connection.effectiveType,
                downlink: navigator.connection.downlink,
                rtt: navigator.connection.rtt
            };
        }
        return null;
    }


    start() {
        if (!this.loadingScreen) return Promise.resolve();

        // Skip loader entirely if already shown this session
        if (this.skip) {
            this.loadingScreen.style.display = 'none';
            document.body.classList.add('loaded');
            this.animateHeroTitle();
            dispatchCustomEvent('pageLoaded');
            return Promise.resolve();
        }

        return new Promise((resolve) => {
            this.setupResourceTracking();
            this.updateProgress();
            
            // Ensure minimum loading time for smooth UX
            const minTimePromise = new Promise(resolveMin => {
                setTimeout(resolveMin, this.minLoadingTime);
            });
            
            // Wait for actual page load
            const actualLoadPromise = this.waitForPageLoad();
            
            // Resolve when both conditions are met (no logo waiting)
            Promise.all([minTimePromise, actualLoadPromise]).then(() => {
                this.complete();
                resolve();
            });
        });
    }


    setupResourceTracking() {
        // Track DOM loading
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.resourceProgress.dom = 100;
                this.updateProgress();
            });
        } else {
            this.resourceProgress.dom = 100;
        }

        // Track CSS loading
        this.trackStylesheets();

        // Track JavaScript loading
        this.trackScripts();

        // Track images loading
        this.trackImages();

        // Track fonts loading
        this.trackFonts();

        // Track overall page load
        if (document.readyState === 'loading') {
            window.addEventListener('load', () => {
                this.resourceProgress.total = 100;
                this.updateProgress();
            });
        } else {
            this.resourceProgress.total = 100;
        }
    }

    trackStylesheets() {
        const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
        let loadedStylesheets = 0;
        
        if (stylesheets.length === 0) {
            this.resourceProgress.css = 100;
            return;
        }

        stylesheets.forEach(link => {
            if (link.sheet) {
                loadedStylesheets++;
            } else {
                link.addEventListener('load', () => {
                    loadedStylesheets++;
                    this.resourceProgress.css = (loadedStylesheets / stylesheets.length) * 100;
                    this.updateProgress();
                });
                link.addEventListener('error', () => {
                    loadedStylesheets++;
                    this.resourceProgress.css = (loadedStylesheets / stylesheets.length) * 100;
                    this.updateProgress();
                });
            }
        });

        if (loadedStylesheets === stylesheets.length) {
            this.resourceProgress.css = 100;
        }
    }

    trackScripts() {
        const scripts = document.querySelectorAll('script[src]');
        let loadedScripts = 0;
        
        if (scripts.length === 0) {
            this.resourceProgress.js = 100;
            return;
        }

        scripts.forEach(script => {
            if (script.readyState === 'complete' || script.readyState === 'loaded') {
                loadedScripts++;
            } else {
                script.addEventListener('load', () => {
                    loadedScripts++;
                    this.resourceProgress.js = (loadedScripts / scripts.length) * 100;
                    this.updateProgress();
                });
                script.addEventListener('error', () => {
                    loadedScripts++;
                    this.resourceProgress.js = (loadedScripts / scripts.length) * 100;
                    this.updateProgress();
                });
            }
        });

        if (loadedScripts === scripts.length) {
            this.resourceProgress.js = 100;
        }
    }

    trackImages() {
        const images = document.querySelectorAll('img');
        let loadedImages = 0;
        
        if (images.length === 0) {
            this.resourceProgress.images = 100;
            return;
        }

        images.forEach(img => {
            if (img.complete && img.naturalHeight !== 0) {
                loadedImages++;
            } else {
                img.addEventListener('load', () => {
                    loadedImages++;
                    this.resourceProgress.images = (loadedImages / images.length) * 100;
                    this.updateProgress();
                });
                img.addEventListener('error', () => {
                    loadedImages++;
                    this.resourceProgress.images = (loadedImages / images.length) * 100;
                    this.updateProgress();
                });
            }
        });

        if (loadedImages === images.length) {
            this.resourceProgress.images = 100;
        }
    }

    trackFonts() {
        if ('fonts' in document) {
            document.fonts.ready.then(() => {
                this.resourceProgress.fonts = 100;
                this.updateProgress();
            });
        } else {
            // Fallback for browsers without Font Loading API
            setTimeout(() => {
                this.resourceProgress.fonts = 100;
                this.updateProgress();
            }, 1000);
        }
    }

    updateProgress() {
        const totalProgress = 
            (this.resourceProgress.dom * this.resourceWeights.dom / 100) +
            (this.resourceProgress.css * this.resourceWeights.css / 100) +
            (this.resourceProgress.js * this.resourceWeights.js / 100) +
            (this.resourceProgress.images * this.resourceWeights.images / 100) +
            (this.resourceProgress.fonts * this.resourceWeights.fonts / 100);

        if (this.progressBar) {
            const clamped = Math.min(totalProgress, 100);
            // Use transform for GPU-accelerated, layout-safe updates
            this.progressBar.style.transform = `scaleX(${clamped / 100})`;
            
            // Add a subtle pulse effect when progress is active
            if (clamped > 0 && clamped < 100) {
                this.progressBar.style.animation = 'progressPulse 1.5s ease-in-out infinite';
            } else {
                this.progressBar.style.animation = 'none';
            }
        }
    }


    waitForPageLoad() {
        return new Promise((resolve) => {
            if (document.readyState === 'complete') {
                resolve();
            } else {
                window.addEventListener('load', resolve);
            }
        });
    }


    complete() {
        if (this.isComplete || !this.loadingScreen) return;
        
        this.isComplete = true;
        this.loadingScreen.style.opacity = '0';
        
        setTimeout(() => {
            this.loadingScreen.style.display = 'none';
            document.body.classList.add('loaded');
            
            // Animate the hero title
            this.animateHeroTitle();
            
            // Trigger page loaded event
            dispatchCustomEvent('pageLoaded');

            // Mark loader as shown for this session
            try { sessionStorage.setItem('ps_loader_shown', '1'); } catch (e) {}
        }, 500);
    }

    animateHeroTitle() {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle && !prefersReducedMotion()) {
            // Skip default entrance if explicitly disabled (e.g., products holographic title)
            if (heroTitle.hasAttribute('data-disable-entrance')) {
                heroTitle.style.opacity = heroTitle.style.opacity || '0';
                heroTitle.style.transform = 'none';
                return;
            }
            // Add the animation class to trigger the slide-in effect
            heroTitle.classList.add('animate-title-slide');
        } else if (heroTitle) {
            // For reduced motion, just show the title immediately
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateX(0)';
        }
    }
}

// Mouse trail effect (optional enhancement)
class MouseTrail {
    constructor() {
        this.trail = [];
        this.maxTrailLength = 20;
        this.isActive = !isTouchDevice() && !prefersReducedMotion();
        
        if (this.isActive) {
            this.init();
        }
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.addTrailPoint(e.clientX, e.clientY);
        });

        this.animate();
    }

    addTrailPoint(x, y) {
        this.trail.push({ x, y, life: 1 });
        
        if (this.trail.length > this.maxTrailLength) {
            this.trail.shift();
        }
    }

    animate() {
        // Update trail points
        this.trail.forEach((point, index) => {
            point.life -= 0.05;
            if (point.life <= 0) {
                this.trail.splice(index, 1);
            }
        });

        // Render trail (if you want visual trail)
        this.renderTrail();

        requestAnimationFrame(() => this.animate());
    }

    renderTrail() {
        // Optional: Create visual mouse trail
        // Implementation depends on desired visual effect
    }
}

// Initialize animations when DOM is loaded
let animationController;
let loadingAnimation;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize loading animation
    loadingAnimation = new LoadingAnimation();
    
    // Start loading animation and then initialize other animations
    loadingAnimation.start().then(() => {
        animationController = new AnimationController();
        
        // Initialize mouse trail if desired
        if (!isTouchDevice()) {
            new MouseTrail();
        }
        
        // Initialize any typewriter effects
        const typewriterElements = document.querySelectorAll('[data-typewriter]');
        typewriterElements.forEach(element => {
            const text = element.dataset.typewriter || element.textContent;
            const speed = parseInt(element.dataset.speed) || 50;
            
            const typewriter = new TypewriterEffect(element, text, speed);
            
            // Start typewriter when element comes into view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        typewriter.start();
                        observer.unobserve(element);
                    }
                });
            });
            
            observer.observe(element);
        });
    });
    
    // Fallback animation trigger for mobile devices
    // This ensures the hero title animation works even if loading is skipped
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle && !heroTitle.classList.contains('animate-title-slide') && !prefersReducedMotion()) {
            if (!heroTitle.hasAttribute('data-disable-entrance')) {
                heroTitle.classList.add('animate-title-slide');
            }
        }
    }, 100);
    
    // Additional fallback for when page is fully loaded
    window.addEventListener('load', () => {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle && !heroTitle.classList.contains('animate-title-slide') && !prefersReducedMotion()) {
            if (!heroTitle.hasAttribute('data-disable-entrance')) {
                heroTitle.classList.add('animate-title-slide');
            }
        }
    });
});

// Clean up on page unload
window.addEventListener('beforeunload', () => {
    if (animationController) {
        animationController.destroy();
    }
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        AnimationController,
        TypewriterEffect,
        StaggeredAnimation,
        LoadingAnimation,
        MouseTrail
    };
}

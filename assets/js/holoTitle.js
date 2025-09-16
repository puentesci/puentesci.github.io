// Simple Holographic Title Animation
// Clean, simple animation without complex particle logic

(function() {
    const PAGE_CLASS = 'products-page';
    const FINAL_SELECTOR = '.holo-final-text';
    const ANIMATION_DURATION = 2000; // 2 seconds

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        // Only run on products page
        const pageRoot = document.querySelector('main.products-page') || document.querySelector('.products-page');
        const finalText = document.querySelector(FINAL_SELECTOR);
        
        if (!pageRoot || !finalText) return;
        
        if (prefersReducedMotion()) {
            finalText.style.opacity = '1';
            return;
        }

        // Ensure final text is not visible initially and perfectly centered
        finalText.style.opacity = '0';
        finalText.style.transform = 'translate(-50%, -50%) scale(0.8)';
        finalText.style.filter = 'blur(10px)';
        finalText.style.position = 'absolute';
        finalText.style.top = '50%';
        finalText.style.left = '50%';

        // Start the simple animation
        startSimpleAnimation(finalText);
    }

    function startSimpleAnimation(element) {
        // Simple fade-in and scale animation
        setTimeout(() => {
            element.style.transition = 'opacity 1000ms ease, transform 1000ms ease, filter 1000ms ease';
            element.style.opacity = '1';
            element.style.transform = 'translate(-50%, -50%) scale(1)';
            element.style.filter = 'blur(0px)';
            
            // Add subtle floating animation
            setTimeout(() => {
                element.style.animation = 'floatSlow 6s ease-in-out infinite';
            }, 1000);
        }, 500); // Small delay before animation starts
    }

    // Reduced motion detection
    function prefersReducedMotion() {
        try {
            if (typeof window.prefersReducedMotion === 'function') {
                return window.prefersReducedMotion();
            }
        } catch (_) {}
        return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
})();
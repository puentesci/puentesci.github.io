// Utility Functions

/**
 * Debounce function to limit the rate at which a function can fire
 * @param {Function} func - The function to debounce
 * @param {number} wait - The number of milliseconds to delay
 * @param {boolean} immediate - Whether to execute immediately
 * @returns {Function} The debounced function
 */
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

/**
 * Throttle function to limit the rate at which a function can fire
 * @param {Function} func - The function to throttle
 * @param {number} limit - The number of milliseconds to wait
 * @returns {Function} The throttled function
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Check if an element is in the viewport
 * @param {Element} element - The element to check
 * @param {number} threshold - The threshold percentage (0-1)
 * @returns {boolean} Whether the element is in viewport
 */
function isInViewport(element, threshold = 0.1) {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    
    const vertInView = (rect.top <= windowHeight * (1 - threshold)) && 
                      ((rect.top + rect.height) >= windowHeight * threshold);
    const horInView = (rect.left <= windowWidth * (1 - threshold)) && 
                     ((rect.left + rect.width) >= windowWidth * threshold);
    
    return vertInView && horInView;
}

/**
 * Smooth scroll to element
 * @param {string|Element} target - The target element or selector
 * @param {number} offset - Offset from the top in pixels
 * @param {number} duration - Animation duration in milliseconds
 */
function smoothScrollTo(target, offset = 0, duration = 800) {
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (!element) return;
    
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

/**
 * Get scroll percentage of the page
 * @returns {number} Scroll percentage (0-100)
 */
function getScrollPercentage() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    return (scrollTop / scrollHeight) * 100;
}

/**
 * Format number with animation (counting up effect)
 * @param {Element} element - The element to animate
 * @param {number} target - The target number
 * @param {number} duration - Animation duration in milliseconds
 * @param {string} suffix - Suffix to add (e.g., '%', '+')
 */
function animateNumber(element, target, duration = 2000, suffix = '') {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, 16);
}

/**
 * Create and dispatch custom event
 * @param {string} eventName - Name of the event
 * @param {Object} detail - Event detail data
 * @param {Element} target - Target element (defaults to document)
 */
function dispatchCustomEvent(eventName, detail = {}, target = document) {
    const event = new CustomEvent(eventName, {
        detail,
        bubbles: true,
        cancelable: true
    });
    target.dispatchEvent(event);
}

/**
 * Get CSS custom property value
 * @param {string} property - CSS custom property name (with or without --)
 * @param {Element} element - Element to get property from (defaults to document.documentElement)
 * @returns {string} The property value
 */
function getCSSCustomProperty(property, element = document.documentElement) {
    const prop = property.startsWith('--') ? property : `--${property}`;
    return getComputedStyle(element).getPropertyValue(prop).trim();
}

/**
 * Set CSS custom property value
 * @param {string} property - CSS custom property name (with or without --)
 * @param {string} value - The value to set
 * @param {Element} element - Element to set property on (defaults to document.documentElement)
 */
function setCSSCustomProperty(property, value, element = document.documentElement) {
    const prop = property.startsWith('--') ? property : `--${property}`;
    element.style.setProperty(prop, value);
}

/**
 * Check if user prefers reduced motion
 * @returns {boolean} Whether user prefers reduced motion
 */
function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Check if device supports touch
 * @returns {boolean} Whether device supports touch
 */
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * Get device type based on screen size
 * @returns {string} Device type: 'mobile', 'tablet', or 'desktop'
 */
function getDeviceType() {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
}

/**
 * Lazy load images with Intersection Observer
 * @param {string} selector - Selector for images to lazy load
 * @param {Object} options - Intersection Observer options
 */
function lazyLoadImages(selector = 'img[data-src]', options = {}) {
    const defaultOptions = {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
    };
    
    const observerOptions = { ...defaultOptions, ...options };
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll(selector).forEach(img => {
        imageObserver.observe(img);
    });
}

/**
 * Generate unique ID
 * @param {string} prefix - Prefix for the ID
 * @returns {string} Unique ID
 */
function generateUniqueId(prefix = 'id') {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<boolean>} Success status
 */
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            document.execCommand('copy');
            document.body.removeChild(textArea);
            return true;
        } catch (err) {
            document.body.removeChild(textArea);
            return false;
        }
    }
}

/**
 * Format date in a readable format
 * @param {Date|string} date - Date to format
 * @param {Object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date
 */
function formatDate(date, options = {}) {
    const defaultOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    
    const formatOptions = { ...defaultOptions, ...options };
    const dateObj = date instanceof Date ? date : new Date(date);
    
    return new Intl.DateTimeFormat('en-US', formatOptions).format(dateObj);
}

// Export functions for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        debounce,
        throttle,
        isInViewport,
        smoothScrollTo,
        getScrollPercentage,
        animateNumber,
        dispatchCustomEvent,
        getCSSCustomProperty,
        setCSSCustomProperty,
        prefersReducedMotion,
        isTouchDevice,
        getDeviceType,
        lazyLoadImages,
        generateUniqueId,
        copyToClipboard,
        formatDate
    };
}

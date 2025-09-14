// Analytics and Tracking Module

class AnalyticsManager {
    constructor(config = {}) {
        this.analytics = {
            pageViews: 0,
            interactions: 0,
            timeOnPage: Date.now(),
            trackingId: config.trackingId || 'G-XV96WERESM'
        };
        this.scrollMilestones = {};
    }

    async initialize() {
        try {
            await this.waitForGtag();
            this.trackPageView();
            this.setupEngagementTracking();
            this.setupClickTracking();
            this.setupFormTracking();
        } catch (error) {
            console.warn('Analytics initialization failed:', error);
        }
    }

    waitForGtag() {
        return new Promise((resolve) => {
            if (typeof gtag !== 'undefined') {
                resolve();
            } else {
                const checkGtag = setInterval(() => {
                    if (typeof gtag !== 'undefined') {
                        clearInterval(checkGtag);
                        resolve();
                    }
                }, 100);
            }
        });
    }

    trackPageView() {
        this.trackEvent('page_view', {
            page_title: document.title,
            page_location: window.location.href,
            page_path: window.location.pathname
        });
    }

    setupEngagementTracking() {
        let maxScrollDepth = 0;
        const trackScrollDepth = throttle(() => {
            const scrollDepth = Math.round(getScrollPercentage());
            if (scrollDepth > maxScrollDepth) {
                maxScrollDepth = scrollDepth;
                
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

        setTimeout(() => this.trackEvent('engagement', { time_on_page: 30 }), 30000);
        setTimeout(() => this.trackEvent('engagement', { time_on_page: 60 }), 60000);
        setTimeout(() => this.trackEvent('engagement', { time_on_page: 120 }), 120000);
    }

    setupClickTracking() {
        document.addEventListener('click', (e) => {
            this.handleClickTracking(e);
        });
    }

    setupFormTracking() {
        document.addEventListener('submit', (e) => {
            this.handleFormSubmission(e);
        });
    }

    handleClickTracking(e) {
        const element = e.target;
        
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

        if (element.matches('.nav-link')) {
            this.trackEvent('click', {
                event_category: 'navigation',
                event_label: element.textContent.trim(),
                link_text: element.textContent.trim(),
                link_href: element.href
            });
        }

        if (element.matches('a[href]') && !element.href.startsWith(window.location.origin)) {
            this.trackEvent('click', {
                event_category: 'outbound_link',
                event_label: element.href,
                link_text: element.textContent.trim(),
                link_url: element.href
            });
        }

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

    handleFormSubmission(e) {
        const form = e.target;
        if (form.tagName === 'FORM') {
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
                field_count: Array.from(formData.keys()).length
            });
        }
    }

    trackEvent(eventName, data = {}) {
        console.log('📊 Analytics Event:', eventName, data);
        
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, {
                ...data,
                custom_map: {
                    'dimension1': 'puente_scientific_website'
                }
            });
        }
        
        this.analytics.interactions++;
    }

    trackSessionEnd() {
        const sessionDuration = Math.round((Date.now() - this.analytics.timeOnPage) / 1000);
        
        this.trackEvent('session_end', {
            session_duration: sessionDuration,
            total_interactions: this.analytics.interactions,
            page_path: window.location.pathname
        });
    }

    getAnalytics() {
        return {
            ...this.analytics,
            timeOnPage: Date.now() - this.analytics.timeOnPage
        };
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = AnalyticsManager;
}
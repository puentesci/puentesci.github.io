// Interactive Components

class NavigationComponent {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.navToggle = document.getElementById('nav-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.isMenuOpen = false;
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupActiveLink();
        this.setupSmoothScroll();
    }

    bindEvents() {
        // Mobile menu toggle
        if (this.navToggle) {
            this.navToggle.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen && !this.navbar.contains(e.target)) {
                this.closeMobileMenu();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.closeMobileMenu();
            }
        });

        // Handle window resize
        window.addEventListener('resize', debounce(() => {
            if (window.innerWidth > 768 && this.isMenuOpen) {
                this.closeMobileMenu();
            }
        }, 250));
    }

    toggleMobileMenu() {
        if (this.isMenuOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    openMobileMenu() {
        this.isMenuOpen = true;
        this.navMenu.classList.add('active');
        this.navToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Animate menu items
        this.navLinks.forEach((link, index) => {
            link.style.animation = `slideInDown 0.3s ease-out ${index * 0.1}s forwards`;
        });
    }

    closeMobileMenu() {
        this.isMenuOpen = false;
        this.navMenu.classList.remove('active');
        this.navToggle.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset animations
        this.navLinks.forEach(link => {
            link.style.animation = '';
        });
    }

    setupActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.setActiveLink(entry.target.id);
                }
            });
        }, {
            rootMargin: '-20% 0px -80% 0px'
        });

        sections.forEach(section => observer.observe(section));
    }

    setActiveLink(sectionId) {
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
    }

    setupSmoothScroll() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = this.navbar.offsetHeight;
                    smoothScrollTo(targetElement, headerHeight);
                    
                    // Close mobile menu if open
                    if (this.isMenuOpen) {
                        this.closeMobileMenu();
                    }
                }
            });
        });
    }
}

class ContactFormComponent {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.submitButton = null;
        this.originalButtonText = '';
        
        if (this.form) {
            this.init();
        }
    }

    init() {
        this.submitButton = this.form.querySelector('button[type="submit"]');
        this.originalButtonText = this.submitButton?.textContent || 'Send Message';
        
        this.bindEvents();
        this.setupValidation();
    }

    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    setupValidation() {
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            // Add validation attributes
            if (input.type === 'email') {
                input.setAttribute('pattern', '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$');
            }
        });
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        if (!this.validateForm()) {
            return;
        }

        this.setSubmitState('loading');
        
        try {
            const formData = new FormData(this.form);
            const data = Object.fromEntries(formData.entries());
            
            // Simulate form submission (replace with actual endpoint)
            await this.submitForm(data);
            
            this.setSubmitState('success');
            this.showMessage('Thank you! Your message has been sent successfully.', 'success');
            this.form.reset();
            
        } catch (error) {
            this.setSubmitState('error');
            this.showMessage('Sorry, there was an error sending your message. Please try again.', 'error');
        }
    }

    async submitForm(data) {
        // Simulate API call
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate success/failure
                if (Math.random() > 0.1) {
                    resolve(data);
                } else {
                    reject(new Error('Submission failed'));
                }
            }, 2000);
        });
    }

    validateForm() {
        const inputs = this.form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }

        // Name validation
        if (field.name === 'name' && value && value.length < 2) {
            isValid = false;
            errorMessage = 'Name must be at least 2 characters long';
        }

        // Message validation
        if (field.name === 'message' && value && value.length < 10) {
            isValid = false;
            errorMessage = 'Message must be at least 10 characters long';
        }

        this.showFieldError(field, isValid ? '' : errorMessage);
        return isValid;
    }

    showFieldError(field, message) {
        this.clearFieldError(field);
        
        if (message) {
            field.classList.add('error');
            
            const errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            errorElement.textContent = message;
            errorElement.style.cssText = `
                color: #ef4444;
                font-size: 0.875rem;
                margin-top: 0.25rem;
                animation: slideInUp 0.3s ease-out;
            `;
            
            field.parentNode.appendChild(errorElement);
        }
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    setSubmitState(state) {
        if (!this.submitButton) return;

        switch (state) {
            case 'loading':
                this.submitButton.disabled = true;
                this.submitButton.textContent = 'Sending...';
                this.submitButton.style.opacity = '0.7';
                break;
            case 'success':
                this.submitButton.textContent = 'Sent!';
                this.submitButton.style.background = '#10b981';
                setTimeout(() => this.resetSubmitButton(), 3000);
                break;
            case 'error':
                this.submitButton.textContent = 'Try Again';
                this.submitButton.style.background = '#ef4444';
                setTimeout(() => this.resetSubmitButton(), 3000);
                break;
            default:
                this.resetSubmitButton();
        }
    }

    resetSubmitButton() {
        if (!this.submitButton) return;
        
        this.submitButton.disabled = false;
        this.submitButton.textContent = this.originalButtonText;
        this.submitButton.style.opacity = '';
        this.submitButton.style.background = '';
    }

    showMessage(text, type) {
        const messageElement = document.createElement('div');
        messageElement.className = `form-message ${type}`;
        messageElement.textContent = text;
        messageElement.style.cssText = `
            padding: 1rem;
            margin-top: 1rem;
            border-radius: 0.5rem;
            font-weight: 500;
            animation: slideInUp 0.3s ease-out;
            ${type === 'success' ? 'background: #dcfce7; color: #166534; border: 1px solid #bbf7d0;' : ''}
            ${type === 'error' ? 'background: #fef2f2; color: #dc2626; border: 1px solid #fecaca;' : ''}
        `;

        // Remove existing messages
        const existingMessage = this.form.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        this.form.appendChild(messageElement);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.style.animation = 'fadeOut 0.3s ease-out';
                setTimeout(() => messageElement.remove(), 300);
            }
        }, 5000);
    }
}

class ScrollIndicatorComponent {
    constructor() {
        this.indicator = document.querySelector('.scroll-indicator');
        this.init();
    }

    init() {
        if (!this.indicator) return;

        this.bindEvents();
        this.setupAutoHide();
    }

    bindEvents() {
        this.indicator.addEventListener('click', () => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                smoothScrollTo(aboutSection, 80);
            }
        });
    }

    setupAutoHide() {
        const handleScroll = throttle(() => {
            const scrolled = window.pageYOffset > window.innerHeight * 0.3;
            
            if (scrolled) {
                this.indicator.style.opacity = '0';
                this.indicator.style.pointerEvents = 'none';
            } else {
                this.indicator.style.opacity = '';
                this.indicator.style.pointerEvents = '';
            }
        }, 100);

        window.addEventListener('scroll', handleScroll);
    }
}

class LanguageSelectorComponent {
    constructor() {
        this.currentLanguage = localStorage.getItem('language') || 'en';
        this.languages = {
            'en': { name: 'English', flag: '🇺🇸' },
            'es': { name: 'Español', flag: '🇪🇸' },
            'zh': { name: '中文', flag: '🇨🇳' },
            'pt': { name: 'Português', flag: '🇵🇹' }
        };
        this.init();
    }

    init() {
        console.log('LanguageSelectorComponent initializing...');
        this.createLanguageSelector();
        console.log('LanguageSelectorComponent created successfully');
    }

    createLanguageSelector() {
        const container = document.createElement('div');
        container.className = 'language-selector';
        container.style.cssText = `
            position: fixed;
            top: 50%;
            right: 2rem;
            transform: translateY(-50%);
            z-index: 1000;
        `;

        const button = document.createElement('button');
        button.className = 'language-toggle';
        button.setAttribute('aria-label', 'Select language');
        button.innerHTML = this.languages[this.currentLanguage].flag;
        button.style.cssText = `
            width: 3rem;
            height: 3rem;
            border-radius: 50%;
            background: var(--bg-primary);
            border: 2px solid var(--border-primary);
            font-size: 1.25rem;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: var(--shadow-lg);
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        const dropdown = document.createElement('div');
        dropdown.className = 'language-dropdown';
        dropdown.style.cssText = `
            position: absolute;
            right: 0;
            top: 100%;
            margin-top: 0.5rem;
            background: var(--bg-primary);
            border: 2px solid var(--border-primary);
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-lg);
            min-width: 150px;
            opacity: 0;
            visibility: hidden;
            transform: translateY(-10px);
            transition: all 0.3s ease;
            z-index: 1001;
        `;

        // Create language options
        Object.entries(this.languages).forEach(([code, lang]) => {
            const option = document.createElement('button');
            option.className = 'language-option';
            option.setAttribute('data-lang', code);
            option.innerHTML = `${lang.flag} ${lang.name}`;
            option.style.cssText = `
                width: 100%;
                padding: 0.75rem 1rem;
                border: none;
                background: transparent;
                color: var(--text-primary);
                text-align: left;
                cursor: pointer;
                transition: background-color 0.2s ease;
                border-radius: var(--radius-md);
                margin: 0.25rem;
                font-size: 0.875rem;
            `;

            if (code === this.currentLanguage) {
                option.style.background = 'var(--accent-primary)';
                option.style.color = 'white';
            }

            option.addEventListener('click', () => this.selectLanguage(code));
            option.addEventListener('mouseenter', () => {
                if (code !== this.currentLanguage) {
                    option.style.background = 'var(--bg-secondary)';
                }
            });
            option.addEventListener('mouseleave', () => {
                if (code !== this.currentLanguage) {
                    option.style.background = 'transparent';
                }
            });

            dropdown.appendChild(option);
        });

        // Toggle dropdown
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleDropdown();
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!container.contains(e.target)) {
                this.closeDropdown();
            }
        });

        // Add hover effect
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.1)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
        });

        container.appendChild(button);
        container.appendChild(dropdown);
        document.body.appendChild(container);
        
        this.container = container;
        this.button = button;
        this.dropdown = dropdown;
    }

    toggleDropdown() {
        const isOpen = this.dropdown.style.opacity === '1';
        if (isOpen) {
            this.closeDropdown();
        } else {
            this.openDropdown();
        }
    }

    openDropdown() {
        this.dropdown.style.opacity = '1';
        this.dropdown.style.visibility = 'visible';
        this.dropdown.style.transform = 'translateY(0)';
    }

    closeDropdown() {
        this.dropdown.style.opacity = '0';
        this.dropdown.style.visibility = 'hidden';
        this.dropdown.style.transform = 'translateY(-10px)';
    }

    selectLanguage(langCode) {
        this.currentLanguage = langCode;
        localStorage.setItem('language', langCode);
        
        // Update button flag
        this.button.innerHTML = this.languages[langCode].flag;
        
        // Update active option
        const options = this.dropdown.querySelectorAll('.language-option');
        options.forEach(option => {
            if (option.getAttribute('data-lang') === langCode) {
                option.style.background = 'var(--accent-primary)';
                option.style.color = 'white';
            } else {
                option.style.background = 'transparent';
                option.style.color = 'var(--text-primary)';
            }
        });

        this.closeDropdown();
        
        // TODO: Implement actual language switching logic here
        console.log(`Language changed to: ${this.languages[langCode].name}`);
    }
}

// Initialize components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new NavigationComponent();
    new ContactFormComponent();
    new ScrollIndicatorComponent();
    new LanguageSelectorComponent();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        NavigationComponent,
        ContactFormComponent,
        ScrollIndicatorComponent,
        LanguageSelectorComponent
    };
}

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
        this.storageKey = 'language';
        this.currentLanguage = safeStorageGet(this.storageKey, 'en') || 'en';
        this.languages = {
            'en': { name: 'English', flag: '🇺🇸' },
            'es': { name: 'Español', flag: '🇪🇸' },
            'zh': { name: '中文', flag: '🇨🇳' },
            'pt': { name: 'Português', flag: '🇵🇹' }
        };
        this.translationEntries = this.buildTranslationEntries();
        this.init();
    }

    init() {
        console.log('LanguageSelectorComponent initializing...');
        this.createLanguageSelector();
        this.applyLanguage(this.currentLanguage);
        console.log('LanguageSelectorComponent created successfully');
    }

    buildTranslationEntries() {
        return [
            {
                type: 'attribute',
                attribute: 'aria-label',
                selectors: ['.language-toggle'],
                values: {
                    en: 'Select language',
                    es: 'Seleccionar idioma',
                    zh: '选择语言',
                    pt: 'Selecionar idioma'
                }
            },
            {
                selectors: [
                    '.nav-menu a[href="#home"]',
                    '.nav-menu a[href="index.html"]'
                ],
                type: 'text',
                values: {
                    en: 'Home',
                    es: 'Inicio',
                    zh: '首页',
                    pt: 'Início'
                }
            },
            {
                selectors: [
                    '.nav-menu a[href="#about"]',
                    '.nav-menu a[href="index.html#about"]'
                ],
                type: 'text',
                values: {
                    en: 'About',
                    es: 'Nosotros',
                    zh: '关于',
                    pt: 'Sobre'
                }
            },
            {
                selectors: [
                    '.nav-menu a[href="#services"]',
                    '.nav-menu a[href="index.html#services"]'
                ],
                type: 'text',
                values: {
                    en: 'Services',
                    es: 'Servicios',
                    zh: '服务',
                    pt: 'Serviços'
                }
            },
            {
                selectors: [
                    '.nav-menu a[href="#products"]',
                    '.nav-menu a[href="index.html#products"]'
                ],
                type: 'text',
                values: {
                    en: 'Products',
                    es: 'Productos',
                    zh: '产品',
                    pt: 'Produtos'
                }
            },
            {
                selectors: [
                    '.nav-menu a[href="#contact"]',
                    '.nav-menu a[href="contact.html"]'
                ],
                type: 'text',
                values: {
                    en: 'Contact',
                    es: 'Contacto',
                    zh: '联系我们',
                    pt: 'Contato'
                }
            },
            {
                selectors: '.hero-title',
                type: 'html',
                values: {
                    en: '<span class="title-line">Bridging Science</span><span class="title-line">&</span><span class="title-line">Tech Trade</span>',
                    es: '<span class="title-line">Conectando Ciencia</span><span class="title-line">y</span><span class="title-line">Comercio Tecnológico</span>',
                    zh: '<span class="title-line">连接科学</span><span class="title-line">与</span><span class="title-line">科技贸易</span>',
                    pt: '<span class="title-line">Conectando Ciência</span><span class="title-line">e</span><span class="title-line">Comércio Tecnológico</span>'
                }
            },
            {
                selectors: '.hero-subtitle',
                type: 'text',
                values: {
                    en: 'We specialize in emerging technologies and high-quality refurbished equipment, helping laboratories and companies upgrade or maintain their operations with cost-effective, reliable solutions.',
                    es: 'Nos especializamos en tecnologías emergentes y equipos reacondicionados de alta calidad, ayudando a laboratorios y empresas a modernizar o mantener sus operaciones con soluciones confiables y rentables.',
                    zh: '我们专注于新兴技术和高品质翻新设备，帮助实验室和企业以可靠且具成本效益的方案升级或维护运营。',
                    pt: 'Somos especializados em tecnologias emergentes e equipamentos recondicionados de alta qualidade, ajudando laboratórios e empresas a atualizar ou manter suas operações com soluções confiáveis e econômicas.'
                }
            },
            {
                selectors: '.hero-buttons .btn-primary',
                type: 'text',
                values: {
                    en: 'Explore Services',
                    es: 'Explorar Servicios',
                    zh: '查看服务',
                    pt: 'Explorar Serviços'
                }
            },
            {
                selectors: '.hero-buttons .btn-secondary',
                type: 'text',
                values: {
                    en: 'Contact Us',
                    es: 'Contáctanos',
                    zh: '联系我们',
                    pt: 'Fale Conosco'
                }
            },
            {
                selectors: '#about .section-title',
                type: 'text',
                values: {
                    en: 'About Puente Scientific',
                    es: 'Acerca de Puente Scientific',
                    zh: '关于 Puente Scientific',
                    pt: 'Sobre a Puente Scientific'
                }
            },
            {
                selectors: '#about h3',
                type: 'text',
                values: {
                    en: 'Professional Export Solutions',
                    es: 'Soluciones Profesionales de Exportación',
                    zh: '专业出口解决方案',
                    pt: 'Soluções Profissionais de Exportação'
                }
            },
            {
                selectors: '#about .about-text > p',
                type: 'text',
                values: {
                    en: 'Add company history',
                    es: 'Agregue la historia de la empresa',
                    zh: '添加公司历史',
                    pt: 'Adicionar histórico da empresa'
                }
            },
            {
                selectors: '#about .stat-item:nth-child(1) .stat-label',
                type: 'text',
                values: {
                    en: '% Growth in Emerging Tech Market',
                    es: '% de crecimiento en el mercado de tecnología emergente',
                    zh: '新兴科技市场增长百分比',
                    pt: '% de crescimento no mercado de tecnologia emergente'
                }
            },
            {
                selectors: '#about .stat-item:nth-child(2) .stat-label',
                type: 'text',
                values: {
                    en: 'Year We Launched',
                    es: 'Año de lanzamiento',
                    zh: '成立年份',
                    pt: 'Ano em que começamos'
                }
            },
            {
                selectors: '#about .stat-item:nth-child(3) .stat-label',
                type: 'text',
                values: {
                    en: '% Cost Savings with Refurbished',
                    es: '% de ahorro con equipos reacondicionados',
                    zh: '翻新设备节省成本百分比',
                    pt: '% de economia com equipamentos recondicionados'
                }
            },
            {
                selectors: '#about .growth-chart h4',
                type: 'text',
                values: {
                    en: 'Growth Trajectory',
                    es: 'Trayectoria de Crecimiento',
                    zh: '增长轨迹',
                    pt: 'Trajetória de Crescimento'
                }
            },
            {
                selectors: '#services .section-title',
                type: 'text',
                values: {
                    en: 'Our Services',
                    es: 'Nuestros Servicios',
                    zh: '我们的服务',
                    pt: 'Nossos Serviços'
                }
            },
            {
                selectors: '#services .section-subtitle',
                type: 'text',
                values: {
                    en: 'Comprehensive export solutions tailored to your needs',
                    es: 'Soluciones integrales de exportación adaptadas a sus necesidades',
                    zh: '量身定制的全方位出口解决方案',
                    pt: 'Soluções completas de exportação sob medida para suas necessidades'
                }
            },
            {
                selectors: '#services .service-card:nth-child(1) h3',
                type: 'text',
                values: {
                    en: 'International Shipping',
                    es: 'Envío Internacional',
                    zh: '国际运输',
                    pt: 'Envio Internacional'
                }
            },
            {
                selectors: '#services .service-card:nth-child(1) p',
                type: 'text',
                values: {
                    en: 'Reliable shipping solutions across all major trade routes with real-time tracking and insurance coverage.',
                    es: 'Soluciones de envío confiables en todas las rutas comerciales principales con rastreo en tiempo real y cobertura de seguros.',
                    zh: '覆盖主要贸易航线的可靠运输方案，提供实时跟踪与保险保障。',
                    pt: 'Soluções de envio confiáveis em todas as principais rotas comerciais, com rastreamento em tempo real e cobertura de seguro.'
                }
            },
            {
                selectors: '#services .service-card:nth-child(2) h3',
                type: 'text',
                values: {
                    en: 'Documentation & Compliance',
                    es: 'Documentación y Cumplimiento',
                    zh: '文件与合规',
                    pt: 'Documentação e Conformidade'
                }
            },
            {
                selectors: '#services .service-card:nth-child(2) p',
                type: 'text',
                values: {
                    en: 'Complete handling of export documentation, customs clearance, and regulatory compliance.',
                    es: 'Gestión completa de la documentación de exportación, despacho aduanero y cumplimiento normativo.',
                    zh: '全面处理出口文件、清关流程与法规合规。',
                    pt: 'Gestão completa de documentação de exportação, liberação alfandegária e conformidade regulatória.'
                }
            },
            {
                selectors: '#services .service-card:nth-child(3) h3',
                type: 'text',
                values: {
                    en: 'Supply Chain Management',
                    es: 'Gestión de la Cadena de Suministro',
                    zh: '供应链管理',
                    pt: 'Gestão da Cadeia de Suprimentos'
                }
            },
            {
                selectors: '#services .service-card:nth-child(3) p',
                type: 'text',
                values: {
                    en: 'End-to-end supply chain optimization from sourcing to final delivery.',
                    es: 'Optimización integral de la cadena de suministro desde el abastecimiento hasta la entrega final.',
                    zh: '从采购到最终交付的端到端供应链优化。',
                    pt: 'Otimização completa da cadeia de suprimentos, do fornecimento à entrega final.'
                }
            },
            {
                selectors: '#services .service-card:nth-child(4) h3',
                type: 'text',
                values: {
                    en: 'Trade Consulting',
                    es: 'Consultoría Comercial',
                    zh: '贸易咨询',
                    pt: 'Consultoria em Comércio'
                }
            },
            {
                selectors: '#services .service-card:nth-child(4) p',
                type: 'text',
                values: {
                    en: 'Expert guidance on market entry strategies and international trade regulations.',
                    es: 'Asesoría experta en estrategias de entrada a mercados y regulaciones de comercio internacional.',
                    zh: '为市场进入策略与国际贸易法规提供专家指导。',
                    pt: 'Orientação especializada em estratégias de entrada em mercados e regulamentações de comércio internacional.'
                }
            },
            {
                selectors: '#contact .section-title',
                type: 'text',
                values: {
                    en: 'Get In Touch',
                    es: 'Póngase en Contacto',
                    zh: '取得联系',
                    pt: 'Entre em Contato'
                }
            },
            {
                selectors: '#contact .section-subtitle',
                type: 'text',
                values: {
                    en: 'Ready to expand your business globally?',
                    es: '¿Listo para expandir su negocio globalmente?',
                    zh: '准备好将您的业务拓展到全球了吗？',
                    pt: 'Pronto para expandir seu negócio globalmente?'
                }
            },
            {
                selectors: '#contact .contact-item:nth-child(1) h4',
                type: 'text',
                values: {
                    en: 'Email',
                    es: 'Correo',
                    zh: '电子邮件',
                    pt: 'E-mail'
                }
            },
            {
                selectors: '#contact .contact-item:nth-child(2) h4',
                type: 'text',
                values: {
                    en: 'Phone',
                    es: 'Teléfono',
                    zh: '电话',
                    pt: 'Telefone'
                }
            },
            {
                selectors: '#contact .contact-item:nth-child(3) h4',
                type: 'text',
                values: {
                    en: 'Global Presence',
                    es: 'Presencia Global',
                    zh: '全球布局',
                    pt: 'Presença Global'
                }
            },
            {
                selectors: '#contact .contact-item:nth-child(3) .contact-details p',
                type: 'text',
                values: {
                    en: 'Serving clients worldwide',
                    es: 'Atendemos clientes en todo el mundo',
                    zh: '服务全球客户',
                    pt: 'Atendendo clientes em todo o mundo'
                }
            },
            {
                selectors: '#contact-form #name',
                type: 'attribute',
                attribute: 'placeholder',
                values: {
                    en: 'Your Name',
                    es: 'Su Nombre',
                    zh: '您的姓名',
                    pt: 'Seu Nome'
                }
            },
            {
                selectors: '#contact-form #email',
                type: 'attribute',
                attribute: 'placeholder',
                values: {
                    en: 'Your Email',
                    es: 'Su Correo',
                    zh: '您的邮箱',
                    pt: 'Seu E-mail'
                }
            },
            {
                selectors: '#contact-form #company',
                type: 'attribute',
                attribute: 'placeholder',
                values: {
                    en: 'Company Name',
                    es: 'Nombre de la Empresa',
                    zh: '公司名称',
                    pt: 'Nome da Empresa'
                }
            },
            {
                selectors: '#contact-form #message',
                type: 'attribute',
                attribute: 'placeholder',
                values: {
                    en: 'Your Message',
                    es: 'Su Mensaje',
                    zh: '您的留言',
                    pt: 'Sua Mensagem'
                }
            },
            {
                selectors: '#contact-form button[type="submit"]',
                type: 'text',
                values: {
                    en: 'Send Message',
                    es: 'Enviar Mensaje',
                    zh: '发送信息',
                    pt: 'Enviar Mensagem'
                }
            },
            {
                selectors: '.footer-description',
                type: 'text',
                values: {
                    en: 'Giving used equipment a second life abroad',
                    es: 'Dando una segunda vida al equipo usado en el extranjero',
                    zh: '让二手设备在海外焕发新生',
                    pt: 'Dando uma segunda vida a equipamentos usados no exterior'
                }
            },
            {
                selectors: '.footer-section:nth-child(1) h4',
                type: 'text',
                values: {
                    en: 'Services',
                    es: 'Servicios',
                    zh: '服务',
                    pt: 'Serviços'
                }
            },
            {
                selectors: '.footer-section:nth-child(2) h4',
                type: 'text',
                values: {
                    en: 'Company',
                    es: 'Empresa',
                    zh: '公司',
                    pt: 'Empresa'
                }
            },
            {
                selectors: '.footer-section:nth-child(1) ul li:nth-child(1) a',
                type: 'text',
                values: {
                    en: 'International Shipping',
                    es: 'Envío Internacional',
                    zh: '国际运输',
                    pt: 'Envio Internacional'
                }
            },
            {
                selectors: '.footer-section:nth-child(1) ul li:nth-child(2) a',
                type: 'text',
                values: {
                    en: 'Documentation',
                    es: 'Documentación',
                    zh: '文档',
                    pt: 'Documentação'
                }
            },
            {
                selectors: '.footer-section:nth-child(1) ul li:nth-child(3) a',
                type: 'text',
                values: {
                    en: 'Supply Chain',
                    es: 'Cadena de Suministro',
                    zh: '供应链',
                    pt: 'Cadeia de Suprimentos'
                }
            },
            {
                selectors: '.footer-section:nth-child(1) ul li:nth-child(4) a',
                type: 'text',
                values: {
                    en: 'Consulting',
                    es: 'Consultoría',
                    zh: '咨询',
                    pt: 'Consultoria'
                }
            },
            {
                selectors: '.footer-section:nth-child(2) ul li:nth-child(1) a',
                type: 'text',
                values: {
                    en: 'About Us',
                    es: 'Sobre Nosotros',
                    zh: '关于我们',
                    pt: 'Sobre Nós'
                }
            },
            {
                selectors: '.footer-section:nth-child(2) ul li:nth-child(2) a',
                type: 'text',
                values: {
                    en: 'Contact',
                    es: 'Contacto',
                    zh: '联系我们',
                    pt: 'Contato'
                }
            },
            {
                selectors: '.footer-section:nth-child(2) ul li:nth-child(3) a',
                type: 'text',
                values: {
                    en: 'Privacy Policy',
                    es: 'Política de Privacidad',
                    zh: '隐私政策',
                    pt: 'Política de Privacidade'
                }
            },
            {
                selectors: '.footer-section:nth-child(2) ul li:nth-child(4) a',
                type: 'text',
                values: {
                    en: 'Terms of Service',
                    es: 'Términos del Servicio',
                    zh: '服务条款',
                    pt: 'Termos de Serviço'
                }
            },
            {
                selectors: '.footer-bottom p',
                type: 'text',
                values: {
                    en: '© 2025 Puente Scientific. All rights reserved.',
                    es: '© 2025 Puente Scientific. Todos los derechos reservados.',
                    zh: '© 2025 Puente Scientific。保留所有权利。',
                    pt: '© 2025 Puente Scientific. Todos os direitos reservados.'
                }
            }
        ];
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
        button.setAttribute('aria-haspopup', 'listbox');
        button.setAttribute('aria-expanded', 'false');
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
        button.title = this.languages[this.currentLanguage].name;

        const dropdown = document.createElement('div');
        dropdown.className = 'language-dropdown';
        dropdown.setAttribute('role', 'listbox');
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

        Object.entries(this.languages).forEach(([code, lang]) => {
            const option = document.createElement('button');
            option.className = 'language-option';
            option.setAttribute('data-lang', code);
            option.setAttribute('role', 'option');
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

            option.addEventListener('click', () => this.selectLanguage(code));
            dropdown.appendChild(option);
        });

        button.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleDropdown();
        });

        document.addEventListener('click', (e) => {
            if (!container.contains(e.target)) {
                this.closeDropdown();
            }
        });

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
        this.updateOptionStates();
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
        if (this.button) {
            this.button.setAttribute('aria-expanded', 'true');
        }
    }

    closeDropdown() {
        this.dropdown.style.opacity = '0';
        this.dropdown.style.visibility = 'hidden';
        this.dropdown.style.transform = 'translateY(-10px)';
        if (this.button) {
            this.button.setAttribute('aria-expanded', 'false');
        }
    }

    selectLanguage(langCode) {
        if (!this.languages[langCode]) return;

        safeStorageSet(this.storageKey, langCode);
        this.button.innerHTML = this.languages[langCode].flag;
        this.button.title = this.languages[langCode].name;

        this.applyLanguage(langCode);
        this.closeDropdown();

        const appInstance = window.PuenteScientificApp;
        if (appInstance?.analyticsManager) {
            appInstance.analyticsManager.trackEvent('language_change', {
                language: langCode
            });
        }
    }

    applyLanguage(langCode) {
        this.currentLanguage = langCode;

        document.documentElement.lang = langCode;
        if (document.body) {
            document.body.setAttribute('data-language', langCode);
        }

        if (this.button && this.languages[langCode]) {
            this.button.innerHTML = this.languages[langCode].flag;
            this.button.title = this.languages[langCode].name;
        }

        this.updateTranslations(langCode);
        this.updateOptionStates();

        dispatchCustomEvent('languageChange', {
            language: langCode
        });
    }

    updateOptionStates() {
        if (!this.dropdown) return;
        const options = this.dropdown.querySelectorAll('.language-option');
        options.forEach(option => {
            const isActive = option.getAttribute('data-lang') === this.currentLanguage;
            option.classList.toggle('active', isActive);
            option.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });
    }

    updateTranslations(langCode) {
        this.translationEntries.forEach(entry => {
            const selectors = Array.isArray(entry.selectors) ? entry.selectors : [entry.selectors];
            const value = entry.values[langCode] ?? entry.values.en;

            selectors.forEach(selector => {
                const elements = document.querySelectorAll(selector);
                elements.forEach(element => {
                    this.applyTranslationToElement(element, entry, value);
                });
            });
        });
    }

    applyTranslationToElement(element, entry, value) {
        if (!element) return;

        if (entry.type === 'html') {
            element.innerHTML = value;
        } else if (entry.type === 'attribute' && entry.attribute) {
            element.setAttribute(entry.attribute, value);
            if (entry.attribute in element) {
                try {
                    element[entry.attribute] = value;
                } catch (error) {
                    // Some attributes are read-only; safe to ignore
                }
            }
        } else {
            element.textContent = value;
        }
    }
}

// Initialize components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new NavigationComponent();
    new ContactFormComponent();
    new ScrollIndicatorComponent();
    // new LanguageSelectorComponent(); // Disabled - using new nav-based selector
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

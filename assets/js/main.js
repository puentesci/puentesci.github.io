// Main Application JavaScript
// Import required modules (ensure these are loaded before main.js in HTML)

const THEME_STORAGE_KEY = 'theme';

function createFallbackConfig() {
    return {
        getAll: () => ({}),
        update: () => {},
        get: () => undefined,
        set: () => {},
        reset: () => {}
    };
}

class PuenteScientificApp {
    constructor() {
        this.isInitialized = false;
        this.components = {};
        this.currentTheme = null;
        
        // Initialize configuration
        const hasAppConfig = typeof AppConfig !== 'undefined';
        this.appConfig = hasAppConfig ? new AppConfig() : createFallbackConfig();
        this.config = typeof this.appConfig.getAll === 'function' ? this.appConfig.getAll() : {};
        
        // Initialize modules
        this.performanceManager = typeof PerformanceManager !== 'undefined' ? new PerformanceManager(this.config.performance) : null;
        this.accessibilityManager = typeof AccessibilityManager !== 'undefined' ? new AccessibilityManager() : null;
        this.analyticsManager = typeof AnalyticsManager !== 'undefined' ? new AnalyticsManager(this.config.analytics) : null;
        this.eventHandlerManager = typeof EventHandlerManager !== 'undefined' ? new EventHandlerManager(this) : null;
        
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
            if (this.performanceManager?.initialize) {
                this.performanceManager.initialize();
            }

            if (this.accessibilityManager?.initialize) {
                this.accessibilityManager.initialize();
            }

            if (this.eventHandlerManager?.initialize) {
                this.eventHandlerManager.initialize();
            }

            this.initializeThemeToggle();
            this.initializeLanguageSelector();
            
            // Initialize analytics in parallel (non-blocking)
            if (this.analyticsManager?.initialize) {
                this.analyticsManager.initialize().catch(error => {
                    console.warn('Analytics initialization failed, continuing without analytics:', error);
                });
            }
            
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
        return typeof this.appConfig?.getAll === 'function' ? this.appConfig.getAll() : {};
    }

    updateConfig(newConfig) {
        if (typeof this.appConfig?.update === 'function') {
            this.appConfig.update(newConfig);
        }
        this.config = this.getConfig();
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
        if (this.eventHandlerManager?.destroy) {
            this.eventHandlerManager.destroy();
        }
    }

    initializeThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) return;

        // Get saved theme or default to system preference
        const savedTheme = safeStorageGet(THEME_STORAGE_KEY);
        const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const systemPrefersDark = colorSchemeQuery.matches;
        const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
        
        // Apply initial theme
        this.setTheme(initialTheme);
        themeToggle.setAttribute('aria-pressed', initialTheme === 'dark');

        // Add event listeners for both click and touch
        const handleThemeToggle = (event) => {
            event.preventDefault();
            event.stopPropagation();
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            this.setTheme(newTheme);
            
            // Save preference
            safeStorageSet(THEME_STORAGE_KEY, newTheme);
            themeToggle.setAttribute('aria-pressed', newTheme === 'dark');
            dispatchCustomEvent('themeChange', {
                theme: newTheme,
                previousTheme: currentTheme
            });
            
            // Track theme change
            if (this.analyticsManager) {
                this.analyticsManager.trackEvent('theme_change', {
                    theme: newTheme,
                    previous_theme: currentTheme
                });
            }
        };

        themeToggle.addEventListener('click', handleThemeToggle);
        themeToggle.addEventListener('touchstart', handleThemeToggle);

        // Listen for system theme changes
        const handleSystemThemeChange = (event) => {
            if (!safeStorageGet(THEME_STORAGE_KEY)) {
                const updatedTheme = event.matches ? 'dark' : 'light';
                this.setTheme(updatedTheme);
                themeToggle.setAttribute('aria-pressed', updatedTheme === 'dark');
            }
        };

        if (typeof colorSchemeQuery.addEventListener === 'function') {
            colorSchemeQuery.addEventListener('change', handleSystemThemeChange);
        } else if (typeof colorSchemeQuery.addListener === 'function') {
            colorSchemeQuery.addListener(handleSystemThemeChange);
        }
    }

    initializeLanguageSelector() {
        const languageSelect = document.getElementById('language-select');
        if (!languageSelect) {
            console.warn('Language selector not found');
            return;
        }

        // Get saved language or default to English
        const savedLanguage = safeStorageGet('language', 'en');
        languageSelect.value = savedLanguage;

        // Add change event listener
        languageSelect.addEventListener('change', (event) => {
            const selectedLanguage = event.target.value;
            console.log('Language changed to:', selectedLanguage);
            
            // Save preference
            safeStorageSet('language', selectedLanguage);
            
            // Apply language changes
            this.applyLanguage(selectedLanguage);
            
            // Track language change
            if (this.analyticsManager) {
                this.analyticsManager.trackEvent('language_change', {
                    language: selectedLanguage
                });
            }
        });

        // Apply initial language
        this.applyLanguage(savedLanguage);
    }

    applyLanguage(language) {
        // Simple language translations for key elements
        const translations = {
            en: {
                'nav-home': 'Home',
                'nav-about': 'About',
                'nav-services': 'Services',
                'nav-products': 'Products',
                'nav-contact': 'Contact',
                'hero-title': 'Bridging Science & Tech Trade',
                'hero-subtitle': 'We specialize in emerging technologies and high-quality refurbished equipment, helping laboratories and companies upgrade or maintain their operations with cost-effective, reliable solutions.',
                'about-title': 'About Puente Scientific',
                'about-subtitle': 'Giving Lab Equipment a Second Life',
                'about-description': 'We refurbish and resell HPLC equipment, source hard-to-find parts, and connect suppliers with global markets from our Alabama base. Our mission is to expand worldwide access to essential lab technology through cost-effective, refurbished solutions.'
            },
            es: {
                'nav-home': 'Inicio',
                'nav-about': 'Acerca de',
                'nav-services': 'Servicios',
                'nav-products': 'Productos',
                'nav-contact': 'Contacto',
                'hero-title': 'Conectando La Ciencia y El Comercio Tecnológico',
                'hero-subtitle': 'Nos especializamos en tecnologías emergentes y equipos reacondicionados de alta calidad, ayudando a laboratorios y empresas a actualizar o mantener sus operaciones con soluciones confiables y rentables.',
                'about-title': 'Acerca de Puente Scientific',
                'about-subtitle': 'Dando una Segunda Vida al Equipo de Laboratorio',
                'about-description': 'Reacondicionamos y revendemos equipos HPLC, obtenemos piezas difíciles de encontrar, y conectamos proveedores con mercados globales desde nuestra base en Alabama. Nuestra misión es expandir el acceso mundial a tecnología de laboratorio esencial a través de soluciones reacondicionadas rentables.'
            },
            zh: {
                'nav-home': '首页',
                'nav-about': '关于我们',
                'nav-services': '服务',
                'nav-products': '产品',
                'nav-contact': '联系我们',
                'hero-title': '连接科学与技术贸易',
                'hero-subtitle': '我们专注于新兴技术和高质量翻新设备，帮助实验室和公司以经济实惠、可靠的解决方案升级或维护其运营。',
                'about-title': '关于 Puente Scientific',
                'about-subtitle': '为实验室设备赋予第二次生命',
                'about-description': '我们从阿拉巴马州基地翻新和转售HPLC设备，采购难以找到的零件，并将供应商与全球市场连接。我们的使命是通过经济实惠的翻新解决方案扩大全球对基本实验室技术的访问。'
            },
            pt: {
                'nav-home': 'Início',
                'nav-about': 'Sobre',
                'nav-services': 'Serviços',
                'nav-products': 'Produtos',
                'nav-contact': 'Contato',
                'hero-title': 'Conectando Ciência e Comércio Tecnológico',
                'hero-subtitle': 'Especializamo-nos em tecnologias emergentes e equipamentos recondicionados de alta qualidade, ajudando laboratórios e empresas a atualizar ou manter suas operações com soluções confiáveis e econômicas.',
                'about-title': 'Sobre Puente Scientific',
                'about-subtitle': 'Dando uma Segunda Vida ao Equipamento de Laboratório',
                'about-description': 'Recondicionamos e revendemos equipamentos HPLC, obtemos peças difíceis de encontrar, e conectamos fornecedores com mercados globais de nossa base no Alabama. Nossa missão é expandir o acesso mundial à tecnologia de laboratório essencial através de soluções recondicionadas econômicas.'
            }
        };

        const currentTranslations = translations[language] || translations.en;
        
        // Apply translations to elements
        Object.entries(currentTranslations).forEach(([key, value]) => {
            const element = document.querySelector(`[data-translate="${key}"]`);
            if (element) {
                element.textContent = value;
            }
        });

        // Update document language
        document.documentElement.lang = language;
        
        console.log('Language applied:', language);
    }

    setTheme(theme) {
        if (this.currentTheme === theme) {
            return;
        }

        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        if (document.body) {
            document.body.setAttribute('data-theme', theme);
        }
        document.documentElement.style.colorScheme = theme === 'dark' ? 'dark' : 'light';
        
        // Update meta theme-color for mobile browsers
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', theme === 'dark' ? '#0F172A' : '#FFFFFF');
        }
    }
}

// Initialize the application
let app;

const initializeApp = () => {
    app = new PuenteScientificApp();
    window.PuenteScientificApp = app;
};

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Handle page unload
window.addEventListener('beforeunload', () => {
    if (app?.analyticsManager?.trackSessionEnd) {
        app.analyticsManager.trackSessionEnd();
    }
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PuenteScientificApp;
}

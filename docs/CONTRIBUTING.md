# Contributing to Puente Scientific Website

Thank you for your interest in contributing to the Puente Scientific website project. This document provides guidelines and information for contributors.

## Project Overview

This is a professional business website for Puente Scientific, an export company specializing in international trade and logistics solutions. The site is built with modern web technologies and deployed via GitHub Pages.

## Development Environment

### Prerequisites
- Basic knowledge of HTML5, CSS3, and JavaScript
- Understanding of responsive web design
- Familiarity with Git and GitHub
- Text editor or IDE of choice

### Local Development Setup
```bash
# Clone the repository
git clone https://github.com/puentesci/puentesci.github.io.git

# Navigate to project directory
cd puentesci.github.io

# Start Jekyll development server
bundle exec jekyll serve --host 0.0.0.0 --port 4000

# Alternative: Use the mobile development script
./mobile-dev-script.sh

# Then visit http://localhost:4000
```

## Project Structure

```
puentesci.github.io/
├── index.html                   # Main landing page
├── contact.html                 # Contact page
├── privacy-policy.html          # Privacy policy
├── terms-of-service.html        # Terms of service
├── CNAME                       # Domain configuration
├── assets/
│   ├── css/                   # Modular stylesheets
│   ├── js/                    # JavaScript functionality
│   └── images/               # Optimized images
└── docs/                      # Documentation
```

## Code Standards and Guidelines

### HTML Guidelines
- Use semantic HTML5 elements
- Maintain proper document structure
- Include appropriate meta tags
- Ensure accessibility compliance (WCAG guidelines)
- Keep markup clean and well-indented

Example:
```html
<section class="services" aria-labelledby="services-title">
    <h2 id="services-title">Our Services</h2>
    <div class="services-grid">
        <!-- Service items -->
    </div>
</section>
```

### CSS Guidelines
- Follow the modular CSS architecture
- Use CSS custom properties for theming
- Write mobile-first responsive styles
- Maintain consistent naming conventions
- Comment complex styles

**File Organization:**
- `reset.css` - CSS reset and normalization
- `variables.css` - Custom properties and themes
- `animations.css` - Animation keyframes and transitions
- `components.css` - Reusable component styles
- `main.css` - Main layout and page styles
- `responsive.css` - Media queries and responsive adjustments

Example:
```css
/* Use custom properties */
.hero-section {
    background: var(--gradient-primary);
    padding: var(--spacing-xl) 0;
}

/* Mobile-first approach */
.navigation {
    display: none;
}

@media (min-width: 768px) {
    .navigation {
        display: flex;
    }
}
```

### JavaScript Guidelines
- Use modern ES6+ syntax
- Write modular, reusable code
- Handle errors appropriately
- Comment complex functionality
- Follow consistent naming conventions

**File Organization:**
- `main.js` - Core application logic
- `animations.js` - Animation controllers
- `contact.js` - Contact form handling
- `analytics.js` - Analytics integration

Example:
```javascript
// Use const/let instead of var
const contactForm = document.getElementById('contact-form');

// Use arrow functions where appropriate
const handleFormSubmit = (event) => {
    event.preventDefault();
    // Handle form submission
};

// Add proper event listeners
contactForm.addEventListener('submit', handleFormSubmit);
```

## Making Changes

### Branch Strategy
- `main` branch contains production-ready code
- Create feature branches for new developments
- Use descriptive branch names (e.g., `feature/contact-form`, `fix/mobile-navigation`)

### Commit Messages
Follow conventional commit format:
```
type(scope): description

Examples:
feat(contact): add contact form validation
fix(mobile): resolve navigation menu overflow
docs(readme): update deployment instructions
style(css): improve button hover animations
```

### Pull Request Process
1. Create a feature branch from `main`
2. Make your changes following the code standards
3. Test changes locally across different devices/browsers
4. Update documentation if necessary
5. Create a pull request with:
   - Clear description of changes
   - Screenshots for visual changes
   - Testing information

## Testing Guidelines

### Manual Testing Checklist
- [ ] Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Verify mobile responsiveness (phone, tablet, desktop)
- [ ] Check accessibility with screen readers
- [ ] Validate HTML and CSS
- [ ] Test form functionality
- [ ] Verify analytics tracking (if applicable)
- [ ] Check loading performance

### Performance Testing
- Use Lighthouse for performance audits
- Optimize images before adding to repository
- Minimize CSS and JavaScript when possible
- Test Core Web Vitals metrics

## Analytics and Tracking

### Google Analytics Integration
- The site uses Google Analytics 4 (GA4) with tracking ID `G-XV96WERESM`
- Custom events are tracked for user interactions
- See [ANALYTICS.md](ANALYTICS.md) for detailed information
- Test analytics in preview mode before deploying

### Privacy Considerations
- Ensure GDPR compliance
- Don't track personal information without consent
- Follow privacy policy guidelines
- Use anonymized tracking where possible

## Content Guidelines

### Writing Style
- Professional and business-appropriate tone
- Clear, concise language
- Industry-appropriate terminology for export/trade
- SEO-friendly content structure

### Images and Media
- Use high-quality, professionally appropriate images
- Optimize images for web (WebP format preferred)
- Include alt text for accessibility
- Maintain consistent visual style

### SEO Best Practices
- Include relevant meta descriptions
- Use appropriate heading hierarchy (H1, H2, H3)
- Include structured data when relevant
- Optimize page titles and URLs

## Deployment

### Automatic Deployment
- Changes to `main` branch automatically deploy to GitHub Pages
- Deployment typically takes 1-2 minutes
- Monitor GitHub Actions for deployment status

### Custom Domain
- Site is served at `https://puentescientific.com`
- DNS configuration managed through domain provider
- HTTPS is automatically enforced

For detailed deployment information, see [DEPLOYMENT.md](DEPLOYMENT.md).

## Issue Reporting

### Bug Reports
Include the following information:
- Browser and version
- Device type (mobile/tablet/desktop)
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

### Feature Requests
- Describe the proposed feature
- Explain the business value
- Consider implementation complexity
- Provide mockups or examples if helpful

## Security Considerations

### Content Security
- Don't commit sensitive information (API keys, passwords)
- Use HTTPS for all external resources
- Validate and sanitize user inputs
- Follow secure coding practices

### Dependencies
- Keep any dependencies updated
- Review third-party integrations
- Monitor for security vulnerabilities

## Resources and Documentation

### Project Documentation
- [README.md](../README.md) - Project overview and setup
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment guide
- [ANALYTICS.md](ANALYTICS.md) - Analytics setup
- [CHANGELOG.md](CHANGELOG.md) - Version history

### External Resources
- [MDN Web Docs](https://developer.mozilla.org/) - Web development reference
- [Google Analytics Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## Contact and Support

For questions about contributing:
- Create an issue in the GitHub repository
- Reference existing documentation
- Follow the project's communication guidelines

## License

This project is proprietary to Puente Scientific. Contributors should respect the intellectual property and business requirements of the organization.

---

Thank you for contributing to the Puente Scientific website project! Your efforts help maintain and improve our professional online presence.
# Deployment Guide for Puente Scientific Website

## Overview

This document provides step-by-step instructions for deploying the Puente Scientific website to GitHub Pages and configuring the custom domain.

## Prerequisites

- GitHub account with repository access
- Domain management access (Google Workspace/Squarespace)
- Basic understanding of DNS configuration

## Deployment Steps

### 1. Enable GitHub Pages

1. Go to your repository settings: `https://github.com/puentesci/puentesci.github.io/settings`
2. Scroll down to the "Pages" section
3. Under "Source", select "Deploy from a branch"
4. Choose "main" branch and "/ (root)" folder
5. Click "Save"

### 2. Configure Custom Domain

The `CNAME` file has already been created with your domain `puentescientific.com`. GitHub Pages will automatically detect this and configure the custom domain.

### 3. DNS Configuration

You need to update your DNS records to point to GitHub Pages:

#### A Records (Root Domain)
Replace the existing A records with these GitHub Pages IP addresses:
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

#### CNAME Record (WWW Subdomain)
Create a CNAME record:
```
www.puentescientific.com → puentesci.github.io
```

### 4. Verify Deployment

1. Wait 5-10 minutes for GitHub Pages to build and deploy
2. Visit `https://puentesci.github.io` to verify the site is live
3. After DNS propagation (up to 48 hours), visit `https://puentescientific.com`

## SSL Certificate

GitHub Pages automatically provides SSL certificates for custom domains. Once your DNS is configured correctly, the certificate will be issued automatically.

## Content Updates

### Adding Content

1. **Images**: Place in `assets/images/` directory
2. **Pages**: Create new HTML files in the `pages/` directory
3. **Styles**: Add custom CSS to `assets/css/` files
4. **Scripts**: Add JavaScript to `assets/js/` files

### Content Management Workflow

1. Make changes to files locally or via GitHub web interface
2. Commit changes to the main branch
3. GitHub Pages automatically rebuilds and deploys (usually within 1-2 minutes)

## Performance Optimization

### Image Optimization
- Use WebP format when possible
- Compress images before uploading
- Use appropriate image sizes for different screen resolutions

### Caching
- Static assets are automatically cached by GitHub Pages
- Use versioning for CSS/JS files if needed (`style.css?v=1.1`)

### SEO Optimization
- Update meta tags in `index.html`
- Add structured data markup
- Create and submit sitemap to search engines

## Monitoring and Analytics

### Google Analytics Setup
1. Create a Google Analytics account
2. Add the tracking code to the `<head>` section of `index.html`
3. Replace the placeholder analytics code in `assets/js/main.js`

### Performance Monitoring
- Use Google PageSpeed Insights
- Monitor Core Web Vitals
- Set up Google Search Console

## Backup and Version Control

### Automatic Backups
- GitHub automatically maintains version history
- All changes are tracked in Git commits

### Manual Backups
- Clone repository locally: `git clone https://github.com/puentesci/puentesci.github.io.git`
- Export repository as ZIP from GitHub interface

## Troubleshooting

### Common Issues

1. **Site not loading after DNS change**
   - Wait up to 48 hours for DNS propagation
   - Check DNS records using online DNS lookup tools
   - Verify CNAME file contains correct domain

2. **SSL certificate not working**
   - Ensure DNS is properly configured
   - Wait for automatic certificate provisioning (can take up to 24 hours)
   - Check GitHub Pages settings for SSL status

3. **Changes not appearing**
   - Check GitHub Actions tab for build status
   - Clear browser cache
   - Verify changes were committed to main branch

### Support Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Custom Domain Configuration](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [DNS Configuration Help](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)

## Security Considerations

### HTTPS Enforcement
- Enable "Enforce HTTPS" in GitHub Pages settings
- Update any hardcoded HTTP links to HTTPS

### Content Security
- Regularly update dependencies
- Monitor for security vulnerabilities
- Use secure coding practices for any dynamic content

## Future Enhancements

### Planned Features
- Contact form backend integration
- Multi-language support
- Blog/news section
- Product catalog
- Client portal

### Technical Improvements
- Progressive Web App (PWA) features
- Advanced caching strategies
- API integrations
- Automated testing pipeline

## Related Documentation

### Project Documentation
- [README.md](../README.md) - Complete project overview and setup guide
- [ANALYTICS.md](ANALYTICS.md) - Google Analytics integration and tracking
- [CONTRIBUTING.md](CONTRIBUTING.md) - Development guidelines and contribution process
- [CHANGELOG.md](CHANGELOG.md) - Version history and release notes

### Quick Links
- **Live Website**: [https://puentescientific.com](https://puentescientific.com)
- **Repository**: [https://github.com/puentesci/puentesci.github.io](https://github.com/puentesci/puentesci.github.io)
- **GitHub Pages Settings**: Repository Settings > Pages section

## Contact Information

For technical support or questions about the deployment:
- Repository: https://github.com/puentesci/puentesci.github.io
- Issues: Create an issue in the GitHub repository
- Documentation: Complete guides available in the `docs/` directory

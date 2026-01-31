# 🚀 Local Development Guide

This guide explains how to set up and run the Puente Scientific website locally for development and testing.

## 📋 Prerequisites

- **Ruby 2.6+** (check with `ruby --version`)
- **Bundler gem** (install with `gem install bundler`)

## ⚡ Quick Start

### 1. Install Dependencies
```bash
bundle install --path vendor/bundle
```

### 2. Start Development Server
```bash
bundle exec jekyll serve --port 4000 --host 0.0.0.0
```

### 3. Access Your Site
- **Local**: `http://localhost:4000`
- **Network**: `http://0.0.0.0:4000` (accessible from other devices)

## 🔧 Development Features

- ✅ **Jekyll Processing**: Layouts, includes, and front matter
- ✅ **Live Reload**: Automatic browser refresh on file changes
- ✅ **GitHub Pages Compatible**: Matches production environment
- ✅ **Asset Optimization**: CSS/JS processing and minification
- ✅ **Cache Busting**: `{{ site.time }}` variables work correctly

## 📁 Project Structure

```
puentesci.github.io/
├── _layouts/           # Jekyll layouts
│   └── default.html   # Base layout template
├── _includes/         # Shared components
│   ├── head.html      # Meta tags, analytics, CSS
│   ├── header.html    # Navigation
│   ├── footer.html    # Footer content
│   └── scripts.html   # JavaScript includes
├── _config.yml        # Jekyll configuration
├── assets/            # Static assets (CSS, JS, images)
└── *.html            # Page content with YAML front matter
```

## 🛠️ Common Commands

### Start Development
```bash
bundle exec jekyll serve --port 4000 --host 0.0.0.0
```

### Build Site
```bash
bundle exec jekyll build
```

### Stop Server
```bash
pkill -f jekyll
```

### Clean Build
```bash
rm -rf _site/
bundle exec jekyll build
```

## 🐛 Troubleshooting

### Jekyll Won't Start
- **Issue**: "Invalid date" error
- **Solution**: Ensure `vendor/` is excluded in `_config.yml`
- **Check**: `exclude:` section includes `vendor`

### Permission Errors
- **Issue**: "You don't have write permissions"
- **Solution**: Use `bundle install --path vendor/bundle`
- **Alternative**: Use `bundle config set --local path 'vendor/bundle'`

### Port Already in Use
- **Issue**: "Address already in use"
- **Solution**: Use different port: `--port 4001`
- **Check**: `lsof -i :4000` to see what's using the port

### Missing Dependencies
- **Issue**: "Could not find gem"
- **Solution**: Run `bundle install` again
- **Check**: Ensure Gemfile exists and is valid

## 📝 Development Workflow

### 1. Make Changes
- Edit files in `_layouts/`, `_includes/`, or page files
- Jekyll automatically rebuilds and refreshes browser

### 2. Test Features
- Loading animations
- Navigation consistency
- Responsive design
- Asset loading

### 3. Commit Changes
```bash
git add .
git commit -m "Description of changes"
git push origin development
```

## 🌐 Deployment

### Development Branch
- Local testing only
- Use this guide for development

### Main Branch
- Auto-deploys to GitHub Pages
- Production environment
- Merge from development when ready

## 📚 Additional Resources

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Bundler Documentation](https://bundler.io/)

## 🆘 Need Help?

If you encounter issues:
1. Check this troubleshooting section
2. Verify Ruby and Bundler versions
3. Ensure all dependencies are installed
4. Check `_config.yml` exclusions
5. Review Jekyll logs for specific errors

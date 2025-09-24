# Puente Scientific Website

Jekyll-based static site for Puente Scientific, deployed on GitHub Pages.

Live: https://puentescientific.com

## Quick Links
- Local development: LOCAL_DEVELOPMENT.md
- Architecture (layouts/includes): WEBSITE_ARCHITECTURE.md
- Agent editing rules: AGENTS.md
- Deployment guide: docs/DEPLOYMENT.md
- Analytics: docs/ANALYTICS.md

## Local Development (TL;DR)
Prereqs: Ruby 2.6+ and Bundler

```bash
bundle install --path vendor/bundle
bundle exec jekyll serve --port 4000 --host 0.0.0.0
```

Visit http://localhost:4000.

## Project Structure
```
_layouts/        # Base layout(s)
_includes/       # Shared head, header, footer, scripts
assets/          # CSS/JS/images
*.html           # Content pages with YAML front matter
_config.yml      # Jekyll config (excludes build artifacts)
```

## Add a Page
Create `new-page.html` with:
```
---
layout: default
title: New Page - Puente Scientific
description: One-line summary
lang: en
---
<main id="main-content">Your content</main>
```

If you need extra assets, use front matter arrays:
- extra_css: ["assets/css/contact.css"]
- extra_scripts: ["assets/js/holoTitle.js"]

## Housekeeping
- Build output (`_site/`), vendored gems (`vendor/`), and bundler config (`.bundle/`) are ignored via .gitignore.
- Commit `Gemfile` and `Gemfile.lock` for reproducible local builds.
- Docs in `docs/` are not published to the site; they’re for maintainers.

## Notes
- Protected business content (hero title phrase, stats, Products link) must remain intact; see AGENTS.md and BUSINESS_CONTENT.md.

Last updated: September 2025

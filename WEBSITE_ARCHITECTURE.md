# Website Architecture (Jekyll Layout + Includes)

This repo was refactored to use a single Jekyll layout with shared includes. The goal is to eliminate duplication across pages (head/meta, navigation, footer, scripts) so changes are safer and faster.

## What Changed (High‑Impact 80/20)

- Centralized shared HTML into:
  - `_layouts/default.html` — page shell wrapping content
  - `_includes/head.html` — meta, favicon, fonts, global CSS, GA
  - `_includes/header.html` — site navigation
  - `_includes/footer.html` — site footer and legal
  - `_includes/scripts.html` — core JS bundle in correct order
- Converted pages to content‑only with YAML front matter (layout, title, description, lang, optional `extra_css` and `extra_scripts`).
- Standardized asset versioning using `?v={{ site.time }}` cache‑busting.
- Preserved all protected business content (hero title phrase, stats, Product link, focus on refurbished equipment).

## Why It Matters

- Update shared elements in one place (no more copy‑paste drift).
- Safer SEO and analytics changes: adjust once for all pages.
- Faster page additions; consistent styles, behavior, and performance.
- Cleaner diffs and simpler reviews.

## How To Work With It

- Edit nav once: `_includes/header.html`
- Edit footer once: `_includes/footer.html`
- Edit SEO/meta/GA/fonts/CSS once: `_includes/head.html`
- Edit shared scripts/order once: `_includes/scripts.html`
- Edit page content in its page file (e.g., `about.html`) — do not add `<html>`, `<head>`, or `<body>`.
- Use front matter to add page‑specific CSS/JS:
  - `extra_css: ["assets/css/contact.css"]`
  - `extra_scripts: ["assets/js/holoTitle.js"]`

## Adding a New Page

1. Create `new-page.html`:
   ```yaml
   ---
   layout: default
   title: New Page - Puente Scientific
   description: One‑line summary for SEO
   lang: en
   ---
   ```
2. Paste only the content (ideally wrapped in `<main id="main-content">…</main>` to keep skip‑link support).
3. If needed, add `extra_css` or `extra_scripts` arrays.
4. If a nav link is required, update `_includes/header.html`.

## Guardrails

- Do not remove the `Products` link from navigation.
- Preserve the index hero title phrase: “Bridging Science & Tech Trade”.
- Preserve the stats: 45% growth, 2025 launch, 85% savings.
- Keep `<main id="main-content">` in each page to maintain accessibility.
- See `AGENTS.md`, `PROTECTED_FILES.md`, and `BUSINESS_CONTENT.md` for detailed constraints.

## Local Dev

- See LOCAL_DEVELOPMENT.md for setup and common issues.
- Commit Gemfile and Gemfile.lock for reproducible local builds.
- Do not commit build output or vendored gems; they are ignored.

## Notes

- Domain is configured via `CNAME` (`puentescientific.com`); `_config.yml` sets `url` accordingly.
- GitHub Pages will build Jekyll automatically — no extra tooling required.

## 🚀 Local Development

### Quick Start
```bash
# Install dependencies
bundle install --path vendor/bundle

# Start development server
bundle exec jekyll serve --port 4000 --host 0.0.0.0
```

### Access
- **Local**: `http://localhost:4000`
- **Network**: `http://0.0.0.0:4000`

### Stop Server
```bash
pkill -f jekyll
```

**📖 Full Guide**: See `LOCAL_DEVELOPMENT.md` for detailed instructions.

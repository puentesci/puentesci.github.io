# Agent Guide: Site Architecture and Editing Rules

This repository now uses Jekyll layouts and includes to centralize shared HTML (head, navigation, footer, and scripts). This change reduces duplication and makes future updates safer and faster.

Scope: Entire repository.

## Structure

- `_layouts/default.html` — Base HTML shell. Wraps each page with `<html>`, `<head>`, `<body>`, shared header, footer, and scripts.
- `_includes/head.html` — Meta tags, favicon, fonts, global CSS, Google Analytics. Supports per‑page variables.
- `_includes/header.html` — Single source for the site navigation (Products link must remain present).
- `_includes/footer.html` — Single source for footer and legal links.
- `_includes/scripts.html` — Shared JS includes in correct order; supports per‑page scripts.
- Pages (e.g., `index.html`, `about.html`, `products.html`, `contact.html`, `privacy-policy.html`, `terms-of-service.html`) — Content only, with YAML front matter.

## Page Front Matter

Each page begins with YAML front matter, then contains only the page’s content (no `<html>`, `<head>`, `<body>`, nav, or footer tags).

Supported fields:

- `layout` — Always `default`.
- `title` — Page title.
- `description` — Meta description.
- `lang` — Document language code, e.g., `en`.
- `og_image` — Optional Open Graph image (defaults to `assets/images/logo.png`).
- `extra_css` — Optional array of additional stylesheets (paths relative to repo root). Example: `["assets/css/contact.css"]`.
- `extra_scripts` — Optional array of additional scripts (paths relative to repo root). Example: `["assets/js/holoTitle.js"]`.
- `body_class` — Optional class to add on `<body>` if needed.

Examples:

```yaml
---
layout: default
title: Products - Puente Scientific
description: Puente Scientific Products - High-quality refurbished laboratory equipment and emerging technologies
lang: en
extra_scripts:
  - assets/js/holoTitle.js
---
```

```yaml
---
layout: default
title: Contact - Puente Scientific
description: Contact Puente Scientific - Get in touch for professional export services and international trade solutions
lang: en
extra_css:
  - assets/css/contact.css
---
```

## Edit Where?

- Update navigation items or language/theme controls: `_includes/header.html`.
- Update SEO/meta, GA tag, fonts, or global CSS bundle: `_includes/head.html`.
- Update shared JS, load order, or add site‑wide scripts: `_includes/scripts.html`.
- Update footer content or legal links: `_includes/footer.html`.
- Page‑specific content only: individual `.html` files with front matter.

## Critical Business Content (do not alter)

- Index hero title must include the exact phrase: `Bridging Science & Tech Trade`.
- Stats must remain: `45%` growth, `2025` launch year, and `85%` savings.
- Navigation must include a visible `Products` link.
- Maintain business focus on emerging technologies and refurbished equipment wording.

Refer to `PROTECTED_FILES.md` and `BUSINESS_CONTENT.md` before editing sensitive areas.

## Accessibility and Behavior Contracts

- Keep the main content wrapper with id `main-content` to support the skip link (AccessibilityManager).
- Do not remove the `<nav id="navbar">` (provided by the layout) — JS relies on it.
- Maintain script order as defined in `_includes/scripts.html` (utils → config → managers → animations/components → main). Use `extra_scripts` for per‑page needs (e.g., `holoTitle.js` on Products).

## Adding a New Page

1. Create `new-page.html` with front matter:
   ```yaml
   ---
   layout: default
   title: New Page - Puente Scientific
   description: One‑line summary for SEO
   lang: en
   ---
   ```
2. Add only the page content (sections inside `<main>`). Do not duplicate head/nav/footer/scripts.
3. If you need extra CSS/JS, use `extra_css` / `extra_scripts` arrays.
4. If the nav needs a new link, update `_includes/header.html` once.

## Notes for AI and Agents

- Prefer targeted edits: change includes for shared UI; change a single page for its content.
- Do not re‑introduce duplicate head/nav/footer/script blocks into pages.
- Preserve protected phrases and numbers verbatim as listed above.
- When localizing text, leverage existing `data-translate` hooks; do not rename or remove them.
- Avoid replacing entire files unless the change is structural and preserves protected content (as done in this migration).

## Build/Hosting

- GitHub Pages builds Jekyll sites automatically. `_config.yml` sets `url: https://puentescientific.com` for correct Open Graph/Twitter URLs.
- Asset URLs use `?v={{ site.time }}` cache‑busting; no need to hand‑edit version strings.


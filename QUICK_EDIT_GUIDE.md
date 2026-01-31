# Quick Edit Guide - Effective Workflow

## 🎯 Most Effective Route for Making Edits

### Step 1: Edit Files (Server Auto-Reloads)
1. **Keep the Jekyll server running** (you should see it in a PowerShell window)
2. **Open files in your editor** (VS Code, Cursor, etc.)
3. **Make your changes**
4. **Save the file** (Ctrl+S)
5. **Refresh browser** at http://localhost:4000 to see changes instantly

### Step 2: Test Everything
- Check all pages you modified
- Test on different screen sizes (responsive design)
- Verify links work
- Check that animations/JS work correctly

### Step 3: Deploy to Production
Once you're happy with your changes:

```bash
# Stage all changes
git add .

# Commit with a descriptive message
git commit -m "Description of what you changed"

# Push to main branch (auto-deploys to GitHub Pages)
git push origin main
```

**GitHub Pages will automatically:**
- Rebuild your site (1-2 minutes)
- Deploy to https://puentescientific.com
- You can check build status in GitHub → Actions tab

---

## 📁 Where to Edit What

### **Page Content** (Text, sections, HTML)
- `index.html` - Homepage
- `about.html` - About page
- `products.html` - Products page
- `contact.html` - Contact page
- `privacy-policy.html` - Privacy policy
- `terms-of-service.html` - Terms of service

### **Navigation & Site-Wide Elements**
- `_includes/header.html` - Navigation menu (edit once, affects all pages)
- `_includes/footer.html` - Footer (edit once, affects all pages)
- `_includes/head.html` - Meta tags, SEO, fonts, global CSS
- `_layouts/default.html` - Base layout structure

### **Styling**
- `assets/css/main.css` - Main styles
- `assets/css/components.css` - Component styles
- `assets/css/animations.css` - Animation styles
- `assets/css/responsive.css` - Mobile/responsive styles
- `assets/css/contact.css` - Contact page specific styles
- `assets/css/variables.css` - CSS variables (colors, fonts, etc.)

### **JavaScript**
- `assets/js/main.js` - Main JavaScript
- `assets/js/animations.js` - Animation logic
- `assets/js/components.js` - Component interactions
- `assets/js/holoTitle.js` - Products page specific (holo effect)
- `assets/js/accessibility.js` - Accessibility features

### **Images**
- `assets/images/` - All images go here

---

## ⚡ Pro Tips

1. **Edit in one place, affects everywhere:**
   - Change navigation in `_includes/header.html` → updates on all pages
   - Change footer in `_includes/footer.html` → updates on all pages

2. **Page-specific assets:**
   - Use `extra_css` and `extra_scripts` in page front matter for page-specific files

3. **Protected content (don't change):**
   - Hero title must include: "Bridging Science & Tech Trade"
   - Stats: 45% growth, 2025 launch, 85% savings
   - Products link must remain in navigation

4. **Quick testing:**
   - Make small changes → save → refresh → verify
   - Test on mobile view (browser dev tools)

---

## 🚀 Example: Making a Simple Change

**Goal:** Change the homepage hero text

1. Open `index.html` in your editor
2. Find the hero section
3. Edit the text
4. Save (Ctrl+S)
5. Refresh http://localhost:4000
6. See your change!
7. If happy: `git add .`, `git commit -m "Updated hero text"`, `git push origin main`

---

## ⚠️ Important Notes

- **Always test locally first** before pushing to main
- **The server must be running** for auto-reload to work
- **Changes to `main` branch = live production site**
- **GitHub Pages rebuilds automatically** (check Actions tab if issues)

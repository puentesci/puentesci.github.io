# Quick Setup Guide for Local Testing

## Step 1: Install Ruby (if not already installed)

### Windows:
1. Download RubyInstaller from: https://rubyinstaller.org/downloads/
2. Choose **Ruby+Devkit 3.2.x** (recommended)
3. Run the installer
4. Check "Add Ruby executables to your PATH"
5. At the end, run the MSYS2 development toolchain installer when prompted

### Verify Installation:
Open a new PowerShell/Command Prompt and run:
```bash
ruby --version
gem --version
```

## Step 2: Install Bundler
```bash
gem install bundler
```

## Step 3: Install Jekyll Dependencies
Navigate to your project directory and run:
```bash
bundle install --path vendor/bundle
```

## Step 4: Start Local Server
```bash
bundle exec jekyll serve --port 4000 --host 0.0.0.0
```

## Step 5: View Your Site
- Open your browser and go to: **http://localhost:4000**
- The server will automatically reload when you make changes to files

## Stop the Server
Press `Ctrl+C` in the terminal

---

## Making Changes to the Main Website

### Option 1: Direct to Main Branch (Production)
1. Make your changes to files
2. Commit and push to main branch:
   ```bash
   git add .
   git commit -m "Description of your changes"
   git push origin main
   ```
3. GitHub Pages will automatically rebuild and deploy (usually 1-2 minutes)
4. Visit https://puentescientific.com to see your changes

### Option 2: Test First, Then Deploy (Recommended)
1. Test locally using the steps above
2. Once satisfied, commit and push to main branch
3. GitHub Pages auto-deploys

### Important Notes:
- Changes pushed to `main` branch automatically deploy to production
- GitHub Pages typically takes 1-2 minutes to rebuild
- Clear browser cache if changes don't appear immediately
- Check GitHub repository's "Actions" tab for build status

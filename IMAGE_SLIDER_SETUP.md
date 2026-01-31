# Image Slider Setup Instructions

## ✅ What's Been Added

I've created a fully functional image slider where the growth trajectory graph used to be. The slider includes:

- **Arrow navigation** (left/right buttons)
- **Dot indicators** (click to jump to any slide)
- **Keyboard navigation** (arrow keys)
- **Touch/swipe support** (for mobile devices)
- **Smooth transitions** and animations
- **Responsive design** (works on all screen sizes)

## 📸 Image Files Needed

You need to add 3 image files to the `assets/images/` folder:

1. **`sample-prep-kits.jpg`** - Sample Prep Kits image
2. **`hplc-columns.jpg`** - HPLC Columns image  
3. **`deuterium-lamps.jpg`** - Deuterium Lamps image

### How to Add Images:

1. Save your images with these exact filenames:
   - `sample-prep-kits.jpg`
   - `hplc-columns.jpg`
   - `deuterium-lamps.jpg`

2. Place them in: `assets/images/` folder

3. The slider will automatically use them!

## 🎨 Current Image Paths in Code

The slider is currently configured to look for:
- `assets/images/sample-prep-kits.jpg`
- `assets/images/hplc-columns.jpg`
- `assets/images/deuterium-lamps.jpg`

If your images have different names or formats (like `.png`), you can update the paths in `index.html` around line 95-115.

## ✨ Features

- **Auto-transitions**: Smooth sliding animation
- **Navigation**: Previous/Next buttons with arrow icons
- **Dot indicators**: Shows which slide is active
- **Accessibility**: Keyboard and screen reader support
- **Mobile-friendly**: Touch swipe gestures work
- **Dark mode**: Automatically adapts to your theme

## 🔧 Customization

If you want to change the slider behavior, edit:
- **HTML**: `index.html` (slider structure)
- **CSS**: `assets/css/main.css` (slider styles, starting around line 831)
- **JavaScript**: `assets/js/components.js` (slider functionality, ImageSliderComponent class)

The slider is now live and ready - just add your images!

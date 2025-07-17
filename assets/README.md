# Assets Folder Structure

This folder contains all the static assets for your Trading Book PDF selling website.

## Folder Structure

```
assets/
├── images/              # All image files
│   ├── book-cover.jpg   # Main book cover image
│   ├── book-page1.jpg   # Book page preview 1
│   ├── book-page2.jpg   # Book page preview 2
│   ├── book-page3.jpg   # Book page preview 3
│   ├── preview1.jpg     # Book preview image 1
│   ├── preview2.jpg     # Book preview image 2
│   ├── preview3.jpg     # Book preview image 3
│   ├── preview4.jpg     # Book preview image 4
│   ├── preview5.jpg     # Book preview image 5
│   └── logo.png         # Website logo (optional)
├── books/               # PDF files
│   └── trading-book.pdf # Your main trading book PDF
├── css/                 # Stylesheets
│   └── styles.css       # Main website styles
├── js/                  # JavaScript files
│   └── script.js        # Main website functionality
└── icons/               # Icon files (favicon, etc.)
    └── favicon.ico      # Website favicon (optional)
```

## Image Requirements

### Book Images (4 images for book showcase):
- **book-cover.jpg** - Main book cover (recommended: 400x500px)
- **book-page1.jpg** - Book page preview 1 (recommended: 400x500px)
- **book-page2.jpg** - Book page preview 2 (recommended: 400x500px)
- **book-page3.jpg** - Book page preview 3 (recommended: 400x500px)

### Preview Images (5 images for preview section):
- **preview1.jpg** - Book preview 1 (recommended: 300x400px)
- **preview2.jpg** - Book preview 2 (recommended: 300x400px)
- **preview3.jpg** - Book preview 3 (recommended: 300x400px)
- **preview4.jpg** - Book preview 4 (recommended: 300x400px)
- **preview5.jpg** - Book preview 5 (recommended: 300x400px)

## File Formats

### Images
- **Format**: JPG, PNG, or WebP
- **Quality**: High quality for best appearance
- **Size**: Optimized for web (under 500KB each)

### PDF
- **Format**: PDF
- **Name**: trading-book.pdf
- **Size**: Any size (will be downloaded by users)

## Adding Your Assets

1. **Images**: Place your 9 images in the `assets/images/` folder with the exact names listed above
2. **PDF**: Place your trading book PDF in the `assets/books/` folder as `trading-book.pdf`
3. **Logo** (optional): Add your logo as `assets/images/logo.png`
4. **Favicon** (optional): Add your favicon as `assets/icons/favicon.ico`

## Image Placeholder System

The website includes an automatic placeholder system. If any image is missing, it will show a placeholder with "Image Placeholder" text. This ensures your website won't break if images are missing.

## Optimization Tips

1. **Compress images** before uploading to reduce loading time
2. **Use consistent aspect ratios** for better visual appearance
3. **Test all images** on different devices to ensure they look good
4. **Keep file sizes reasonable** for faster loading

## Current Status

- ✅ Folder structure created
- ✅ CSS and JS files moved to assets
- ✅ HTML updated to use new asset paths
- ⏳ Add your 9 images to assets/images/
- ⏳ Add your PDF to assets/books/
- ⏳ Optional: Add logo and favicon

Your website is ready to use once you add your images and PDF files!

# The Last Algorithm - Landing Page

A high-impact landing page for "The Last Algorithm" by Jay Tarzwell - a meta-fiction thriller born from a real AI journalism scandal.

## About The Book

When AI hallucinated a book that didn't exist, one author made it real. "The Last Algorithm" is a mind-bending thriller written by AI about AI, based on the real-life scandal where journalist Marco Buscaglia's career was destroyed by fake AI-generated books.

## Features

- **Glitch-effect hero section** with animated title
- **Interactive timeline** showing the real events that inspired the book
- **Typewriter-effect sticky notes** revealing the AI's hidden messages
- **Responsive design** optimized for all devices
- **Meta-fiction elements** throughout the design
- **Direct Amazon purchase links** for paperback, eBook, and audiobook formats

## Deployment Instructions

### Option 1: Deploy to Netlify (Recommended)

1. **Create a GitHub repository:**
   ```bash
   cd LastAlgoWeb
   git init
   git add .
   git commit -m "Initial commit - The Last Algorithm landing page"
   ```

2. **Push to GitHub:**
   - Create a new repository on GitHub
   - Add the remote origin:
     ```bash
     git remote add origin https://github.com/YOUR_USERNAME/last-algorithm-landing.git
     git branch -M main
     git push -u origin main
     ```

3. **Deploy to Netlify:**
   - Go to [Netlify](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub account and select the repository
   - Deploy settings should be automatic (no build command needed)
   - Click "Deploy site"

4. **Custom Domain Setup:**
   - In Netlify site settings, go to "Domain management"
   - Click "Add custom domain"
   - Add your subdomain: `lastalgorithm.thechatbotgenius.com`
   - In your DNS provider (where thechatbotgenius.com is hosted):
     - Add a CNAME record:
       - Name: `lastalgorithm`
       - Value: `[your-netlify-site-name].netlify.app`
   - Wait for DNS propagation (usually 5-30 minutes)

### Option 2: Deploy to GitHub Pages

1. **Enable GitHub Pages:**
   - Go to your repository Settings
   - Scroll to "Pages" section
   - Source: Deploy from branch
   - Branch: main
   - Folder: / (root)
   - Save

2. **Custom Domain:**
   - Add a CNAME file to the root with your domain:
     ```
     lastalgorithm.thechatbotgenius.com
     ```
   - Configure DNS at your domain provider

### Option 3: Manual Deployment

Simply upload all files to your web server:
- `index.html`
- `styles.css`
- `script.js`
- `assets/` folder (when you add images)

## Required Assets

You'll need to add these images to an `assets/` folder:
1. **book-cover.jpg** - The book cover image (ideally 400x600px or similar ratio)
2. **og-image.jpg** - Open Graph image for social sharing (1200x630px recommended)
3. **favicon.ico** - Site favicon

## Customization

### Update Amazon Links
Replace the placeholder Amazon links in `index.html` with the actual format-specific links:
- Paperback link
- eBook link
- Audiobook link

### Analytics
Add your Google Analytics or other tracking code before the closing `</head>` tag:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR_ID');
</script>
```

## Performance Optimization

The site is already optimized for performance with:
- Minimal JavaScript
- CSS animations using GPU acceleration
- Lazy loading for images (add `loading="lazy"` to img tags)
- Optimized font loading

## Browser Support

The site works on all modern browsers:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## SEO Considerations

- Update meta descriptions as needed
- Add structured data for book information
- Submit sitemap to Google Search Console
- Consider adding a `robots.txt` file

## License

This landing page is created for Jay Tarzwell's "The Last Algorithm" book promotion.

## Contact

For questions about the book or landing page, contact Jay Tarzwell.

---

*"Probability that this README will be read: 94.7%"*
*"Probability that matters: 100%"*
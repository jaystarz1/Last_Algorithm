# The Last Algorithm - Landing Page Deployment

## 🚀 Quick Deploy to GitHub

Run these commands in your terminal:

```bash
cd /Users/jaytarzwell/LastAlgoWeb

# Initialize git
git init

# Add the remote repository
git remote add origin https://github.com/jaytarzwell/last-algorithm-landing.git

# Add all files
git add .

# Commit
git commit -m "Initial commit - The Last Algorithm landing page"

# Push to GitHub
git branch -M main
git push -u origin main
```

## 📦 What's Being Deployed

- **index.html** - Main landing page
- **styles.css** - All styling and animations
- **script.js** - Interactive features and Amazon localization
- **assets/** - Book cover and other images
- **README.md** - Documentation
- **.gitignore** - Git ignore rules

## 🌐 Netlify Setup

After pushing to GitHub:

1. Go to [Netlify](https://app.netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub** and authorize if needed
4. Select **`last-algorithm-landing`** repository
5. Deploy settings:
   - Build command: (leave empty)
   - Publish directory: (leave as root or .)
6. Click **"Deploy site"**

## 🔗 Custom Domain Setup

Once deployed on Netlify:

1. Go to **Site settings** → **Domain management**
2. Click **"Add custom domain"**
3. Enter: `lastalgorithm.thechatbotgenius.com`
4. Netlify will provide a value like: `amazing-einstein-a1b2c3.netlify.app`

## 📝 DNS Configuration

Add this to your DNS provider (where thechatbotgenius.com is hosted):

```
Type: CNAME
Name: lastalgorithm
Value: [your-site-name].netlify.app
TTL: 3600 (or default)
```

## ✅ Ready to Deploy!

The site is complete and ready for deployment. Just run the git commands above!

## 🎯 Features Included

- ✅ Glitch text effects
- ✅ Amazon localization (auto-detects country)
- ✅ Accessibility toggle for animations
- ✅ Mobile responsive
- ✅ SEO optimized
- ✅ Meta-fiction storytelling
- ✅ Real scandal timeline
- ✅ Customer reviews
- ✅ The Chatbot Genius branding
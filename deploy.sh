#!/bin/bash

# Navigate to the project directory
cd /Users/jaytarzwell/LastAlgoWeb

# Initialize git if not already initialized
git init

# Add the remote repository
git remote add origin https://github.com/jaytarzwell/last-algorithm-landing.git

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit - The Last Algorithm landing page

- High-impact landing page with glitch effects and tech-noir aesthetic
- Real-time Amazon localization for global visitors
- Accessibility toggle for animations
- Mobile responsive design
- Meta-fiction storytelling integrated throughout
- Sticky notes with AI 'comments' using typewriter effects
- Timeline of real events that inspired the book
- Customer reviews section
- Multiple CTA buttons for different formats
- Footer with The Chatbot Genius branding"

# Push to main branch
git branch -M main
git push -u origin main

echo "Successfully pushed to GitHub!"
echo "Repository: https://github.com/jaytarzwell/last-algorithm-landing"
echo ""
echo "Next steps for Netlify deployment:"
echo "1. Go to https://app.netlify.com"
echo "2. Click 'Add new site' → 'Import an existing project'"
echo "3. Choose GitHub and select 'last-algorithm-landing' repository"
echo "4. Deploy settings should be automatic (no build command needed)"
echo "5. After deployment, you'll get a URL like: https://[site-name].netlify.app"
echo "6. In Netlify's Domain Management, add custom domain: lastalgorithm.thechatbotgenius.com"
echo "7. Add the CNAME record to your DNS:"
echo "   - Name: lastalgorithm"
echo "   - Value: [your-netlify-site].netlify.app"
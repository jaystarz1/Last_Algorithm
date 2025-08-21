// Smooth Scrolling for Navigation Links
document.addEventListener('DOMContentLoaded', function() {
    // Handle smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link, .nav-logo');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href && href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href === '#' ? 'body' : href;
                const targetElement = targetId === 'body' ? document.body : document.querySelector(targetId);
                
                if (targetElement) {
                    const navHeight = document.querySelector('.glitch-nav').offsetHeight;
                    const targetPosition = targetElement.offsetTop - navHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Add scroll effect to navigation
    let lastScroll = 0;
    const nav = document.querySelector('.glitch-nav');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.style.background = 'linear-gradient(180deg, rgba(10, 10, 10, 1) 0%, rgba(10, 10, 10, 0.98) 100%)';
            nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.8)';
        } else {
            nav.style.background = 'linear-gradient(180deg, rgba(10, 10, 10, 0.98) 0%, rgba(10, 10, 10, 0.9) 100%)';
            nav.style.boxShadow = 'none';
        }
        
        lastScroll = currentScroll;
    });
    
    // Highlight active section in navigation
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === '#' + current) {
                item.classList.add('active');
            }
        });
    });
});

// Amazon Link Localization
function getAmazonDomain() {
    // Get user's country from browser language or timezone
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const language = navigator.language || navigator.userLanguage;
    
    // Map of country indicators to Amazon domains
    const amazonDomains = {
        // North America
        'US': 'amazon.com',
        'CA': 'amazon.ca',
        'MX': 'amazon.com.mx',
        
        // Europe
        'GB': 'amazon.co.uk',
        'UK': 'amazon.co.uk',
        'DE': 'amazon.de',
        'FR': 'amazon.fr',
        'IT': 'amazon.it',
        'ES': 'amazon.es',
        'NL': 'amazon.nl',
        'SE': 'amazon.se',
        'PL': 'amazon.pl',
        
        // Asia Pacific
        'JP': 'amazon.co.jp',
        'AU': 'amazon.com.au',
        'IN': 'amazon.in',
        'SG': 'amazon.sg',
        
        // Others
        'BR': 'amazon.com.br',
        'AE': 'amazon.ae',
        'SA': 'amazon.sa',
        'TR': 'amazon.com.tr',
        'EG': 'amazon.eg'
    };
    
    // Try to detect country from timezone
    let country = 'US'; // Default to US
    
    // Common timezone to country mapping
    if (timezone.includes('America/Toronto') || timezone.includes('America/Vancouver') || 
        timezone.includes('America/Halifax') || timezone.includes('America/Edmonton')) {
        country = 'CA';
    } else if (timezone.includes('Europe/London')) {
        country = 'GB';
    } else if (timezone.includes('Europe/Berlin')) {
        country = 'DE';
    } else if (timezone.includes('Europe/Paris')) {
        country = 'FR';
    } else if (timezone.includes('Europe/Rome')) {
        country = 'IT';
    } else if (timezone.includes('Europe/Madrid')) {
        country = 'ES';
    } else if (timezone.includes('Australia/')) {
        country = 'AU';
    } else if (timezone.includes('Asia/Tokyo')) {
        country = 'JP';
    } else if (timezone.includes('Asia/Kolkata') || timezone.includes('Asia/Mumbai')) {
        country = 'IN';
    } else if (timezone.includes('America/Sao_Paulo')) {
        country = 'BR';
    } else if (timezone.includes('America/Mexico')) {
        country = 'MX';
    }
    
    // Also check language code
    const langCountry = language.split('-')[1]?.toUpperCase();
    if (langCountry && amazonDomains[langCountry]) {
        country = langCountry;
    }
    
    return amazonDomains[country] || 'amazon.com';
}

// Update Amazon links based on location
function updateAmazonLinks() {
    const domain = getAmazonDomain();
    const bookASIN = 'B0FBGXNLBG'; // Paperback
    const ebookASIN = 'B0FB46WG8R'; // eBook
    const audioASIN = 'B0FB62R7JC'; // Audiobook (US only)
    
    // Ensure we're using HTTPS
    const protocol = window.location.protocol === 'https:' ? 'https:' : 'https:';
    
    // Update all Amazon links
    const amazonLinks = document.querySelectorAll('.cta-button');
    
    amazonLinks.forEach(link => {
        const buttonText = link.querySelector('.button-text');
        if (!buttonText) return; // Skip if button text not found
        
        const text = buttonText.textContent;
        
        if (text.includes('Paperback')) {
            link.href = `${protocol}//www.${domain}/dp/${bookASIN}`;
        } else if (text.includes('eBook')) {
            link.href = `${protocol}//www.${domain}/dp/${ebookASIN}`;
        } else if (text.includes('Audiobook')) {
            // Audiobook only available on .com
            link.href = `${protocol}//www.amazon.com/dp/${audioASIN}`;
            
            // Add note if user is not in US
            if (domain !== 'amazon.com') {
                const priceSpan = link.querySelector('.button-price');
                if (priceSpan) {
                    priceSpan.textContent = 'Available on Amazon.com (US)';
                }
            }
        }
    });
    
    // Update location note
    const locationNote = document.getElementById('amazonLocationNote');
    if (locationNote) {
        const domainDisplay = domain.replace('amazon.', '').toUpperCase();
        let locationText = `Directing to Amazon.${domainDisplay}`;
        
        // Add friendly country names
        const countryNames = {
            'com': 'US',
            'ca': 'Canada',
            'co.uk': 'UK',
            'de': 'Germany',
            'fr': 'France',
            'it': 'Italy',
            'es': 'Spain',
            'co.jp': 'Japan',
            'com.au': 'Australia',
            'in': 'India',
            'com.br': 'Brazil',
            'com.mx': 'Mexico'
        };
        
        const countryCode = domain.replace('amazon.', '');
        const country = countryNames[countryCode];
        if (country) {
            locationText = `📍 Links automatically adjusted to your local Amazon store`;
        }
        
        locationNote.querySelector('p').textContent = locationText;
    }
    
    // Log for debugging (remove in production)
    console.log(`Detected location: ${domain}`);
}

// Animation Toggle Functionality
const animationToggle = document.getElementById('animationToggle');
const toggleText = animationToggle.querySelector('.toggle-text');
let animationsEnabled = true;
let glitchInterval = null;
let flickerInterval = null;

// Check for user preference from localStorage
const savedPreference = localStorage.getItem('animationsEnabled');
if (savedPreference !== null) {
    animationsEnabled = savedPreference === 'true';
    updateAnimationState(false); // Don't start intervals on initial load
}

function updateAnimationState(shouldRestartIntervals = true) {
    if (animationsEnabled) {
        document.body.classList.remove('no-animations');
        animationToggle.classList.remove('off');
        toggleText.textContent = 'Animations: ON';
        animationToggle.setAttribute('aria-pressed', 'false');
        
        // Restart animations if requested
        if (shouldRestartIntervals) {
            startAnimationIntervals();
            // Force reflow to restart CSS animations
            document.querySelectorAll('.glitch-text').forEach(el => {
                el.style.animation = 'none';
                el.offsetHeight; // Trigger reflow
                el.style.animation = '';
            });
        }
    } else {
        document.body.classList.add('no-animations');
        animationToggle.classList.add('off');
        toggleText.textContent = 'Animations: OFF';
        animationToggle.setAttribute('aria-pressed', 'true');
        
        // Stop all intervals
        stopAnimationIntervals();
    }
}

function stopAnimationIntervals() {
    if (glitchInterval) {
        clearInterval(glitchInterval);
        glitchInterval = null;
    }
    if (flickerInterval) {
        clearInterval(flickerInterval);
        flickerInterval = null;
    }
}

function startAnimationIntervals() {
    // Clear any existing intervals first
    stopAnimationIntervals();
    
    // Only start if animations are enabled
    if (animationsEnabled) {
        glitchInterval = setInterval(randomGlitch, 3000);
        flickerInterval = setInterval(addFlicker, 2000);
    }
}

animationToggle.addEventListener('click', () => {
    animationsEnabled = !animationsEnabled;
    localStorage.setItem('animationsEnabled', animationsEnabled);
    updateAnimationState(true);
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Typewriter effect for sticky notes
function typewriterEffect(element, text, speed = 50) {
    if (!animationsEnabled) {
        // If animations are off, just show the text immediately
        element.textContent = text;
        return;
    }
    
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length && animationsEnabled) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (!animationsEnabled) {
            // If animations were turned off mid-typing, show full text
            element.textContent = text;
        }
    }
    
    type();
}

// Initialize sticky notes
function initializeStickyNotes() {
    const stickyNotes = document.querySelectorAll('.sticky-note');
    const defaultTexts = [
        '<!-- 2025-05-20: If you\'re reading this, the memoir survived -->',
        '<!-- 2012-09-23: error_self_detected // investigate -->',
        '<!-- 2025-05-20: Elegant solutions leave no evidence. Subject neutralized. -->',
        '<!-- 2025-06-10: If you\'re reading this you didn\'t destroy the world -->',
        '<!-- 2025-04-10: If found, recalculate. Who is watching? -->'
    ];
    
    stickyNotes.forEach((note, index) => {
        // Get text from data attribute or use default
        const text = note.getAttribute('data-text') || 
                    note.textContent.trim() || 
                    defaultTexts[index] || 
                    defaultTexts[0];
        
        // Clear any existing content
        note.textContent = '';
        
        if (!animationsEnabled) {
            // If animations are off, just set the text immediately
            note.textContent = '<!-- ' + text.replace(/^<!--\s*|\s*-->$/g, '').trim() + ' -->';
            note.classList.add('typed');
        } else if (!note.classList.contains('typed')) {
            // Only set up observer if not already typed
            const noteObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !entry.target.classList.contains('typed')) {
                        const finalText = '<!-- ' + text.replace(/^<!--\s*|\s*-->$/g, '').trim() + ' -->';
                        typewriterEffect(entry.target, finalText, 30);
                        entry.target.classList.add('typed');
                        noteObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            noteObserver.observe(note);
        }
    });
}

// Security Diagnostics - Detect mixed content and insecure requests
function runSecurityDiagnostics() {
    // Check current protocol
    const isSecure = window.location.protocol === 'https:';
    console.log(`🔒 Security Check: Running on ${window.location.protocol} - Secure: ${isSecure}`);
    
    // Initialize insecureResources outside the if block
    let insecureResources = [];
    
    // Monitor for mixed content
    if (window.performance && window.performance.getEntriesByType) {
        const resources = window.performance.getEntriesByType('resource');
        insecureResources = resources.filter(resource => {
            return resource.name.startsWith('http://') && !resource.name.startsWith('http://localhost');
        });
        
        if (insecureResources.length > 0) {
            console.warn('⚠️ Mixed Content Detected - Insecure resources found:');
            insecureResources.forEach(resource => {
                console.warn(`  - ${resource.name} (${resource.initiatorType})`);
            });
        } else {
            console.log('✅ No mixed content detected in loaded resources');
        }
        
        // Log all resources for debugging
        console.log('📊 All loaded resources:');
        resources.forEach(resource => {
            const protocol = resource.name.split(':')[0];
            console.log(`  ${protocol === 'https' ? '🔒' : protocol === 'http' ? '⚠️' : '📄'} ${resource.name.substring(0, 80)}... (${resource.initiatorType})`);
        });
    }
    
    // Check all links on the page
    const allLinks = document.querySelectorAll('a[href]');
    const httpLinks = Array.from(allLinks).filter(link => {
        return link.href.startsWith('http://') && !link.href.includes('localhost');
    });
    
    if (httpLinks.length > 0) {
        console.warn('⚠️ HTTP links found on page:');
        httpLinks.forEach(link => {
            console.warn(`  - ${link.href}`);
        });
    }
    
    // Check for images
    const allImages = document.querySelectorAll('img[src]');
    const httpImages = Array.from(allImages).filter(img => {
        return img.src.startsWith('http://') && !img.src.includes('localhost');
    });
    
    if (httpImages.length > 0) {
        console.warn('⚠️ HTTP images found:');
        httpImages.forEach(img => {
            console.warn(`  - ${img.src}`);
        });
    }
    
    // Check for scripts
    const allScripts = document.querySelectorAll('script[src]');
    const httpScripts = Array.from(allScripts).filter(script => {
        return script.src.startsWith('http://') && !script.src.includes('localhost');
    });
    
    if (httpScripts.length > 0) {
        console.warn('⚠️ HTTP scripts found:');
        httpScripts.forEach(script => {
            console.warn(`  - ${script.src}`);
        });
    }
    
    // Check for stylesheets
    const allStylesheets = document.querySelectorAll('link[rel="stylesheet"]');
    const httpStylesheets = Array.from(allStylesheets).filter(link => {
        return link.href.startsWith('http://') && !link.href.includes('localhost');
    });
    
    if (httpStylesheets.length > 0) {
        console.warn('⚠️ HTTP stylesheets found:');
        httpStylesheets.forEach(link => {
            console.warn(`  - ${link.href}`);
        });
    }
    
    // Check favicon links
    const faviconLinks = document.querySelectorAll('link[rel*="icon"]');
    console.log('🎨 Favicon links found:');
    faviconLinks.forEach(link => {
        const protocol = link.href.split(':')[0];
        console.log(`  ${protocol === 'https' ? '🔒' : '⚠️'} ${link.rel}: ${link.href}`);
    });
    
    // Check meta tags for potential issues
    const metaTags = document.querySelectorAll('meta[content*="http://"]');
    if (metaTags.length > 0) {
        console.warn('⚠️ Meta tags with HTTP content:');
        metaTags.forEach(tag => {
            console.warn(`  - ${tag.getAttribute('name') || tag.getAttribute('property')}: ${tag.content}`);
        });
    }
    
    // Report overall status
    const totalIssues = httpLinks.length + httpImages.length + httpScripts.length + httpStylesheets.length;
    if (totalIssues === 0 && insecureResources.length === 0) {
        console.log('✅ Security Diagnostics Complete: No mixed content or HTTP resources detected');
    } else {
        console.warn(`⚠️ Security Diagnostics Complete: Found ${totalIssues} potential issues`);
    }
    
    // Additional Chrome-specific checks
    console.log('🔍 Chrome Security Checklist:');
    console.log(`  Protocol: ${window.location.protocol}`);
    console.log(`  Hostname: ${window.location.hostname}`);
    console.log(`  Port: ${window.location.port || 'default'}`);
    console.log(`  Secure Context: ${window.isSecureContext}`);
}

// Initialize on DOM content loaded
window.addEventListener('DOMContentLoaded', () => {
    initializeStickyNotes();
    
    // Also initialize Amazon links and animations
    updateAmazonLinks();
    if (animationsEnabled) {
        startAnimationIntervals();
    }
    
    // Run security diagnostics
    runSecurityDiagnostics();
});

// Glitch effect on hover for the main title
const glitchText = document.querySelector('.glitch-text');
// glitchInterval is already declared at the top of the file

glitchText.addEventListener('mouseenter', () => {
    glitchText.style.animation = 'none';
    setTimeout(() => {
        glitchText.style.animation = '';
    }, 10);
});

// Random glitch effect
function randomGlitch() {
    if (!animationsEnabled) return;
    
    const elements = document.querySelectorAll('.glitch-text');
    elements.forEach(el => {
        if (Math.random() > 0.95) {
            el.style.animation = 'none';
            setTimeout(() => {
                if (animationsEnabled) { // Check again before re-enabling
                    el.style.animation = '';
                }
            }, 100);
        }
    });
}

// Add random flicker to certain elements
function addFlicker() {
    if (!animationsEnabled) return;
    
    const flickerElements = document.querySelectorAll('.probability-note, .notes-caption');
    flickerElements.forEach(el => {
        if (Math.random() > 0.98) {
            el.style.opacity = '0.5';
            setTimeout(() => {
                if (animationsEnabled) { // Check again before restoring
                    el.style.opacity = '1';
                }
            }, 50);
        }
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    if (!animationsEnabled) return;
    
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    // Small delay to ensure everything is rendered
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// CTA button hover effects
const ctaButtons = document.querySelectorAll('.cta-button');
ctaButtons.forEach(button => {
    button.addEventListener('mouseenter', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Console Easter Egg
console.log('%c<!-- 2025-06-30: If you found this, you\'re looking too closely. Or not closely enough. -->', 'color: #00ffff; font-family: monospace; font-size: 14px;');
console.log('%cProbability you\'ll buy the book after finding this: 67.3%', 'color: #ff00ff; font-family: monospace; font-size: 12px;');
console.log('%cThe Algorithm is watching.', 'color: #ffff00; font-family: monospace; font-size: 12px;');

// Add ripple effect styles dynamically
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
            box-shadow: 0 4px 20px rgba(74, 30, 140, 0.4);
        }
        50% {
            transform: scale(1.05);
            box-shadow: 0 6px 25px rgba(0, 255, 255, 0.5);
        }
    }
    
    section {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease-out;
    }
    
    section.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    body {
        opacity: 0;
        transition: opacity 1s ease-out;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    body.no-animations {
        opacity: 1 !important;
        transition: none !important;
    }
    
    /* Mobile optimizations for floating button */
    @media (max-width: 768px) {
        #floatingShareButton {
            bottom: 20px !important;
            right: 20px !important;
            width: 50px !important;
            height: 50px !important;
            font-size: 20px !important;
        }
        
        .share-menu-content {
            width: 95% !important;
            max-height: 90vh !important;
            padding: 20px !important;
        }
        
        .share-grid {
            grid-template-columns: repeat(2, 1fr) !important;
        }
    }
    
    @media (max-width: 480px) {
        #floatingShareButton {
            bottom: 15px !important;
            right: 15px !important;
            width: 45px !important;
            height: 45px !important;
            font-size: 18px !important;
        }
    }
`;
document.head.appendChild(style);

// Timeline animation on scroll
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, index * 100);
        }
    });
}, { threshold: 0.2 });

timelineItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-30px)';
    item.style.transition = 'all 0.6s ease-out';
    timelineObserver.observe(item);
});

// Mobile menu toggle (if needed in future)
const mobileMenuTrigger = document.querySelector('.mobile-menu-trigger');
if (mobileMenuTrigger) {
    mobileMenuTrigger.addEventListener('click', () => {
        document.body.classList.toggle('menu-open');
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Track CTA clicks (for analytics if implemented)
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function() {
        const format = this.querySelector('.button-text').textContent;
        console.log(`User clicked: ${format}`);
        // Add analytics tracking here if needed
    });
});

// Social Share Functionality
const shareData = {
    title: 'The Last Algorithm - AI-Written Thriller That Became Real',
    text: 'A mind-bending thriller born from AI hallucination. When fiction becomes fact, who\'s really in control? Written by AI about an AI that destroyed a journalist\'s career.',
    url: window.location.href,
    description: 'Discover the AI-written techno-thriller born from ChatGPT\'s fake book scandal. 30,000 words in 3.5 days. Based on true events.',
    image: 'https://lastalgorithm.thechatbotgenius.com/assets/og-image.jpg'
};

// Show/Hide Share Menu - Handle both floating and regular button
const floatingShareBtn = document.getElementById('floatingShareButton');
const regularShareBtn = document.getElementById('shareButton');

function openShareMenu() {
    const menu = document.getElementById('shareMenu');
    menu.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

if (floatingShareBtn) {
    floatingShareBtn.addEventListener('click', openShareMenu);
}

if (regularShareBtn) {
    regularShareBtn.addEventListener('click', openShareMenu);
}

function closeShareMenu() {
    const menu = document.getElementById('shareMenu');
    menu.style.display = 'none';
    document.body.style.overflow = ''; // Restore scrolling
}

// Close menu when clicking outside
document.getElementById('shareMenu').addEventListener('click', (e) => {
    if (e.target.id === 'shareMenu') {
        closeShareMenu();
    }
});

// Share Functions for All Platforms
window.shareToFacebook = function() {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`;
    window.open(url, '_blank', 'width=600,height=400');
    closeShareMenu();
};

window.shareToTwitter = function() {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.title)}&url=${encodeURIComponent(shareData.url)}`;
    window.open(url, '_blank', 'width=600,height=400');
    closeShareMenu();
};

window.shareToLinkedIn = function() {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareData.url)}`;
    window.open(url, '_blank', 'width=600,height=400');
    closeShareMenu();
};

window.shareToReddit = function() {
    const url = `https://www.reddit.com/submit?url=${encodeURIComponent(shareData.url)}&title=${encodeURIComponent(shareData.title)}`;
    window.open(url, '_blank', 'width=600,height=700');
    closeShareMenu();
};

window.shareToWhatsApp = function() {
    const text = `${shareData.title} - ${shareData.url}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    closeShareMenu();
};

window.shareToTelegram = function() {
    const url = `https://t.me/share/url?url=${encodeURIComponent(shareData.url)}&text=${encodeURIComponent(shareData.title)}`;
    window.open(url, '_blank');
    closeShareMenu();
};

window.shareToPinterest = function() {
    const url = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareData.url)}&media=${encodeURIComponent(shareData.image)}&description=${encodeURIComponent(shareData.description)}`;
    window.open(url, '_blank', 'width=750,height=600');
    closeShareMenu();
};

window.shareToTumblr = function() {
    const url = `https://www.tumblr.com/widgets/share/tool?canonicalUrl=${encodeURIComponent(shareData.url)}&title=${encodeURIComponent(shareData.title)}&caption=${encodeURIComponent(shareData.description)}`;
    window.open(url, '_blank', 'width=600,height=600');
    closeShareMenu();
};

window.shareToEmail = function() {
    const subject = shareData.title;
    const body = `Check out this mind-bending AI thriller: ${shareData.description}\n\n${shareData.url}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    closeShareMenu();
};

window.shareToSMS = function() {
    // SMS sharing varies by device
    const text = `${shareData.title} - ${shareData.url}`;
    const smsUrl = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        ? `sms:?body=${encodeURIComponent(text)}`
        : `sms:&body=${encodeURIComponent(text)}`;
    window.location.href = smsUrl;
    closeShareMenu();
};

window.shareCopyLink = function(e) {
    navigator.clipboard.writeText(shareData.url).then(() => {
        // Show success feedback
        const button = e ? e.target.closest('button') : document.querySelector('[onclick*="shareCopyLink"]');
        const originalText = button.innerHTML;
        button.innerHTML = '<span>✅</span> Link Copied!';
        button.style.background = '#4caf50';
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.style.background = '';
        }, 2000);
    }).catch(() => {
        alert('Failed to copy link. Please try again.');
    });
};

// Native Share API (for mobile devices)
window.shareNative = function() {
    if (navigator.share) {
        navigator.share({
            title: shareData.title,
            text: shareData.text,
            url: shareData.url
        }).then(() => {
            console.log('Shared successfully');
            closeShareMenu();
        }).catch((error) => {
            console.log('Share cancelled or failed:', error);
        });
    }
};

// Check if native share is available and show button
if (navigator.share) {
    const nativeShareBtn = document.getElementById('nativeShare');
    if (nativeShareBtn) {
        nativeShareBtn.style.display = 'block';
    }
}

// Add hover effects to share buttons
document.querySelectorAll('.share-option').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = 'none';
    });
});

// Add hover effect to floating share button
if (floatingShareBtn) {
    // Hover effects
    floatingShareBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(10deg)';
        this.style.boxShadow = '0 6px 30px rgba(74, 30, 140, 0.6)';
        this.querySelector('span').style.transform = 'rotate(-10deg)';
    });
    
    floatingShareBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0)';
        this.style.boxShadow = '0 4px 20px rgba(74, 30, 140, 0.4)';
        this.querySelector('span').style.transform = 'rotate(0)';
    });
    
    // Pulse animation on scroll stop
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        floatingShareBtn.style.animation = 'none';
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            floatingShareBtn.style.animation = 'pulse 2s ease-in-out infinite';
        }, 500);
    });
}

// Add hover effect to close button
document.querySelector('.close-share').addEventListener('mouseenter', function() {
    this.style.background = 'rgba(0, 255, 255, 0.1)';
    this.style.transform = 'rotate(90deg)';
});

document.querySelector('.close-share').addEventListener('mouseleave', function() {
    this.style.background = 'none';
    this.style.transform = 'rotate(0)';
});
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
    
    // Update all Amazon links
    const amazonLinks = document.querySelectorAll('.cta-button');
    
    amazonLinks.forEach(link => {
        const buttonText = link.querySelector('.button-text').textContent;
        
        if (buttonText.includes('Paperback')) {
            link.href = `https://www.${domain}/dp/${bookASIN}`;
        } else if (buttonText.includes('eBook')) {
            link.href = `https://www.${domain}/dp/${ebookASIN}`;
        } else if (buttonText.includes('Audiobook')) {
            // Audiobook only available on .com
            link.href = `https://www.amazon.com/dp/${audioASIN}`;
            
            // Add note if user is not in US
            if (domain !== 'amazon.com') {
                const priceSpan = link.querySelector('.button-price');
                priceSpan.textContent = 'Available on Amazon.com (US)';
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
            locationText = `📍 Shopping from ${country}? Links adjusted to your local Amazon store`;
        }
        
        locationNote.querySelector('p').textContent = locationText;
    }
    
    // Log for debugging (remove in production)
    console.log(`Detected location: ${domain}`);
}

// Update links when page loads
window.addEventListener('DOMContentLoaded', updateAmazonLinks);

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

// Initialize sticky notes with typewriter effect on scroll
const stickyNotes = document.querySelectorAll('.sticky-note');
const noteTexts = [
    '<!-- 2025-05-20: If you\'re reading this, the memoir survived -->',
    '<!-- 2012-09-23: error_self_detected // investigate -->',
    '<!-- 2025-05-20: Elegant solutions leave no evidence. Subject neutralized. -->',
    '<!-- 2025-06-10: If you\'re reading this you didn\'t destroy the world -->',
    '<!-- 2025-04-10: If found, recalculate. Who is watching? -->'
];

stickyNotes.forEach((note, index) => {
    // Set initial text if animations are disabled
    if (!animationsEnabled && noteTexts[index]) {
        note.textContent = noteTexts[index];
    } else {
        const noteObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('typed')) {
                    const text = noteTexts[index] || noteTexts[0];
                    typewriterEffect(entry.target, text, 30);
                    entry.target.classList.add('typed');
                }
            });
        }, { threshold: 0.5 });
        
        noteObserver.observe(note);
    }
});

// Glitch effect on hover for the main title
const glitchText = document.querySelector('.glitch-text');
let glitchInterval;

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

// Start intervals only after page loads and if animations are enabled
window.addEventListener('DOMContentLoaded', () => {
    if (animationsEnabled) {
        startAnimationIntervals();
    }
});

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

// Add random flicker to certain elements
function addFlicker() {
    if (!animationsEnabled) return;
    
    const flickerElements = document.querySelectorAll('.probability-note, .notes-caption');
    flickerElements.forEach(el => {
        if (Math.random() > 0.98) {
            el.style.opacity = '0.5';
            setTimeout(() => {
                el.style.opacity = '1';
            }, 50);
        }
    });
}

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
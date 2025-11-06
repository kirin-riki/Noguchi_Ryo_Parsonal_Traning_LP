// ========================================
// ADEN-Inspired Enhanced JavaScript
// ========================================

// ========================================
// DOM Elements
// ========================================
const header = document.getElementById('header');
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav-link');
const logo = document.querySelector('.logo');

// ========================================
// First View Slideshow
// ========================================
const fvImages = document.querySelectorAll('.fv-image');
let currentImageIndex = 0;

function changeSlide() {
    // Remove active class from current image
    fvImages[currentImageIndex].classList.remove('active');

    // Move to next image
    currentImageIndex = (currentImageIndex + 1) % fvImages.length;

    // Add active class to new image
    fvImages[currentImageIndex].classList.add('active');
}

// Change slide every 3 seconds
setInterval(changeSlide, 3000);

// ========================================
// Hamburger Menu Toggle
// ========================================
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
});

// Close menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
    }
});

// ========================================
// Smooth Scroll with Offset
// ========================================
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');

        // Only handle anchor links (starting with #)
        if (href.startsWith('#')) {
            e.preventDefault();

            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ========================================
// Logo Click - Scroll to Top
// ========================================
logo.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========================================
// Header Scroll Effect - ADEN Style
// ========================================
let lastScroll = 0;
const scrollThreshold = 100;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add scrolled class for styling
    if (currentScroll > scrollThreshold) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ========================================
// Scroll Reveal Animation - ADEN Style
// ========================================
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // Trigger when 15% of element is visible
};

// Generic scroll reveal observer for all reveal classes
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Optionally unobserve after revealing (one-time animation)
            // revealObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply scroll reveal to all elements with reveal classes
const allRevealElements = document.querySelectorAll(
    '.reveal, .reveal-fade, .reveal-left, .reveal-right, .reveal-scale'
);

allRevealElements.forEach(el => {
    revealObserver.observe(el);
});

// Legacy support for specific elements (if they exist)
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

const legacyRevealElements = document.querySelectorAll('.service-item, .voice-item, .price-card');
legacyRevealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    scrollObserver.observe(el);
});

// ========================================
// Active Navigation Highlight - ADEN Style
// ========================================
const sections = document.querySelectorAll('section[id]');

const highlightNavigation = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - header.offsetHeight - 100;
        const sectionId = section.getAttribute('id');
        const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active-link'));
            correspondingLink?.classList.add('active-link');
        }
    });
};

window.addEventListener('scroll', highlightNavigation);

// ========================================
// Parallax Effect for First View
// ========================================
const fvImage = document.querySelector('.fv-image');

if (fvImage) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;

        if (scrolled < window.innerHeight) {
            fvImage.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
}

// ========================================
// Fade-in Sections on Scroll
// ========================================
const sectionObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, sectionObserverOptions);

// Apply to section titles
const sectionTitles = document.querySelectorAll('.section-title');
sectionTitles.forEach(title => {
    title.style.opacity = '0';
    title.style.transform = 'translateY(30px)';
    title.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    sectionObserver.observe(title);
});

// ========================================
// Concept Section Animation
// ========================================
const conceptPhilosophy = document.querySelector('.concept-philosophy');
if (conceptPhilosophy) {
    conceptPhilosophy.style.opacity = '0';
    conceptPhilosophy.style.transform = 'translateY(40px)';
    conceptPhilosophy.style.transition = 'opacity 1s ease, transform 1s ease';

    const conceptObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.2 });

    conceptObserver.observe(conceptPhilosophy);
}

// ========================================
// Service Item Staggered Animation
// ========================================
const serviceItems = document.querySelectorAll('.service-item');
serviceItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
});

// ========================================
// Profile Image Animation Effect
// ========================================
const profileImageContainer = document.querySelector('.profile-image');
if (profileImageContainer) {
    const profileObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a class for animation instead of directly setting style
                entry.target.classList.add('profile-revealed');
                // Unobserve after animation to allow hover effect to work
                profileObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    profileObserver.observe(profileImageContainer);
}

// ========================================
// Smooth Page Load
// ========================================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease';
});

// Initial body opacity
document.body.style.opacity = '0';

// ========================================
// Cursor Follow Effect (Optional - Subtle)
// ========================================
// Uncomment if you want a subtle cursor effect
/*
const cursor = document.createElement('div');
cursor.style.cssText = `
    position: fixed;
    width: 10px;
    height: 10px;
    border: 1px solid #000;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.1s ease;
    mix-blend-mode: difference;
`;
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 5 + 'px';
    cursor.style.top = e.clientY - 5 + 'px';
});

// Scale up cursor on interactive elements
const interactiveElements = document.querySelectorAll('a, button, .service-item, .voice-item, .price-card');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
    });
});
*/

// ========================================
// Lazy Loading Images Enhancement
// ========================================
const lazyImages = document.querySelectorAll('img[loading="lazy"]');

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;

                // Only set opacity to 0 if image is not yet loaded
                if (!img.complete) {
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.5s ease';

                    img.onload = () => {
                        img.style.opacity = '1';
                    };
                } else {
                    // Image already loaded, just show it
                    img.style.opacity = '1';
                }

                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// Scroll Progress Indicator (Optional)
// ========================================
// Uncomment if you want a scroll progress bar
/*
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #000;
    z-index: 10000;
    transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
});
*/

// ========================================
// Enhanced Service Item Hover Effect
// ========================================
serviceItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });

    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ========================================
// Debug: Log when animations trigger (remove in production)
// ========================================
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('ADEN-inspired landing page loaded');
    console.log('Service items:', serviceItems.length);
    console.log('Voice items:', document.querySelectorAll('.voice-item').length);
}

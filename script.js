// JavaScript for EnergyWise Website
// Handles page navigation, active states, and user interactions

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the website
    initializeNavigation();
    initializeUserName();
    addNavigationEffects();
});

/**
 * Initialize navigation functionality
 */
function initializeNavigation() {
    // Show home page by default
    showPage('home');
    
    // Add click event listeners to all navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            showPage(page);
        });
    });
}

/**
 * Show specified page and update navigation state
 * @param {string} pageId - The ID of the page to show
 */
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Update navigation active states
    updateNavigation(pageId);
    
    // Update page title
    updatePageTitle(pageId);
    
    // Smooth scroll to top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    // Add page transition effect
    addPageTransition();
}

/**
 * Update navigation active states
 * @param {string} activePageId - The ID of the currently active page
 */
function updateNavigation(activePageId) {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('data-page');
        
        if (linkPage === activePageId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * Update page title based on current page
 * @param {string} pageId - The ID of the current page
 */
function updatePageTitle(pageId) {
    const titles = {
        'home': 'Energy Efficient Appliances Australia',
        'televisions': 'Energy Efficient Televisions - EnergyWise',
        'about': 'About Us - EnergyWise'
    };
    
    document.title = titles[pageId] || 'EnergyWise Australia';
}

/**
 * Add page transition effect
 */
function addPageTransition() {
    const activePage = document.querySelector('.page.active');
    if (activePage) {
        activePage.style.opacity = '0';
        activePage.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            activePage.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            activePage.style.opacity = '1';
            activePage.style.transform = 'translateY(0)';
        }, 50);
    }
}

/**
 * Initialize user name functionality
 */
function initializeUserName() {
    const userNameElement = document.getElementById('user-name');
    if (userNameElement) {
        // Add click functionality to allow user to enter their name
        userNameElement.addEventListener('click', function() {
            const currentName = this.textContent === '[Your Name]' ? '' : this.textContent;
            const newName = prompt('Enter your name:', currentName);
            
            if (newName && newName.trim() !== '') {
                this.textContent = newName.trim();
                // Save to localStorage for persistence
                localStorage.setItem('energywise-username', newName.trim());
            }
        });
        
        // Load saved name from localStorage
        const savedName = localStorage.getItem('energywise-username');
        if (savedName) {
            userNameElement.textContent = savedName;
        }
        
        // Add hover effect hint
        userNameElement.style.cursor = 'pointer';
        userNameElement.title = 'Click to enter your name';
    }
}

/**
 * Add enhanced navigation effects and interactions
 */
function addNavigationEffects() {
    // Logo hover effect enhancement
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(2deg)';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    }
    
    // Navigation link enhanced hover effects
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            // Add ripple effect
            createRippleEffect(this);
            
            // Add subtle glow
            this.style.boxShadow = '0 0 20px rgba(0, 170, 255, 0.3)';
        });
        
        link.addEventListener('mouseleave', function() {
            // Remove glow effect after delay
            setTimeout(() => {
                if (!this.classList.contains('active')) {
                    this.style.boxShadow = '';
                }
            }, 300);
        });
    });
    
    // Add scroll-based navigation highlighting
    window.addEventListener('scroll', handleScroll);
    
    // Add keyboard navigation support
    document.addEventListener('keydown', handleKeyboardNavigation);
}

/**
 * Create ripple effect on navigation links
 * @param {Element} element - The element to add ripple effect to
 */
function createRippleEffect(element) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: rippleAnimation 0.6s linear;
        width: ${size}px;
        height: ${size}px;
        left: 50%;
        top: 50%;
        margin-left: ${-size/2}px;
        margin-top: ${-size/2}px;
        pointer-events: none;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

/**
 * Handle scroll-based effects
 */
function handleScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'linear-gradient(135deg, rgba(0, 102, 204, 0.95), rgba(0, 61, 122, 0.95))';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = 'linear-gradient(135deg, var(--primary-blue), var(--dark-blue))';
        navbar.style.backdropFilter = 'none';
    }
}

/**
 * Handle keyboard navigation
 * @param {KeyboardEvent} e - The keyboard event
 */
function handleKeyboardNavigation(e) {
    // Navigate with number keys
    if (e.key >= '1' && e.key <= '3') {
        const pages = ['home', 'televisions', 'about'];
        const pageIndex = parseInt(e.key) - 1;
        if (pages[pageIndex]) {
            showPage(pages[pageIndex]);
        }
    }
    
    // Navigate with arrow keys
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const pages = ['home', 'televisions', 'about'];
        const currentPage = document.querySelector('.nav-link.active')?.getAttribute('data-page');
        const currentIndex = pages.indexOf(currentPage);
        
        if (currentIndex !== -1) {
            let newIndex;
            if (e.key === 'ArrowLeft') {
                newIndex = currentIndex > 0 ? currentIndex - 1 : pages.length - 1;
            } else {
                newIndex = currentIndex < pages.length - 1 ? currentIndex + 1 : 0;
            }
            showPage(pages[newIndex]);
        }
    }
}

/**
 * Add CSS animation for ripple effect
 */
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleAnimation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .page {
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .navbar {
        transition: background 0.3s ease, backdrop-filter 0.3s ease;
    }
    
    .nav-link {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// Utility Functions

/**
 * Debounce function to limit how often a function can be called
 * @param {Function} func - The function to debounce
 * @param {number} wait - The delay in milliseconds
 * @returns {Function} The debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll handler for better performance
window.addEventListener('scroll', debounce(handleScroll, 10));

// Analytics and User Interaction Tracking (Optional)
/**
 * Track page views for analytics
 * @param {string} pageId - The ID of the page being viewed
 */
function trackPageView(pageId) {
    // This would integrate with analytics services like Google Analytics
    console.log(`Page viewed: ${pageId}`);
    
    // Example: Send to analytics service
    // gtag('config', 'GA_MEASUREMENT_ID', {
    //     page_title: document.title,
    //     page_location: window.location.href
    // });
}

// Add page view tracking to showPage function
const originalShowPage = showPage;
showPage = function(pageId) {
    originalShowPage(pageId);
    trackPageView(pageId);
};

// Accessibility Enhancements
document.addEventListener('DOMContentLoaded', function() {
    // Add ARIA labels for better accessibility
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const page = link.getAttribute('data-page');
        link.setAttribute('aria-label', `Navigate to ${page} page`);
    });
    
    // Add focus indicators
    const focusableElements = document.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--electric-blue)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
});

// JavaScript for EnergyWise Website
// Handles page navigation, active states, and user interactions

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the website
    initializeNavigation();
    initializeUserName();
    addNavigationEffects();
    enhanceNavInteractions(); // Add the enhanced navigation interactions
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
            this.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            this.style.transform = 'scale(1.05) rotate(2deg)';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    }
    
    // Navigation link enhanced interactions - removed problematic ripple effect
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        // Ensure proper click handling
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const page = this.getAttribute('data-page');
            if (page) {
                showPage(page);
            }
        });
        
        // Improve hover feedback
        link.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        link.addEventListener('mouseleave', function() {
            // Smooth transition back
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        // Add touch support for mobile
        link.addEventListener('touchstart', function(e) {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        link.addEventListener('touchend', function(e) {
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Add scroll-based navigation highlighting
    window.addEventListener('scroll', handleScroll);
    
    // Add keyboard navigation support
    document.addEventListener('keydown', handleKeyboardNavigation);
}

/**
 * Improved navigation interaction handling
 */
function enhanceNavInteractions() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        // Remove any existing event listeners to prevent conflicts
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);
        
        // Add clean click handler
        newLink.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const page = this.getAttribute('data-page');
            if (page) {
                // Add visual feedback
                this.style.transform = 'translateY(-1px) scale(0.98)';
                
                setTimeout(() => {
                    showPage(page);
                    this.style.transform = '';
                }, 100);
            }
        });
        
        // Enhanced hover effects
        newLink.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-3px) scale(1.05)';
            }
        });
        
        newLink.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = '';
            }
        });
    });
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
 * Add enhanced CSS animations
 */
const style = document.createElement('style');
style.textContent = `
    .page {
        transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .navbar {
        transition: background 0.3s cubic-bezier(0.4, 0, 0.2, 1), backdrop-filter 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .nav-link {
        position: relative;
        overflow: hidden;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
    }
    
    /* Ensure smooth transitions */
    .nav-link:hover {
        transition-delay: 0ms !important;
    }
    
    .nav-link.active {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
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

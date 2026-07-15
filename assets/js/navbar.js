// ===== Navbar JavaScript =====

document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const navButtons = document.querySelector('.nav-buttons');
    const navLinksItems = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname;
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Initialize scroll state
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    }
    
    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navbar.classList.toggle('active');
            this.setAttribute('aria-expanded', navbar.classList.contains('active'));
            
            // Toggle menu icon
            const icon = this.querySelector('i');
            if (navbar.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Set active nav link based on current page
    navLinksItems.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath && currentPath.includes(linkPath)) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Close mobile menu when clicking a link
    navLinksItems.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 767) {
                navbar.classList.remove('active');
                if (menuToggle) {
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNavbar = navbar.contains(event.target);
        const isClickOnMenuToggle = menuToggle && menuToggle.contains(event.target);
        
        if (!isClickInsideNavbar && !isClickOnMenuToggle && navbar.classList.contains('active')) {
            navbar.classList.remove('active');
            if (menuToggle) {
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });
    
    // Keyboard navigation for mobile menu
    if (menuToggle) {
        menuToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }
    
    // Add focus trap for mobile menu
    if (navbar) {
        navbar.addEventListener('keydown', function(e) {
            if (!navbar.classList.contains('active')) return;
            
            const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
            const focusableContent = navbar.querySelectorAll(focusableElements);
            const firstFocusableElement = focusableContent[0];
            const lastFocusableElement = focusableContent[focusableContent.length - 1];
            
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    // Shift + Tab
                    if (document.activeElement === firstFocusableElement) {
                        e.preventDefault();
                        lastFocusableElement.focus();
                    }
                } else {
                    // Tab
                    if (document.activeElement === lastFocusableElement) {
                        e.preventDefault();
                        firstFocusableElement.focus();
                    }
                }
            } else if (e.key === 'Escape') {
                navbar.classList.remove('active');
                if (menuToggle) {
                    menuToggle.focus();
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
    }
    
    // Resize handler - reset mobile menu on window resize
    window.addEventListener('resize', debounce(function() {
        if (window.innerWidth > 767 && navbar.classList.contains('active')) {
            navbar.classList.remove('active');
            if (menuToggle) {
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        }
    }, 250));
    
    // Add smooth scroll to anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                // Close mobile menu if open
                if (navbar.classList.contains('active')) {
                    navbar.classList.remove('active');
                    if (menuToggle) {
                        const icon = menuToggle.querySelector('i');
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                        menuToggle.setAttribute('aria-expanded', 'false');
                    }
                }
                
                // Smooth scroll to target
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update URL without page jump
                history.pushState(null, null, href);
            }
        });
    });
    
    // Add hover effect to nav links
    navLinksItems.forEach(link => {
        link.addEventListener('mouseenter', function() {
            if (window.innerWidth > 767) {
                this.style.transform = 'translateY(-2px)';
            }
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Add ripple effect to nav buttons
    const navButtonsList = document.querySelectorAll('.nav-buttons .btn');
    navButtonsList.forEach(button => {
        button.addEventListener('click', function(e) {
            if (window.innerWidth <= 767) {
                navbar.classList.remove('active');
                if (menuToggle) {
                    const icon = menuToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });
});

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

// Add CSS for navbar transitions
const style = document.createElement('style');
style.textContent = `
    .nav-link {
        transition: transform 0.3s ease, color 0.3s ease;
    }
    
    .navbar {
        transition: background-color 0.3s ease, padding 0.3s ease, box-shadow 0.3s ease;
    }
    
    .menu-toggle {
        transition: transform 0.3s ease;
    }
    
    .menu-toggle:hover {
        transform: scale(1.1);
    }
    
    @media (max-width: 767px) {
        .navbar .nav-links,
        .navbar .nav-buttons {
            transition: all 0.3s ease-out;
        }
        
        .navbar .nav-links {
            max-height: 0;
            overflow: hidden;
        }
        
        .navbar.active .nav-links {
            max-height: 500px;
        }
        
        .navbar .nav-buttons {
            max-height: 0;
            overflow: hidden;
        }
        
        .navbar.active .nav-buttons {
            max-height: 200px;
        }
    }
`;

document.head.appendChild(style);
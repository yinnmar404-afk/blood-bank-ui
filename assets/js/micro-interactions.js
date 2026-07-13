// ===== Premium Micro-Interactions JavaScript =====

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all micro-interactions
    initPageTransitions();
    initGSAPAnimations();
    initStaggerAnimations();
    initScrollProgress();
    initFooterAnimation();
    initEnhancedFormInteractions();
    initNavbarEnhancements();
    initCardInteractions();
    initButtonEffects();
    initPerformanceOptimizations();
});

// ===== Page Transitions =====
function initPageTransitions() {
    // Handle page navigation transitions
    const links = document.querySelectorAll('a[href$=".html"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && !href.startsWith('#') && !href.startsWith('http')) {
                e.preventDefault();
                
                // Fade out current page
                document.body.classList.add('page-transition');
                
                // Navigate after fade out
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });
    });
}

// ===== GSAP Enhanced Animations =====
function initGSAPAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero content enhanced animation - simplified for performance
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        gsap.from(heroContent, {
            duration: 1,
            y: 40,
            opacity: 0,
            ease: "power2.out",
            delay: 0.2
        });
    }
    
    // Hero image enhanced animation
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        gsap.from(heroImage, {
            duration: 1.2,
            x: 60,
            opacity: 0,
            ease: "power2.out",
            delay: 0.4
        });
    }
    
    // Simplified floating shapes - reduced number of animations
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        if (index < 3) { // Only animate first 3 shapes
            gsap.to(shape, {
                y: -30 + (index * 10),
                x: 20 + (index * 5),
                rotation: index % 2 === 0 ? 5 : -5,
                duration: 5 + (index * 0.5),
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: index * 0.5
            });
        }
    });
    
    // Simplified blood drops - reduced number of animations
    const drops = document.querySelectorAll('.drop');
    drops.forEach((drop, index) => {
        if (index < 3) { // Only animate first 3 drops
            gsap.to(drop, {
                y: -25 + (index * 8),
                x: 10 + (index * 3),
                scale: 1.2,
                opacity: 0.8,
                duration: 3 + (index * 0.4),
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: index * 0.4
            });
        }
    });
}

// ===== Stagger Animations =====
function initStaggerAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    
    // Statistics cards stagger
    const statCards = document.querySelectorAll('.stat-card');
    if (statCards.length > 0) {
        gsap.from(statCards, {
            scrollTrigger: {
                trigger: '.stats-section',
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: "power2.out"
        });
    }
    
    // Why donate cards stagger
    const whyCards = document.querySelectorAll('.why-card');
    if (whyCards.length > 0) {
        gsap.from(whyCards, {
            scrollTrigger: {
                trigger: '.why-donate-section',
                start: "top 75%",
                toggleActions: "play none none reverse"
            },
            y: 60,
            opacity: 0,
            stagger: 0.2,
            duration: 0.9,
            ease: "power2.out"
        });
    }
    
    // Blood type cards stagger
    const bloodCards = document.querySelectorAll('.blood-card');
    if (bloodCards.length > 0) {
        gsap.from(bloodCards, {
            scrollTrigger: {
                trigger: '.blood-types-section',
                start: "top 75%",
                toggleActions: "play none none reverse"
            },
            y: 40,
            opacity: 0,
            stagger: 0.1,
            duration: 0.7,
            ease: "power2.out"
        });
    }
    
    // Process steps stagger
    const processSteps = document.querySelectorAll('.process-step');
    if (processSteps.length > 0) {
        gsap.from(processSteps, {
            scrollTrigger: {
                trigger: '.process-section',
                start: "top 70%",
                toggleActions: "play none none reverse"
            },
            x: -60,
            opacity: 0,
            stagger: 0.25,
            duration: 1,
            ease: "power2.out"
        });
    }
    
    // Testimonials stagger
    const testimonialSlides = document.querySelectorAll('.swiper-slide');
    if (testimonialSlides.length > 0) {
        gsap.from(testimonialSlides, {
            scrollTrigger: {
                trigger: '.testimonials-section',
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            y: 40,
            opacity: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: "power2.out"
        });
    }
}

// ===== Scroll Progress Indicator =====
function initScrollProgress() {
    // Create progress bar if it doesn't exist
    if (!document.querySelector('.scroll-progress')) {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);
    }
    
    // Update progress on scroll with better throttling
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
                const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = (winScroll / height) * 100;
                
                const progressBar = document.querySelector('.scroll-progress');
                if (progressBar) {
                    progressBar.style.width = scrolled + '%';
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
}

// ===== Footer Animation =====
function initFooterAnimation() {
    const footer = document.querySelector('.footer');
    if (!footer) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                footer.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    observer.observe(footer);
}

// ===== Enhanced Form Interactions =====
function initEnhancedFormInteractions() {
    // Floating labels
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const input = group.querySelector('input, select, textarea');
        const label = group.querySelector('.form-label');
        
        if (input && label) {
            // Check initial state
            if (input.value) {
                label.style.transform = 'translateY(-25px) scale(0.85)';
                label.style.color = 'var(--primary)';
            }
            
            // Focus events
            input.addEventListener('focus', function() {
                label.style.transform = 'translateY(-25px) scale(0.85)';
                label.style.color = 'var(--primary)';
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    label.style.transform = '';
                    label.style.color = '';
                }
            });
            
            // Input events
            input.addEventListener('input', function() {
                if (this.value) {
                    label.style.transform = 'translateY(-25px) scale(0.85)';
                    label.style.color = 'var(--primary)';
                }
            });
        }
    });
    
    // Animated validation
    const inputs = document.querySelectorAll('input[required], select[required], textarea[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
}

function validateField(input) {
    const value = input.value.trim();
    let isValid = true;
    
    if (!value) {
        isValid = false;
    } else if (input.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(value);
    } else if (input.type === 'password' && value.length < 8) {
        isValid = false;
    }
    
    if (isValid) {
        input.style.borderColor = 'var(--success)';
        input.style.boxShadow = '0 0 0 3px rgba(40, 167, 69, 0.1)';
    } else if (value) {
        input.style.borderColor = 'var(--danger)';
        input.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.1)';
    } else {
        input.style.borderColor = '';
        input.style.boxShadow = '';
    }
}

// ===== Navbar Enhancements =====
function initNavbarEnhancements() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    // Simplified scroll effect without hiding/showing for better performance
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                const currentScroll = window.pageYOffset;
                
                if (currentScroll > 100) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
    
    // Initialize scroll state
    if (window.pageYOffset > 100) {
        navbar.classList.add('scrolled');
    }
}

// ===== Card Interactions =====
function initCardInteractions() {
    // Enhanced card hover effects with GSAP
    const cards = document.querySelectorAll('.why-card, .blood-card, .testimonial-card, .stat-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (typeof gsap !== 'undefined') {
                gsap.to(this, {
                    duration: 0.4,
                    y: -12,
                    scale: 1.02,
                    ease: "power2.out"
                });
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (typeof gsap !== 'undefined') {
                gsap.to(this, {
                    duration: 0.4,
                    y: 0,
                    scale: 1,
                    ease: "power2.out"
                });
            }
        });
    });
    
    // Blood card special glow effect
    const bloodCards = document.querySelectorAll('.blood-card');
    bloodCards.forEach(card => {
        const status = card.querySelector('.blood-status');
        if (status && (status.textContent.includes('Urgent') || status.textContent.includes('Critical'))) {
            card.addEventListener('mouseenter', function() {
                if (typeof gsap !== 'undefined') {
                    gsap.to(this, {
                        duration: 0.3,
                        boxShadow: '0 0 40px rgba(214, 40, 40, 0.5), 0 16px 48px rgba(0, 0, 0, 0.15)',
                        ease: "power2.out"
                    });
                }
            });
            
            card.addEventListener('mouseleave', function() {
                if (typeof gsap !== 'undefined') {
                    gsap.to(this, {
                        duration: 0.3,
                        boxShadow: '',
                        ease: "power2.out"
                    });
                }
            });
        }
    });
}

// ===== Button Effects =====
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        // Enhanced hover effect
        button.addEventListener('mouseenter', function() {
            if (typeof gsap !== 'undefined') {
                gsap.to(this, {
                    duration: 0.3,
                    scale: 1.05,
                    ease: "power2.out"
                });
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (typeof gsap !== 'undefined') {
                gsap.to(this, {
                    duration: 0.3,
                    scale: 1,
                    ease: "power2.out"
                });
            }
        });
        
        // Click ripple effect
        button.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                left: ${x}px;
                top: ${y}px;
                width: 100px;
                height: 100px;
                margin-left: -50px;
                margin-top: -50px;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// ===== Performance Optimizations =====
function initPerformanceOptimizations() {
    // Reduce animations for users who prefer reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.globalTimeline.timeScale(0);
        document.body.style.setProperty('--transition-fast', '0.01s');
        document.body.style.setProperty('--transition-normal', '0.01s');
        document.body.style.setProperty('--transition-slow', '0.01s');
    }
    
    // Pause animations when tab is not visible
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            gsap.globalTimeline.pause();
        } else {
            gsap.globalTimeline.resume();
        }
    });
}

// ===== Enhanced Counter Animation =====
function animateCounter(element, target, suffix = '') {
    if (typeof gsap !== 'undefined') {
        const obj = { value: 0 };
        gsap.to(obj, {
            value: target,
            duration: 2,
            ease: "power2.out",
            onUpdate: function() {
                element.textContent = Math.floor(obj.value).toLocaleString() + suffix;
            }
        });
    } else {
        // Fallback
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString() + suffix;
        }, 20);
    }
}

// ===== Throttle Function =====
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== Debounce Function =====
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

// ===== Add Ripple Animation CSS =====
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

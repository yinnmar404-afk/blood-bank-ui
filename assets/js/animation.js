// ===== Animation JavaScript =====

document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP animations if available
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Hero section animations
        initHeroAnimations();
        
        // Section animations
        initSectionAnimations();
        
        // Interactive animations
        initInteractiveAnimations();
        
        // Page load animations
        initPageLoadAnimations();

        // Re-initialize parallax with GSAP
        initParallax();
    }
    
    // Initialize AOS fallback animations
    initAOSFallback();
    
    // Initialize scroll-based animations
    initScrollAnimations();
    
    // Initialize hover animations
    initHoverAnimations();
});

// ===== Hero Animations =====
function initHeroAnimations() {
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    // Animate hero content
    const heroContent = heroSection.querySelector('.hero-content');
    const heroImage = heroSection.querySelector('.hero-image');
    
    if (heroContent && typeof gsap !== 'undefined') {
        gsap.from(heroContent.children, {
            duration: 1,
            y: 30,
            opacity: 0,
            stagger: 0.2,
            ease: "power3.out",
            delay: 0.3
        });
    }
    
    if (heroImage && typeof gsap !== 'undefined') {
        gsap.from(heroImage, {
            duration: 1.2,
            x: 50,
            opacity: 0,
            ease: "power3.out",
            delay: 0.5
        });
    }
}

// ===== Parallax Animation (GSAP version) =====
function initParallax() {
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground && typeof gsap !== 'undefined') {
        gsap.to(heroBackground, {
            y: "-20%", // Move up by 20% of its own height
            ease: "none",
            scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "bottom top",
                scrub: true // Smoothly scrubs the animation on scroll
            }
        });
    }
    
    // Animate floating shapes
    const shapes = heroSection.querySelectorAll('.shape');
    if (shapes.length > 0) {
        shapes.forEach((shape, index) => {
            if (typeof gsap !== 'undefined') {
                gsap.to(shape, {
                    y: -20 + (index * 10),
                    x: 15 + (index * 5),
                    rotation: index % 2 === 0 ? 5 : -5,
                    duration: 3 + (index * 0.5),
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: index * 0.3
                });
            }
        });
    }
    
    // Animate blood drops
    const drops = heroSection.querySelectorAll('.drop');
    if (drops.length > 0) {
        drops.forEach((drop, index) => {
            if (typeof gsap !== 'undefined') {
                gsap.to(drop, {
                    y: -25 + (index * 5),
                    x: 10 + (index * 3),
                    scale: 1.2,
                    opacity: 0.8,
                    duration: 2 + (index * 0.3),
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: index * 0.2
                });
            }
        });
    }
}

// ===== Section Animations =====
function initSectionAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    
    // Statistics section animation
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        gsap.from(statsSection.querySelectorAll('.stat-card'), {
            scrollTrigger: {
                trigger: statsSection,
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            stagger: 0.2,
            duration: 0.8,
            ease: "power2.out"
        });
    }
    
    // Why donate cards animation
    const whySection = document.querySelector('.why-donate-section');
    if (whySection) {
        gsap.from(whySection.querySelectorAll('.why-card'), {
            scrollTrigger: {
                trigger: whySection,
                start: "top 70%",
                toggleActions: "play none none reverse"
            },
            y: 60,
            opacity: 0,
            stagger: 0.3,
            duration: 0.9,
            ease: "power2.out"
        });
    }
    
    // Blood types cards animation
    const bloodSection = document.querySelector('.blood-types-section');
    if (bloodSection) {
        gsap.from(bloodSection.querySelectorAll('.blood-card'), {
            scrollTrigger: {
                trigger: bloodSection,
                start: "top 70%",
                toggleActions: "play none none reverse"
            },
            y: 40,
            opacity: 0,
            stagger: 0.15,
            duration: 0.7,
            ease: "power2.out"
        });
    }
    
    // Process timeline animation
    const processSection = document.querySelector('.process-section');
    if (processSection) {
        gsap.from(processSection.querySelectorAll('.process-step'), {
            scrollTrigger: {
                trigger: processSection,
                start: "top 70%",
                toggleActions: "play none none reverse"
            },
            x: -50,
            opacity: 0,
            stagger: 0.4,
            duration: 1,
            ease: "power2.out"
        });
    }
    
    // CTA section animation
    const ctaSection = document.querySelector('.cta-section');
    if (ctaSection) {
        gsap.from(ctaSection.querySelector('.cta-content'), {
            scrollTrigger: {
                trigger: ctaSection,
                start: "top 80%",
                toggleActions: "play none none reverse"
            },
            scale: 0.9,
            opacity: 0,
            duration: 1,
            ease: "power2.out"
        });
    }
}

// ===== Interactive Animations =====
function initInteractiveAnimations() {
    // Card hover animations
    const cards = document.querySelectorAll('.why-card, .blood-card, .testimonial-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (typeof gsap !== 'undefined') {
                gsap.to(this, {
                    duration: 0.3,
                    y: -10,
                    scale: 1.02,
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                    ease: "power2.out"
                });
            } else {
                this.style.transform = 'translateY(-10px) scale(1.02)';
                this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (typeof gsap !== 'undefined') {
                gsap.to(this, {
                    duration: 0.3,
                    y: 0,
                    scale: 1,
                    boxShadow: '',
                    ease: "power2.out"
                });
            } else {
                this.style.transform = '';
                this.style.boxShadow = '';
            }
        });
    });
    
    // Button hover animations
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            if (typeof gsap !== 'undefined') {
                gsap.to(this, {
                    duration: 0.2,
                    scale: 1.05,
                    ease: "power2.out"
                });
            } else {
                this.style.transform = 'scale(1.05)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            if (typeof gsap !== 'undefined') {
                gsap.to(this, {
                    duration: 0.2,
                    scale: 1,
                    ease: "power2.out"
                });
            } else {
                this.style.transform = '';
            }
        });
    });
    
    // Blood card click animation
    const bloodCards = document.querySelectorAll('.blood-card');
    bloodCards.forEach(card => {
        card.addEventListener('click', function() {
            if (typeof gsap !== 'undefined') {
                gsap.to(this, {
                    duration: 0.1,
                    scale: 0.95,
                    ease: "power2.in",
                    onComplete: () => {
                        gsap.to(this, {
                            duration: 0.1,
                            scale: 1,
                            ease: "power2.out"
                        });
                    }
                });
            } else {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 100);
            }
        });
    });
    
    // Nav link hover animation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            if (typeof gsap !== 'undefined') {
                gsap.to(this, {
                    duration: 0.2,
                    y: -2,
                    color: 'var(--primary)',
                    ease: "power2.out"
                });
            } else {
                this.style.transform = 'translateY(-2px)';
                this.style.color = 'var(--primary)';
            }
        });
        
        link.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                if (typeof gsap !== 'undefined') {
                    gsap.to(this, {
                        duration: 0.2,
                        y: 0,
                        color: '',
                        ease: "power2.out"
                    });
                } else {
                    this.style.transform = '';
                    this.style.color = '';
                }
            }
        });
    });
}

// ===== Page Load Animations =====
function initPageLoadAnimations() {
    // Page load fade in
    if (typeof gsap !== 'undefined') {
        gsap.from('body', {
            duration: 0.5,
            opacity: 0,
            ease: "power2.out"
        });
    }
    
    // Navbar slide down
    const navbar = document.querySelector('.navbar');
    if (navbar && typeof gsap !== 'undefined') {
        gsap.from(navbar, {
            duration: 0.8,
            y: -100,
            opacity: 0,
            ease: "power3.out",
            delay: 0.1
        });
    }
    
    // Footer fade in
    const footer = document.querySelector('.footer');
    if (footer && typeof gsap !== 'undefined') {
        gsap.from(footer, {
            scrollTrigger: {
                trigger: footer,
                start: "top 90%",
                toggleActions: "play none none reverse"
            },
            duration: 1,
            y: 50,
            opacity: 0,
            ease: "power2.out"
        });
    }
}

// ===== AOS Fallback =====
function initAOSFallback() {
    if (typeof AOS === 'undefined') {
        // Simple fallback animation for elements with data-aos attribute
        const aosElements = document.querySelectorAll('[data-aos]');
        
        if (aosElements.length > 0) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const element = entry.target;
                        const animation = element.getAttribute('data-aos');
                        
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                        
                        if (animation === 'fade-up') {
                            element.style.transform = 'translateY(0)';
                        } else if (animation === 'fade-left') {
                            element.style.transform = 'translateX(0)';
                        } else if (animation === 'fade-right') {
                            element.style.transform = 'translateX(0)';
                        } else if (animation === 'zoom-in') {
                            element.style.transform = 'scale(1)';
                        }
                        
                        observer.unobserve(element);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            aosElements.forEach(element => {
                const animation = element.getAttribute('data-aos');
                
                // Set initial state based on animation type
                element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                element.style.opacity = '0';
                
                if (animation === 'fade-up') {
                    element.style.transform = 'translateY(30px)';
                } else if (animation === 'fade-left') {
                    element.style.transform = 'translateX(-30px)';
                } else if (animation === 'fade-right') {
                    element.style.transform = 'translateX(30px)';
                } else if (animation === 'zoom-in') {
                    element.style.transform = 'scale(0.9)';
                }
                
                observer.observe(element);
            });
        }
    }
}

// ===== Hover Animations =====
function initHoverAnimations() {
    // Icon hover animations
    const icons = document.querySelectorAll('.card-icon, .stat-icon, .step-icon');
    icons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            if (typeof gsap !== 'undefined') {
                gsap.to(this, {
                    duration: 0.3,
                    rotation: 10,
                    scale: 1.1,
                    ease: "power2.out"
                });
            } else {
                this.style.transform = 'rotate(10deg) scale(1.1)';
            }
        });
        
        icon.addEventListener('mouseleave', function() {
            if (typeof gsap !== 'undefined') {
                gsap.to(this, {
                    duration: 0.3,
                    rotation: 0,
                    scale: 1,
                    ease: "power2.out"
                });
            } else {
                this.style.transform = '';
            }
        });
    });
    
    // Social link hover animations
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            if (typeof gsap !== 'undefined') {
                gsap.to(this, {
                    duration: 0.3,
                    rotation: 360,
                    scale: 1.2,
                    ease: "power2.out"
                });
            } else {
                this.style.transform = 'rotate(360deg) scale(1.2)';
            }
        });
        
        link.addEventListener('mouseleave', function() {
            if (typeof gsap !== 'undefined') {
                gsap.to(this, {
                    duration: 0.3,
                    rotation: 0,
                    scale: 1,
                    ease: "power2.out"
                });
            } else {
                this.style.transform = '';
            }
        });
    });
}

// Debounce function for resize events
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
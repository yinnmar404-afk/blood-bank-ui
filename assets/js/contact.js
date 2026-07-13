// ===== Contact Page JavaScript =====

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const subjectSelect = document.getElementById('subject');
    const messageTextarea = document.getElementById('message');
    const newsletterCheckbox = document.getElementById('newsletter');
    
    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset previous errors
            clearErrors();
            
            // Validate form
            if (validateContactForm()) {
                // Show loading state
                const submitButton = this.querySelector('.btn-submit');
                const originalText = submitButton.innerHTML;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitButton.disabled = true;
                
                // Collect form data
                const formData = {
                    name: nameInput.value.trim(),
                    email: emailInput.value.trim(),
                    phone: document.getElementById('contactPhone')?.value.trim() || '',
                    subject: subjectSelect.value,
                    message: messageTextarea.value.trim(),
                    newsletter: newsletterCheckbox?.checked || false,
                    timestamp: new Date().toISOString()
                };
                
                // Simulate API call
                setTimeout(() => {
                    // Reset button state
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                    
                    // Show success message
                    showSuccessMessage();
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Log form data (in real app, would send to backend)
                    console.log('Contact form submitted:', formData);
                    
                    // Store in localStorage for demonstration
                    const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
                    submissions.push(formData);
                    localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
                    
                }, 1500);
            }
        });
    }
    
    // Real-time validation
    if (nameInput) {
        nameInput.addEventListener('blur', validateName);
        nameInput.addEventListener('input', clearError);
    }
    
    if (emailInput) {
        emailInput.addEventListener('blur', validateEmail);
        emailInput.addEventListener('input', clearError);
    }
    
    if (subjectSelect) {
        subjectSelect.addEventListener('change', function() {
            clearError(this);
        });
    }
    
    if (messageTextarea) {
        messageTextarea.addEventListener('blur', validateMessage);
        messageTextarea.addEventListener('input', clearError);
    }
    
    // Initialize animations
    initContactAnimations();
    
    // Add contact method hover effects
    const contactMethods = document.querySelectorAll('.contact-method');
    contactMethods.forEach(method => {
        method.addEventListener('mouseenter', function() {
            if (typeof gsap !== 'undefined') {
                gsap.to(this, {
                    duration: 0.3,
                    y: -5,
                    scale: 1.02,
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                    ease: "power2.out"
                });
            }
        });
        
        method.addEventListener('mouseleave', function() {
            if (typeof gsap !== 'undefined') {
                gsap.to(this, {
                    duration: 0.3,
                    y: 0,
                    scale: 1,
                    boxShadow: '',
                    ease: "power2.out"
                });
            }
        });
    });
});

// ===== Validation Functions =====
function validateContactForm() {
    let isValid = true;
    
    if (!validateNameField()) isValid = false;
    if (!validateEmailField()) isValid = false;
    if (!validateSubjectField()) isValid = false;
    if (!validateMessageField()) isValid = false;
    
    return isValid;
}

function validateNameField() {
    const nameInput = document.getElementById('contactName');
    const nameError = document.getElementById('nameError');
    
    if (!nameInput.value.trim()) {
        showError(nameInput, nameError, 'Name is required');
        return false;
    }
    
    if (nameInput.value.trim().length < 2) {
        showError(nameInput, nameError, 'Name must be at least 2 characters');
        return false;
    }
    
    showSuccess(nameInput);
    return true;
}

function validateEmailField() {
    const emailInput = document.getElementById('contactEmail');
    const emailError = document.getElementById('emailError');
    
    if (!emailInput.value.trim()) {
        showError(emailInput, emailError, 'Email is required');
        return false;
    }
    
    if (!isValidEmail(emailInput.value)) {
        showError(emailInput, emailError, 'Please enter a valid email address');
        return false;
    }
    
    showSuccess(emailInput);
    return true;
}

function validateSubjectField() {
    const subjectSelect = document.getElementById('subject');
    const subjectError = document.getElementById('subjectError');
    
    if (!subjectSelect.value) {
        showError(subjectSelect, subjectError, 'Please select a subject');
        return false;
    }
    
    showSuccess(subjectSelect);
    return true;
}

function validateMessageField() {
    const messageTextarea = document.getElementById('message');
    const messageError = document.getElementById('messageError');
    
    if (!messageTextarea.value.trim()) {
        showError(messageTextarea, messageError, 'Message is required');
        return false;
    }
    
    if (messageTextarea.value.trim().length < 10) {
        showError(messageTextarea, messageError, 'Message must be at least 10 characters');
        return false;
    }
    
    if (messageTextarea.value.trim().length > 1000) {
        showError(messageTextarea, messageError, 'Message must be less than 1000 characters');
        return false;
    }
    
    showSuccess(messageTextarea);
    return true;
}

// Individual validation functions for real-time validation
function validateName() {
    return validateNameField();
}

function validateEmail() {
    return validateEmailField();
}

function validateMessage() {
    return validateMessageField();
}

// ===== Helper Functions =====
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showError(input, errorElement, message) {
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    input.classList.add('error');
    input.style.borderColor = 'var(--danger)';
    input.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.1)';
    
    // Add shake animation
    input.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
        input.style.animation = '';
    }, 500);
}

function showSuccess(input) {
    input.classList.remove('error');
    input.classList.add('success');
    input.style.borderColor = 'var(--success)';
    
    const errorElement = input.nextElementSibling || input.parentElement.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.textContent = '✓';
        errorElement.style.color = 'var(--success)';
        setTimeout(() => {
            errorElement.style.display = 'none';
        }, 2000);
    }
}

function clearError(e) {
    const input = e.target;
    input.classList.remove('error');
    input.style.borderColor = '';
    input.style.boxShadow = '';
    
    const errorElement = input.nextElementSibling || input.parentElement.nextElementSibling;
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.style.display = 'none';
    }
}

function clearErrors() {
    const errors = document.querySelectorAll('.error-message');
    errors.forEach(error => {
        error.style.display = 'none';
    });
    
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.classList.remove('error');
        input.style.borderColor = '';
        input.style.boxShadow = '';
    });
}

function showSuccessMessage() {
    // Create success message
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div class="success-content">
            <i class="fas fa-check-circle"></i>
            <div>
                <h4>Message Sent Successfully!</h4>
                <p>Thank you for contacting LifeFlow. We'll get back to you within 24 hours.</p>
            </div>
        </div>
    `;
    
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--secondary);
        color: var(--accent);
        padding: 1.5rem;
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-xl);
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
        max-width: 400px;
        border-left: 4px solid var(--success);
    `;
    
    document.body.appendChild(successDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        successDiv.style.animation = 'slideOutRight 0.3s ease-out forwards';
        setTimeout(() => {
            successDiv.remove();
        }, 300);
    }, 5000);
}

function initContactAnimations() {
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .success-message .success-content {
            display: flex;
            align-items: flex-start;
            gap: 1rem;
        }
        
        .success-message i {
            font-size: 1.5rem;
            color: var(--success);
            margin-top: 0.25rem;
        }
        
        .success-message h4 {
            margin: 0 0 0.5rem 0;
            font-size: 1.1rem;
        }
        
        .success-message p {
            margin: 0;
            color: var(--medium-gray);
            font-size: 0.9rem;
            line-height: 1.4;
        }
        
        input.error,
        select.error,
        textarea.error {
            animation: shake 0.5s ease-in-out;
        }
        
        input.success,
        select.success,
        textarea.success {
            border-color: var(--success) !important;
        }
        
        .faq-question {
            cursor: pointer;
            transition: var(--transition-normal);
        }
        
        .faq-question:hover {
            color: var(--primary);
        }
        
        .faq-answer {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease-out;
        }
        
        .faq-answer.active {
            max-height: 500px;
        }
        
        .contact-method {
            transition: var(--transition-normal);
            border-radius: var(--radius-lg);
            padding: 1.5rem;
        }
        
        .contact-method:hover {
            background: var(--background);
        }
        
        .method-icon {
            transition: var(--transition-normal);
        }
        
        .contact-method:hover .method-icon {
            transform: scale(1.1);
            color: var(--primary);
        }
        
        .emergency-contact {
            background: linear-gradient(135deg, rgba(255, 193, 7, 0.1), rgba(255, 193, 7, 0.05));
            border-radius: var(--radius-lg);
            padding: 1.5rem;
            margin-top: 2rem;
        }
        
        .emergency-number {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--warning);
            margin: 0.5rem 0;
        }
    `;
    
    document.head.appendChild(style);
    
    // Animate contact methods on load
    const contactMethods = document.querySelectorAll('.contact-method');
    contactMethods.forEach((method, index) => {
        setTimeout(() => {
            method.style.animation = 'fadeIn 0.5s ease-out forwards';
            method.style.opacity = '0';
            method.style.transform = 'translateY(10px)';
        }, index * 100);
    });
    
    // Animate FAQ items on load
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.animation = 'fadeIn 0.5s ease-out forwards';
            item.style.opacity = '0';
            item.style.transform = 'translateY(10px)';
        }, index * 100);
    });
}

// Add typing effect for emergency number
function typeEmergencyNumber() {
    const emergencyNumber = document.querySelector('.emergency-number');
    if (emergencyNumber) {
        const number = emergencyNumber.textContent;
        emergencyNumber.textContent = '';
        
        let i = 0;
        const typing = setInterval(() => {
            if (i < number.length) {
                emergencyNumber.textContent += number.charAt(i);
                i++;
            } else {
                clearInterval(typing);
            }
        }, 100);
    }
}

// Initialize typing effect on page load
document.addEventListener('DOMContentLoaded', typeEmergencyNumber);
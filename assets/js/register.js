// ===== Register Page JavaScript =====

document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    const steps = document.querySelectorAll('.form-step');
    const stepElements = document.querySelectorAll('.step');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    const progressFill = document.getElementById('progressFill');
    const successModal = document.getElementById('successModal');
    
    let currentStep = 1;
    const totalSteps = 3;
    
    // Initialize step navigation
    updateStepNavigation();
    
    // Next button click handler
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            if (validateStep(currentStep)) {
                if (currentStep < totalSteps) {
                    currentStep++;
                    updateStepNavigation();
                }
            }
        });
    }
    
    // Previous button click handler
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            if (currentStep > 1) {
                currentStep--;
                updateStepNavigation();
            }
        });
    }
    
    // Form submission
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateStep(currentStep)) {
                if (currentStep === totalSteps) {
                    // Validate all steps
                    if (validateAllSteps()) {
                        submitRegistration();
                    }
                } else {
                    // Move to next step
                    if (validateStep(currentStep)) {
                        currentStep++;
                        updateStepNavigation();
                    }
                }
            }
        });
    }
    
    // Blood group selection
    const bloodOptions = document.querySelectorAll('.blood-option');
    const bloodGroupInput = document.getElementById('bloodGroup');
    
    bloodOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from all options
            bloodOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Add selected class to clicked option
            this.classList.add('selected');
            
            // Update hidden input
            const bloodType = this.getAttribute('data-blood');
            bloodGroupInput.value = bloodType;
            
            // Clear any error
            clearError(bloodGroupInput);
        });
    });
    
    // Password strength meter
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const togglePassword = document.getElementById('togglePassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    
    if (passwordInput) {
        passwordInput.addEventListener('input', updatePasswordStrength);
        passwordInput.addEventListener('blur', validatePassword);
    }
    
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('blur', validateConfirmPassword);
    }
    
    // Toggle password visibility
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.querySelector('i').classList.toggle('fa-eye');
            this.querySelector('i').classList.toggle('fa-eye-slash');
        });
    }
    
    if (toggleConfirmPassword && confirmPasswordInput) {
        toggleConfirmPassword.addEventListener('click', function() {
            const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            confirmPasswordInput.setAttribute('type', type);
            this.querySelector('i').classList.toggle('fa-eye');
            this.querySelector('i').classList.toggle('fa-eye-slash');
        });
    }
    
    // Terms checkbox
    const termsCheckbox = document.getElementById('terms');
    if (termsCheckbox) {
        termsCheckbox.addEventListener('change', function() {
            clearError(termsCheckbox);
        });
    }
    
    // Close success modal
    if (successModal) {
        successModal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
            }
        });
        
        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && successModal.style.display === 'flex') {
                successModal.style.display = 'none';
            }
        });
    }
    
    // Initialize animations
    initRegisterAnimations();
});

// ===== Step Navigation Functions =====
function updateStepNavigation() {
    const steps = document.querySelectorAll('.form-step');
    const stepElements = document.querySelectorAll('.step');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    const progressFill = document.getElementById('progressFill');
    
    // Hide all steps
    steps.forEach(step => {
        step.classList.remove('active');
    });
    
    // Show current step
    const currentStepElement = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    if (currentStepElement) {
        currentStepElement.classList.add('active');
    }
    
    // Update step indicators
    stepElements.forEach((step, index) => {
        const stepNumber = parseInt(step.getAttribute('data-step'));
        
        step.classList.remove('active', 'completed');
        
        if (stepNumber === currentStep) {
            step.classList.add('active');
        } else if (stepNumber < currentStep) {
            step.classList.add('completed');
        }
    });
    
    // Update progress bar
    if (progressFill) {
        const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
        progressFill.style.width = `${progress}%`;
    }
    
    // Update button visibility
    if (prevBtn && nextBtn && submitBtn) {
        prevBtn.style.display = currentStep > 1 ? 'flex' : 'none';
        nextBtn.style.display = currentStep < totalSteps ? 'flex' : 'none';
        submitBtn.style.display = currentStep === totalSteps ? 'flex' : 'none';
    }
}

// ===== Validation Functions =====
function validateStep(step) {
    let isValid = true;
    
    switch(step) {
        case 1:
            isValid = validateStep1();
            break;
        case 2:
            isValid = validateStep2();
            break;
        case 3:
            isValid = validateStep3();
            break;
    }
    
    return isValid;
}

function validateStep1() {
    let isValid = true;
    
    // Full name validation
    const fullName = document.getElementById('fullName');
    if (!fullName.value.trim()) {
        showError(fullName, 'fullNameError', 'Full name is required');
        isValid = false;
    } else {
        clearError(fullName);
    }
    
    // Email validation
    const email = document.getElementById('email');
    if (!email.value.trim()) {
        showError(email, 'emailError', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showError(email, 'emailError', 'Please enter a valid email address');
        isValid = false;
    } else {
        clearError(email);
    }
    
    // Phone validation
    const phone = document.getElementById('phone');
    if (!phone.value.trim()) {
        showError(phone, 'phoneError', 'Phone number is required');
        isValid = false;
    } else if (!isValidPhone(phone.value)) {
        showError(phone, 'phoneError', 'Please enter a valid phone number');
        isValid = false;
    } else {
        clearError(phone);
    }
    
    // Gender validation
    const gender = document.getElementById('gender');
    if (!gender.value) {
        showError(gender, 'genderError', 'Please select your gender');
        isValid = false;
    } else {
        clearError(gender);
    }
    
    // Date of birth validation
    const dob = document.getElementById('dob');
    if (!dob.value) {
        showError(dob, 'dobError', 'Date of birth is required');
        isValid = false;
    } else {
        const birthDate = new Date(dob.value);
        const today = new Date();
        const minDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
        
        if (birthDate > minDate) {
            showError(dob, 'dobError', 'You must be at least 18 years old to donate blood');
            isValid = false;
        } else {
            clearError(dob);
        }
    }
    
    return isValid;
}

function validateStep2() {
    let isValid = true;
    
    // Blood group validation
    const bloodGroupInput = document.getElementById('bloodGroup');
    if (!bloodGroupInput.value) {
        showError(bloodGroupInput, 'bloodGroupError', 'Please select your blood group');
        isValid = false;
    } else {
        clearError(bloodGroupInput);
    }
    
    return isValid;
}

function validateStep3() {
    let isValid = true;
    
    // Password validation
    const password = document.getElementById('password');
    if (!password.value.trim()) {
        showError(password, 'passwordError', 'Password is required');
        isValid = false;
    } else if (password.value.length < 8) {
        showError(password, 'passwordError', 'Password must be at least 8 characters long');
        isValid = false;
    } else if (!isStrongPassword(password.value)) {
        showError(password, 'passwordError', 'Password should include uppercase, lowercase, numbers, and special characters');
        isValid = false;
    } else {
        clearError(password);
    }
    
    // Confirm password validation
    const confirmPassword = document.getElementById('confirmPassword');
    if (!confirmPassword.value.trim()) {
        showError(confirmPassword, 'confirmPasswordError', 'Please confirm your password');
        isValid = false;
    } else if (confirmPassword.value !== password.value) {
        showError(confirmPassword, 'confirmPasswordError', 'Passwords do not match');
        isValid = false;
    } else {
        clearError(confirmPassword);
    }
    
    // Terms validation
    const terms = document.getElementById('terms');
    if (!terms.checked) {
        showError(terms, 'termsError', 'You must agree to the terms and conditions');
        isValid = false;
    } else {
        clearError(terms);
    }
    
    return isValid;
}

function validateAllSteps() {
    let isValid = true;
    
    for (let i = 1; i <= totalSteps; i++) {
        if (!validateStep(i)) {
            isValid = false;
        }
    }
    
    return isValid;
}

// ===== Password Strength Meter =====
function updatePasswordStrength() {
    const password = document.getElementById('password').value;
    const strengthFill = document.getElementById('strengthFill');
    const strengthText = document.getElementById('strengthText');
    
    if (!password) {
        strengthFill.style.width = '0%';
        strengthText.textContent = '';
        return;
    }
    
    let strength = 0;
    let text = '';
    let color = '';
    
    // Length check
    if (password.length >= 8) strength += 25;
    if (password.length >= 12) strength += 10;
    
    // Complexity checks
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[a-z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 15;
    if (/[^A-Za-z0-9]/.test(password)) strength += 10;
    
    // Prevent exceeding 100%
    strength = Math.min(strength, 100);
    
    // Update strength meter
    strengthFill.style.width = `${strength}%`;
    
    // Update text and color
    if (strength < 30) {
        text = 'Weak';
        color = '#dc3545';
    } else if (strength < 70) {
        text = 'Fair';
        color = '#ffc107';
    } else if (strength < 90) {
        text = 'Good';
        color = '#17a2b8';
    } else {
        text = 'Strong';
        color = '#28a745';
    }
    
    strengthText.textContent = text;
    strengthFill.style.background = color;
    strengthText.style.color = color;
}

// ===== Individual Field Validation =====
function validatePassword() {
    const password = document.getElementById('password');
    const passwordError = document.getElementById('passwordError');
    
    if (!password.value.trim()) {
        showError(password, passwordError, 'Password is required');
        return false;
    }
    
    if (password.value.length < 8) {
        showError(password, passwordError, 'Password must be at least 8 characters long');
        return false;
    }
    
    if (!isStrongPassword(password.value)) {
        showError(password, passwordError, 'Password should include uppercase, lowercase, numbers, and special characters');
        return false;
    }
    
    clearError(password);
    return true;
}

function validateConfirmPassword() {
    const confirmPassword = document.getElementById('confirmPassword');
    const password = document.getElementById('password');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    
    if (!confirmPassword.value.trim()) {
        showError(confirmPassword, confirmPasswordError, 'Please confirm your password');
        return false;
    }
    
    if (confirmPassword.value !== password.value) {
        showError(confirmPassword, confirmPasswordError, 'Passwords do not match');
        return false;
    }
    
    clearError(confirmPassword);
    return true;
}

// ===== Form Submission =====
function submitRegistration() {
    const submitBtn = document.getElementById('submitBtn');
    const successModal = document.getElementById('successModal');
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;
    
    // Collect form data
    const formData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        gender: document.getElementById('gender').value,
        dob: document.getElementById('dob').value,
        bloodGroup: document.getElementById('bloodGroup').value,
        recentDonation: document.querySelector('input[name="recentDonation"]:checked')?.value,
        chronicIllness: document.querySelector('input[name="chronicIllness"]:checked')?.value,
        password: document.getElementById('password').value,
        terms: document.getElementById('terms').checked
    };
    
    // Simulate API call
    setTimeout(() => {
        // Reset button state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
        // Show success modal
        if (successModal) {
            successModal.style.display = 'flex';
            
            // Focus first button in modal for accessibility
            const modalBtn = successModal.querySelector('.btn');
            if (modalBtn) modalBtn.focus();
        }
        
        // In a real app, you would submit to the backend
        console.log('Registration data:', formData);
        
        // You could also store in localStorage or send to an API
        localStorage.setItem('registrationData', JSON.stringify(formData));
        
    }, 2000);
}

// ===== Helper Functions =====
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function isValidPhone(phone) {
    const re = /^[\+]?[1-9][\d]{0,15}$/;
    return re.test(phone.replace(/[\s\-\(\)]/g, ''));
}

function isStrongPassword(password) {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
    
    return hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
}

function showError(element, errorId, message) {
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    element.classList.add('error');
    element.style.borderColor = 'var(--danger)';
    
    // Add shake animation
    element.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
        element.style.animation = '';
    }, 500);
}

function clearError(element) {
    const errorId = element.id + 'Error';
    const errorElement = document.getElementById(errorId);
    
    if (errorElement) {
        errorElement.style.display = 'none';
    }
    
    element.classList.remove('error');
    element.style.borderColor = '';
}

function initRegisterAnimations() {
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .form-step.active {
            animation: fadeIn 0.5s ease-out;
        }
        
        .step.completed {
            animation: scaleIn 0.3s ease-out;
        }
        
        @keyframes scaleIn {
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
        
        .blood-option {
            transition: all 0.3s ease;
        }
        
        .blood-option.selected {
            animation: pulse 0.5s ease-out;
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
        
        .modal-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(5px);
            align-items: center;
            justify-content: center;
            z-index: 2000;
            animation: fadeIn 0.3s ease-out;
        }
        
        .modal-content {
            animation: scaleIn 0.3s ease-out;
        }
    `;
    
    document.head.appendChild(style);
    
    // Animate progress steps on load
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        setTimeout(() => {
            step.style.animation = 'fadeIn 0.5s ease-out forwards';
            step.style.opacity = '0';
            step.style.transform = 'translateY(10px)';
        }, index * 100);
    });
}
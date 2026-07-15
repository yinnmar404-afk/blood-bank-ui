// ===== Register Page JavaScript =====

document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.getElementById('registerForm');
    if (!registerForm) return;

    const fullNameInput = document.getElementById('fullName');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const termsCheckbox = document.getElementById('terms');
    const submitBtn = document.getElementById('submitBtn');
    const successModal = document.getElementById('successModal');

    // Toggle password visibility
    const togglePassword = document.getElementById('togglePassword');
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            toggleVisibility(passwordInput, this);
        });
    }

    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    if (toggleConfirmPassword && confirmPasswordInput) {
        toggleConfirmPassword.addEventListener('click', function() {
            toggleVisibility(confirmPasswordInput, this);
        });
    }

    // Form submission
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateAllFields()) {
            submitRegistration();
        }
    });

    // Real-time validation on blur
    fullNameInput.addEventListener('blur', validateFullName);
    emailInput.addEventListener('blur', validateEmail);
    phoneInput.addEventListener('blur', validatePhone);
    passwordInput.addEventListener('blur', validatePassword);
    confirmPasswordInput.addEventListener('blur', validateConfirmPassword);
    termsCheckbox.addEventListener('change', () => clearError(termsCheckbox));

    // Clear error on input
    [fullNameInput, emailInput, phoneInput, passwordInput, confirmPasswordInput].forEach(input => {
        input.addEventListener('input', () => clearError(input));
    });

    // Close success modal
    if (successModal) {
        successModal.addEventListener('click', function(e) {
            if (e.target === this || e.target.classList.contains('btn-outline')) {
                this.style.display = 'none';
            }
        });
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && successModal.style.display === 'flex') {
                successModal.style.display = 'none';
            }
        });
    }

    // ===== Validation Functions =====
    function validateAllFields() {
        // Use & to ensure all validations run and show all errors at once
        const isNameValid = validateFullName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        const isTermsValid = validateTerms();
        return isNameValid && isEmailValid && isPhoneValid && isPasswordValid && isConfirmPasswordValid && isTermsValid;
    }

    function validateFullName() {
        if (!fullNameInput.value.trim()) {
            showError(fullNameInput, 'fullNameError', 'Full name is required');
            return false;
        }
        clearError(fullNameInput);
        return true;
    }

    function validateEmail() {
        if (!emailInput.value.trim()) {
            showError(emailInput, 'emailError', 'Email is required');
            return false;
        } else if (!isValidEmail(emailInput.value)) {
            showError(emailInput, 'emailError', 'Please enter a valid email address');
            return false;
        }
        clearError(emailInput);
        return true;
    }

    function validatePhone() {
        const phoneRegex = /^9\d{8,10}$/; // For Myanmar phone numbers like 912345678
        const phoneValue = phoneInput.value.replace(/\s/g, '');
        if (!phoneValue) {
            showError(phoneInput.parentElement, 'phoneError', 'Phone number is required');
            return false;
        } else if (!phoneRegex.test(phoneValue)) {
            showError(phoneInput.parentElement, 'phoneError', 'Please enter a valid phone number (e.g., 912345678)');
            return false;
        }
        clearError(phoneInput.parentElement);
        return true;
    }

    function validatePassword() {
        const password = passwordInput.value;
        if (!password) {
            showError(passwordInput, 'passwordError', 'Password is required');
            return false;
        } else if (password.length < 8) {
            showError(passwordInput, 'passwordError', 'Password must be at least 8 characters');
            return false;
        } else if (!isStrongPassword(password)) {
            showError(passwordInput, 'passwordError', 'Use upper, lower, number, and special characters');
            return false;
        }
        clearError(passwordInput);
        return true;
    }

    function validateConfirmPassword() {
        if (!confirmPasswordInput.value) {
            showError(confirmPasswordInput, 'confirmPasswordError', 'Please confirm your password');
            return false;
        } else if (confirmPasswordInput.value !== passwordInput.value) {
            showError(confirmPasswordInput, 'confirmPasswordError', 'Passwords do not match');
            return false;
        }
        clearError(confirmPasswordInput);
        return true;
    }

    function validateTerms() {
        if (!termsCheckbox.checked) {
            showError(termsCheckbox, 'termsError', 'You must agree to the terms');
            return false;
        }
        clearError(termsCheckbox);
        return true;
    }

    // ===== Helper Functions =====
    function toggleVisibility(input, button) {
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);
        button.querySelector('i').classList.toggle('fa-eye');
        button.querySelector('i').classList.toggle('fa-eye-slash');
    }

    function isStrongPassword(password) {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
        return hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
    }

    // ===== Form Submission =====
    function submitRegistration() {
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Reset button state
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            
            // Show success modal
            if (successModal) {
                successModal.style.display = 'flex';
                const modalBtn = successModal.querySelector('.btn');
                if (modalBtn) modalBtn.focus();
            }
        }, 2000);
    }
});
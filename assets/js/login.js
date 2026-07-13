// ===== Login Page JavaScript =====

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    const rememberMe = document.getElementById('rememberMe');
    
    // Load saved credentials if "Remember me" was checked
    if (localStorage.getItem('rememberLogin') === 'true') {
        const savedEmail = localStorage.getItem('savedEmail');
        const savedPassword = localStorage.getItem('savedPassword');
        
        if (savedEmail) emailInput.value = savedEmail;
        if (savedPassword) passwordInput.value = atob(savedPassword);
        if (rememberMe) rememberMe.checked = true;
    }
    
    // Toggle password visibility
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.querySelector('i').classList.toggle('fa-eye');
            this.querySelector('i').classList.toggle('fa-eye-slash');
            
            // Add focus back to password input
            passwordInput.focus();
        });
        
        // Handle Enter key on toggle button
        togglePassword.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }
    
    // Form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset previous errors
            clearErrors();
            
            // Validate form
            if (validateLoginForm()) {
                // Show loading state
                const submitButton = this.querySelector('.btn-login');
                const originalText = submitButton.innerHTML;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
                submitButton.disabled = true;
                
                // Simulate API call delay
                setTimeout(() => {
                    // Handle "Remember me" functionality
                    if (rememberMe && rememberMe.checked) {
                        localStorage.setItem('rememberLogin', 'true');
                        localStorage.setItem('savedEmail', emailInput.value);
                        localStorage.setItem('savedPassword', btoa(passwordInput.value));
                    } else {
                        localStorage.removeItem('rememberLogin');
                        localStorage.removeItem('savedEmail');
                        localStorage.removeItem('savedPassword');
                    }
                    
                    // Reset button state
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                    
                    // Show success and redirect (in real app, would check credentials)
                    showSuccessMessage();
                    
                    // In a real app, you would check credentials and redirect
                    // window.location.href = 'dashboard.html';
                    
                }, 1500);
            }
        });
    }
    
    // Google login button
    const googleButton = document.querySelector('.btn-google');
    if (googleButton) {
        googleButton.addEventListener('click', function() {
            // Show loading state
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connecting...';
            this.disabled = true;
            
            // Simulate Google auth process
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
                showSuccessMessage('Google login successful!');
            }, 2000);
        });
    }
    
    // Real-time validation
    if (emailInput) {
        emailInput.addEventListener('blur', validateEmail);
        emailInput.addEventListener('input', clearError);
    }
    
    if (passwordInput) {
        passwordInput.addEventListener('blur', validatePassword);
        passwordInput.addEventListener('input', clearError);
    }
    
    // Forgot password link
    const forgotPassword = document.querySelector('.forgot-password');
    if (forgotPassword) {
        forgotPassword.addEventListener('click', function(e) {
            e.preventDefault();
            showForgotPasswordModal();
        });
    }
    
    // Accessibility enhancements
    if (emailInput) emailInput.setAttribute('autocomplete', 'email');
    if (passwordInput) passwordInput.setAttribute('autocomplete', 'current-password');
    
    // Initialize animations
    initLoginAnimations();
});

// ===== Validation Functions =====
function validateLoginForm() {
    let isValid = true;
    
    if (!validateEmailField()) isValid = false;
    if (!validatePasswordField()) isValid = false;
    
    return isValid;
}

function validateEmailField() {
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    
    if (!emailInput.value.trim()) {
        showError(emailInput, emailError, 'Email address is required');
        return false;
    }
    
    if (!isValidEmail(emailInput.value)) {
        showError(emailInput, emailError, 'Please enter a valid email address');
        return false;
    }
    
    showSuccess(emailInput);
    return true;
}

function validatePasswordField() {
    const passwordInput = document.getElementById('password');
    const passwordError = document.getElementById('passwordError');
    
    if (!passwordInput.value.trim()) {
        showError(passwordInput, passwordError, 'Password is required');
        return false;
    }
    
    if (passwordInput.value.length < 8) {
        showError(passwordInput, passwordError, 'Password must be at least 8 characters long');
        return false;
    }
    
    showSuccess(passwordInput);
    return true;
}

// Individual validation functions for real-time validation
function validateEmail() {
    return validateEmailField();
}

function validatePassword() {
    return validatePasswordField();
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
    
    // Focus the input
    input.focus();
    
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
    
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.classList.remove('error');
        input.style.borderColor = '';
        input.style.boxShadow = '';
    });
}

function showSuccessMessage(message = 'Login successful!') {
    // Create success message
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div class="success-content">
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        </div>
    `;
    
    successDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--success);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--radius-md);
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
    `;
    
    document.body.appendChild(successDiv);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        successDiv.style.animation = 'slideOutRight 0.3s ease-out forwards';
        setTimeout(() => {
            successDiv.remove();
        }, 300);
    }, 3000);
}

function showForgotPasswordModal() {
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'forgot-modal';
    modal.innerHTML = `
        <div class="modal-overlay" id="forgotModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Reset Password</h3>
                    <button class="close-modal" aria-label="Close">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <p>Enter your email address and we'll send you a link to reset your password.</p>
                    <div class="form-group">
                        <label for="resetEmail">Email Address</label>
                        <input type="email" id="resetEmail" placeholder="Enter your email">
                        <div class="error-message" id="resetEmailError"></div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-outline cancel-btn">Cancel</button>
                    <button class="btn btn-primary submit-btn">Send Reset Link</button>
                </div>
            </div>
        </div>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(5px);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            animation: fadeIn 0.3s ease-out;
        }
        
        .modal-content {
            background: var(--secondary);
            border-radius: var(--radius-xl);
            padding: var(--spacing-xl);
            max-width: 400px;
            width: 90%;
            box-shadow: var(--shadow-xl);
            animation: scaleIn 0.3s ease-out;
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: var(--spacing-lg);
        }
        
        .modal-header h3 {
            margin: 0;
            font-size: 1.5rem;
        }
        
        .close-modal {
            background: none;
            border: none;
            font-size: 1.25rem;
            color: var(--medium-gray);
            cursor: pointer;
            padding: 0.5rem;
            transition: var(--transition-normal);
        }
        
        .close-modal:hover {
            color: var(--primary);
            transform: rotate(90deg);
        }
        
        .modal-body {
            margin-bottom: var(--spacing-lg);
        }
        
        .modal-body p {
            color: var(--medium-gray);
            margin-bottom: var(--spacing-md);
        }
        
        .modal-footer {
            display: flex;
            gap: var(--spacing-md);
            justify-content: flex-end;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes scaleIn {
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(modal);
    
    // Add event listeners
    const closeBtn = modal.querySelector('.close-modal');
    const cancelBtn = modal.querySelector('.cancel-btn');
    const submitBtn = modal.querySelector('.submit-btn');
    const resetEmail = modal.querySelector('#resetEmail');
    
    function closeModal() {
        modal.style.animation = 'fadeOut 0.3s ease-out forwards';
        setTimeout(() => {
            modal.remove();
            style.remove();
        }, 300);
    }
    
    closeBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);
    
    // Close on overlay click
    modal.querySelector('.modal-overlay').addEventListener('click', function(e) {
        if (e.target === this) closeModal();
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.parentNode) closeModal();
    });
    
    // Submit handler
    submitBtn.addEventListener('click', function() {
        const email = resetEmail.value.trim();
        const errorElement = modal.querySelector('#resetEmailError');
        
        if (!email) {
            showError(resetEmail, errorElement, 'Email is required');
            return;
        }
        
        if (!isValidEmail(email)) {
            showError(resetEmail, errorElement, 'Please enter a valid email');
            return;
        }
        
        // Show loading
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        this.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            closeModal();
            showSuccessMessage('Password reset link sent to your email!');
        }, 1500);
    });
    
    // Enter key support
    resetEmail.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') submitBtn.click();
    });
}

function initLoginAnimations() {
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
            align-items: center;
            gap: 0.75rem;
        }
        
        .success-message i {
            font-size: 1.25rem;
        }
        
        input.error {
            animation: shake 0.5s ease-in-out;
        }
        
        input.success {
            border-color: var(--success) !important;
        }
    `;
    
    document.head.appendChild(style);
}
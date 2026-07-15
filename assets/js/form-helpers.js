// ===== Shared Form Helper & Animation Functions =====

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function showError(input, errorIdOrElement, message) {
    const errorElement = typeof errorIdOrElement === 'string' 
        ? document.getElementById(errorIdOrElement) 
        : errorIdOrElement;

    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    
    input.classList.add('error');
    input.style.borderColor = 'var(--danger)';
    
    // Add shake animation
    input.style.animation = 'shake 0.5s ease-in-out';
    setTimeout(() => {
        input.style.animation = '';
    }, 500);
}

function clearError(elementOrEvent) {
    const input = elementOrEvent.target || elementOrEvent;
    input.classList.remove('error');
    input.style.borderColor = '';
    input.style.boxShadow = '';
    
    const errorId = input.id + 'Error';
    let errorElement = document.getElementById(errorId);

    if (!errorElement) {
        errorElement = input.nextElementSibling;
    }
    
    if (errorElement && errorElement.classList.contains('error-message')) {
        errorElement.style.display = 'none';
    }
}

function initAnimationStyles() {
    // Add CSS animations if not already present
    if (document.getElementById('animation-styles')) return;

    const style = document.createElement('style');
    style.id = 'animation-styles';
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        input.error {
            animation: shake 0.5s ease-in-out;
        }
    `;
    document.head.appendChild(style);
}

// Initialize on script load
initAnimationStyles();
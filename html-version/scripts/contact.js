// Contact form functionality

// Handle contact form submission
function submitContactForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Validate form
    if (!validateContactForm(formData)) {
        return;
    }
    
    // Show loading state
    const originalText = submitButton.textContent;
    setLoading(submitButton, true);
    
    // Prepare contact data
    const contactData = {
        id: generateContactId(),
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        submissionDate: new Date().toISOString(),
        submissionTime: new Date().toLocaleString(),
        status: 'new'
    };
    
    // Simulate sending email
    setTimeout(() => {
        try {
            // Save to localStorage (in a real app, this would be sent to a server)
            saveContactMessage(contactData);
            
            // Show success message
            showNotification('Thank you for your message! We will get back to you within 24 hours.', 'success');
            
            // Reset form
            form.reset();
            
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            
        } catch (error) {
            showNotification('Error sending message. Please try again or call us directly.', 'error');
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    }, 2000);
}

// Validate contact form
function validateContactForm(formData) {
    const requiredFields = ['name', 'email', 'subject', 'message'];
    
    for (let field of requiredFields) {
        if (!formData.get(field) || formData.get(field).trim() === '') {
            showNotification(`Please fill in the ${field} field`, 'error');
            return false;
        }
    }
    
    // Validate email
    if (!validateEmail(formData.get('email'))) {
        showNotification('Please enter a valid email address', 'error');
        return false;
    }
    
    // Validate phone if provided
    const phone = formData.get('phone');
    if (phone && phone.trim() !== '' && !validatePhone(phone)) {
        showNotification('Please enter a valid phone number', 'error');
        return false;
    }
    
    // Validate message length
    const message = formData.get('message');
    if (message.length < 10) {
        showNotification('Please provide a more detailed message (at least 10 characters)', 'error');
        return false;
    }
    
    return true;
}

// Save contact message to localStorage
function saveContactMessage(contactData) {
    let messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    messages.push(contactData);
    localStorage.setItem('contactMessages', JSON.stringify(messages));
}

// Generate unique contact message ID
function generateContactId() {
    return 'CON-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5).toUpperCase();
}

// Auto-resize textarea
document.addEventListener('DOMContentLoaded', function() {
    const textarea = document.getElementById('message');
    if (textarea) {
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    }
    
    // Focus on first input when page loads
    const firstInput = document.getElementById('name');
    if (firstInput) {
        firstInput.focus();
    }
});

// Character counter for message field
function addCharacterCounter() {
    const messageField = document.getElementById('message');
    if (!messageField) return;
    
    const counter = document.createElement('div');
    counter.style.cssText = 'text-align: right; font-size: 0.875rem; color: #6b7280; margin-top: 0.25rem;';
    counter.textContent = '0 characters';
    
    messageField.parentNode.appendChild(counter);
    
    messageField.addEventListener('input', function() {
        const length = this.value.length;
        counter.textContent = `${length} character${length !== 1 ? 's' : ''}`;
        
        if (length < 10) {
            counter.style.color = '#ef4444';
        } else if (length > 500) {
            counter.style.color = '#f59e0b';
        } else {
            counter.style.color = '#10b981';
        }
    });
}

// Initialize character counter
document.addEventListener('DOMContentLoaded', addCharacterCounter);
// Admin login functionality

// Handle login form submission
function handleLogin(event) {
    event.preventDefault();
    
    const form = event.target;
    const username = form.username.value;
    const password = form.password.value;
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Store original button text
    const originalText = submitButton.textContent;
    
    // Show loading state
    setLoading(submitButton, true);
    
    // Simulate authentication delay
    setTimeout(() => {
        if (authenticateAdmin(username, password)) {
            showNotification('Login successful! Redirecting to dashboard...', 'success');
            
            // Store login session
            localStorage.setItem('adminLoggedIn', 'true');
            localStorage.setItem('adminUsername', username);
            localStorage.setItem('loginTime', new Date().toISOString());
            
            // Redirect to dashboard
            setTimeout(() => {
                window.location.href = 'admin-dashboard.html';
            }, 1500);
        } else {
            showNotification('Invalid username or password', 'error');
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    }, 1500);
}

// Authenticate admin credentials
function authenticateAdmin(username, password) {
    // Admin credentials: username = Lisa, password = Siyabonga14
    return username === 'Lisa' && password === 'Siyabonga14';
}

// Check if admin is logged in
function isAdminLoggedIn() {
    const loggedIn = localStorage.getItem('adminLoggedIn');
    const loginTime = localStorage.getItem('loginTime');
    
    if (!loggedIn || !loginTime) {
        return false;
    }
    
    // Check if login is still valid (24 hours)
    const loginDate = new Date(loginTime);
    const now = new Date();
    const hoursDiff = (now - loginDate) / (1000 * 60 * 60);
    
    if (hoursDiff > 24) {
        // Session expired
        logout();
        return false;
    }
    
    return true;
}

// Logout function
function logout() {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminUsername');
    localStorage.removeItem('loginTime');
    
    showNotification('Logged out successfully', 'success');
    
    setTimeout(() => {
        window.location.href = 'admin-login.html';
    }, 1000);
}

// Protect admin pages
function protectAdminPage() {
    if (!isAdminLoggedIn()) {
        showNotification('Please log in to access this page', 'warning');
        setTimeout(() => {
            window.location.href = 'admin-login.html';
        }, 1500);
        return false;
    }
    return true;
}

// Initialize admin page protection
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    
    // Protect admin dashboard
    if (currentPage === 'admin-dashboard.html') {
        if (!protectAdminPage()) {
            return;
        }
        
        // Update welcome message
        const username = localStorage.getItem('adminUsername');
        const welcomeSpan = document.querySelector('.nav-actions span');
        if (welcomeSpan && username) {
            welcomeSpan.textContent = `Welcome, ${username}`;
        }
    }
    
    // Redirect if already logged in and on login page
    if (currentPage === 'admin-login.html' && isAdminLoggedIn()) {
        window.location.href = 'admin-dashboard.html';
    }
});
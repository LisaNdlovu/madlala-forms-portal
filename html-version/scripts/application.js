// Application form handling

let currentSchool = '';

// Open application modal
function openApplicationModal(schoolName) {
    currentSchool = schoolName;
    const modal = document.getElementById('applicationModal');
    const schoolNameInput = document.getElementById('schoolName');
    
    if (schoolNameInput) {
        schoolNameInput.value = schoolName;
    }
    
    // Update modal title if it exists
    const modalTitle = modal.querySelector('h2');
    if (modalTitle && schoolName) {
        modalTitle.textContent = `School Application - ${capitalizeSchoolName(schoolName)}`;
    }
    
    modal.style.display = 'block';
    
    // Clear form
    document.getElementById('applicationForm').reset();
}

// Close application modal
function closeApplicationModal() {
    const modal = document.getElementById('applicationModal');
    modal.style.display = 'none';
    currentSchool = '';
}

// Submit application
function submitApplication(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const submitButton = form.querySelector('button[type="submit"]');
    
    // Validate form
    if (!validateApplicationForm(formData)) {
        return;
    }
    
    // Show loading state
    const originalText = submitButton.textContent;
    setLoading(submitButton, true);
    
    // Prepare application data
    const applicationData = {
        id: generateApplicationId(),
        studentName: formData.get('studentName'),
        parentName: formData.get('parentName'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        grade: formData.get('grade'),
        address: formData.get('address'),
        schoolName: formData.get('schoolName') || currentSchool,
        status: 'pending',
        submissionDate: new Date().toISOString(),
        submissionTime: new Date().toLocaleString()
    };
    
    // Simulate API call
    setTimeout(() => {
        try {
            // Save to localStorage (in a real app, this would be sent to a server)
            saveApplication(applicationData);
            
            // Show success message
            showNotification('Application submitted successfully! You will receive a confirmation email shortly.', 'success');
            
            // Close modal
            closeApplicationModal();
            
            // Reset loading state
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            
        } catch (error) {
            showNotification('Error submitting application. Please try again.', 'error');
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    }, 2000);
}

// Validate application form
function validateApplicationForm(formData) {
    const requiredFields = ['studentName', 'parentName', 'phone', 'email', 'grade', 'address'];
    
    for (let field of requiredFields) {
        if (!formData.get(field) || formData.get(field).trim() === '') {
            showNotification(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`, 'error');
            return false;
        }
    }
    
    // Validate email
    if (!validateEmail(formData.get('email'))) {
        showNotification('Please enter a valid email address', 'error');
        return false;
    }
    
    // Validate phone
    if (!validatePhone(formData.get('phone'))) {
        showNotification('Please enter a valid phone number', 'error');
        return false;
    }
    
    return true;
}

// Save application to localStorage
function saveApplication(applicationData) {
    let applications = JSON.parse(localStorage.getItem('schoolApplications') || '[]');
    applications.push(applicationData);
    localStorage.setItem('schoolApplications', JSON.stringify(applications));
    
    // Update application count in localStorage for admin dashboard
    localStorage.setItem('totalApplications', applications.length.toString());
    localStorage.setItem('pendingApplications', applications.filter(app => app.status === 'pending').length.toString());
    localStorage.setItem('approvedApplications', applications.filter(app => app.status === 'approved').length.toString());
}

// Generate unique application ID
function generateApplicationId() {
    return 'APP-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5).toUpperCase();
}

// Capitalize school name
function capitalizeSchoolName(schoolName) {
    const schoolNames = {
        'hlomani': 'Hlomani High School',
        'kurhula': 'Kurhula High School',
        'madlala': 'Madlala High School',
        'mabarhule': 'Mabarhule High School'
    };
    
    return schoolNames[schoolName] || schoolName.charAt(0).toUpperCase() + schoolName.slice(1) + ' High School';
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('applicationModal');
    if (event.target === modal) {
        closeApplicationModal();
    }
});

// Close modal on escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeApplicationModal();
    }
});
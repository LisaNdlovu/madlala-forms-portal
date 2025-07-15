// Admin dashboard functionality

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    if (!protectAdminPage()) {
        return;
    }
    
    loadDashboardData();
    loadApplications();
});

// Load dashboard statistics
function loadDashboardData() {
    const applications = JSON.parse(localStorage.getItem('schoolApplications') || '[]');
    
    const totalApplications = applications.length;
    const pendingApplications = applications.filter(app => app.status === 'pending').length;
    const approvedApplications = applications.filter(app => app.status === 'approved').length;
    
    // Update stat cards
    document.getElementById('totalApplications').textContent = totalApplications;
    document.getElementById('pendingApplications').textContent = pendingApplications;
    document.getElementById('approvedApplications').textContent = approvedApplications;
}

// Load applications table
function loadApplications() {
    const applications = JSON.parse(localStorage.getItem('schoolApplications') || '[]');
    const tableBody = document.getElementById('applicationsTableBody');
    
    if (!tableBody) return;
    
    // Sort applications by submission date (newest first)
    applications.sort((a, b) => new Date(b.submissionDate) - new Date(a.submissionDate));
    
    if (applications.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align: center; padding: 2rem; color: #6b7280;">
                    No applications found
                </td>
            </tr>
        `;
        return;
    }
    
    tableBody.innerHTML = applications.map(app => `
        <tr>
            <td>${formatDate(app.submissionDate)}</td>
            <td>${app.studentName}</td>
            <td>${capitalizeSchoolName(app.schoolName)}</td>
            <td>Grade ${app.grade}</td>
            <td>${app.parentName}</td>
            <td>${app.phone}</td>
            <td>
                <span class="status-badge status-${app.status}">
                    ${app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                </span>
            </td>
            <td>
                <button class="btn btn-outline" style="padding: 0.25rem 0.75rem; font-size: 0.875rem;" onclick="viewApplication('${app.id}')">
                    View
                </button>
                ${app.status === 'pending' ? `
                    <button class="btn btn-primary" style="padding: 0.25rem 0.75rem; font-size: 0.875rem; margin-left: 0.5rem;" onclick="approveApplication('${app.id}')">
                        Approve
                    </button>
                ` : ''}
            </td>
        </tr>
    `).join('');
}

// View application details
function viewApplication(applicationId) {
    const applications = JSON.parse(localStorage.getItem('schoolApplications') || '[]');
    const application = applications.find(app => app.id === applicationId);
    
    if (!application) {
        showNotification('Application not found', 'error');
        return;
    }
    
    const modal = document.getElementById('applicationDetailModal');
    const content = document.getElementById('applicationDetailContent');
    
    content.innerHTML = `
        <div class="application-detail">
            <div class="detail-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
                <div>
                    <strong>Application ID:</strong><br>
                    ${application.id}
                </div>
                <div>
                    <strong>Submission Date:</strong><br>
                    ${formatDate(application.submissionDate)}
                </div>
                <div>
                    <strong>Student Name:</strong><br>
                    ${application.studentName}
                </div>
                <div>
                    <strong>Grade:</strong><br>
                    Grade ${application.grade}
                </div>
                <div>
                    <strong>Parent/Guardian:</strong><br>
                    ${application.parentName}
                </div>
                <div>
                    <strong>School:</strong><br>
                    ${capitalizeSchoolName(application.schoolName)}
                </div>
                <div>
                    <strong>Phone:</strong><br>
                    ${application.phone}
                </div>
                <div>
                    <strong>Email:</strong><br>
                    ${application.email}
                </div>
            </div>
            <div style="margin-bottom: 1.5rem;">
                <strong>Address:</strong><br>
                ${application.address}
            </div>
            <div style="margin-bottom: 1.5rem;">
                <strong>Status:</strong><br>
                <span class="status-badge status-${application.status}">
                    ${application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                </span>
            </div>
            ${application.status === 'pending' ? `
                <div class="application-actions" style="display: flex; gap: 1rem; justify-content: flex-end;">
                    <button class="btn btn-outline" onclick="rejectApplication('${application.id}')">
                        Reject
                    </button>
                    <button class="btn btn-primary" onclick="approveApplication('${application.id}')">
                        Approve
                    </button>
                </div>
            ` : ''}
        </div>
    `;
    
    modal.style.display = 'block';
}

// Close application detail modal
function closeApplicationDetailModal() {
    const modal = document.getElementById('applicationDetailModal');
    modal.style.display = 'none';
}

// Approve application
function approveApplication(applicationId) {
    updateApplicationStatus(applicationId, 'approved');
    showNotification('Application approved successfully', 'success');
    closeApplicationDetailModal();
    refreshApplications();
}

// Reject application
function rejectApplication(applicationId) {
    if (confirm('Are you sure you want to reject this application?')) {
        updateApplicationStatus(applicationId, 'rejected');
        showNotification('Application rejected', 'warning');
        closeApplicationDetailModal();
        refreshApplications();
    }
}

// Update application status
function updateApplicationStatus(applicationId, newStatus) {
    let applications = JSON.parse(localStorage.getItem('schoolApplications') || '[]');
    const applicationIndex = applications.findIndex(app => app.id === applicationId);
    
    if (applicationIndex !== -1) {
        applications[applicationIndex].status = newStatus;
        applications[applicationIndex].statusUpdatedDate = new Date().toISOString();
        localStorage.setItem('schoolApplications', JSON.stringify(applications));
    }
}

// Refresh applications
function refreshApplications() {
    loadDashboardData();
    loadApplications();
}

// Format date for display
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-ZA', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Capitalize school name (same as in application.js)
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
    const modal = document.getElementById('applicationDetailModal');
    if (event.target === modal) {
        closeApplicationDetailModal();
    }
});

// Export applications (bonus feature)
function exportApplications() {
    const applications = JSON.parse(localStorage.getItem('schoolApplications') || '[]');
    
    if (applications.length === 0) {
        showNotification('No applications to export', 'warning');
        return;
    }
    
    const csvContent = [
        ['ID', 'Submission Date', 'Student Name', 'Grade', 'Parent/Guardian', 'Phone', 'Email', 'School', 'Address', 'Status'],
        ...applications.map(app => [
            app.id,
            formatDate(app.submissionDate),
            app.studentName,
            app.grade,
            app.parentName,
            app.phone,
            app.email,
            capitalizeSchoolName(app.schoolName),
            app.address,
            app.status
        ])
    ].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `school-applications-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    showNotification('Applications exported successfully', 'success');
}
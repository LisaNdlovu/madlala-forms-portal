# Mpumalanga Schools Website

A static HTML website for Mpumalanga Schools showcasing school information, application forms, and administrative dashboard.

## Structure

```
html-version/
├── index.html                 # Homepage
├── schools.html              # Schools listing page
├── school-hlomani.html       # Hlomani High School details
├── contact.html              # Contact page
├── admin-login.html          # Admin login page
├── admin-dashboard.html      # Admin dashboard
├── styles/
│   └── main.css             # Main stylesheet
├── scripts/
│   ├── main.js              # Common functionality
│   ├── application.js       # Application form handling
│   ├── admin.js             # Admin authentication
│   ├── admin-dashboard.js   # Dashboard functionality
│   └── contact.js           # Contact form handling
├── images/                  # School images folder
└── README.md               # This file
```

## Features

### Public Features
- **Homepage**: Hero section with school quick links
- **Schools Listing**: Grid view of all schools with application buttons
- **School Details**: Individual pages for each school with galleries
- **Application Form**: Online application system for school enrollment
- **Contact Form**: Contact form for inquiries

### Admin Features
- **Admin Login**: Secure login (Username: Lisa, Password: Siyabonga14)
- **Dashboard**: View application statistics and manage submissions
- **Application Management**: View, approve, or reject applications

## Schools

1. **Hlomani High School** - Lillydale A, Mpumalanga
2. **Kurhula High School** - Huntington, Mpumalanga  
3. **Madlala High School** - Justicia, Mpumalanga
4. **Mabarhule High School** - Lillydale B, Mpumalanga

## Technical Details

### Data Storage
- Uses localStorage for application and contact form data
- Applications are stored with status tracking (pending, approved, rejected)
- Admin session management with 24-hour timeout

### Responsive Design
- Mobile-first responsive design
- Grid layouts that adapt to screen size
- Touch-friendly interface elements

### Form Validation
- Client-side validation for all forms
- Email and phone number format validation
- Required field validation with user-friendly messages

### Security
- Basic admin authentication
- Session timeout for admin users
- Form data sanitization

## Setup Instructions

1. Extract all files to a web server directory
2. Add school images to the `images/` folder:
   - hlomani1.jpg, hlomani2.jpg, hlomani3.jpg
   - kurhula1.jpg, kurhula2.jpg, kurhula3.jpg
   - madlala1.jpg, madlala2.jpg, madlala3.jpg
   - school-placeholder.jpg (for Mabarhule)
3. Open `index.html` in a web browser
4. For admin access, use credentials: Lisa / Siyabonga14

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Contact Information

- **Phone**: +27608415662
- **Email**: info@mpumalangaschools.edu.za
- **Address**: Mpumalanga Department of Education, Government Boulevard, Nelspruit, 1200

## License

© 2024 Mpumalanga Schools. All rights reserved.
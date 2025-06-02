
# Backend API Specification for Free Audit Form

## Overview
This document outlines the backend API endpoint requirements for processing the free audit form submissions with file attachments and email functionality.

## API Endpoint: POST /api/free-audit

### Request Format
- **Content-Type**: multipart/form-data
- **Method**: POST

### Form Fields
```
firstName: string (required)
lastName: string (required)
email: string (required, valid email)
company: string (required)
phone: string (required)
platform: string (required, enum: "amazon" | "walmart" | "meta" | "multiple")
monthlyAdSpend: string (required)
businessGoals: string (required)
adminEmail: string (fixed: "admin@amzadscout.com")
```

### File Fields (optional)
```
businessReport: File (PDF, Excel, CSV, max 10MB)
searchTermReport: File (PDF, Excel, CSV, max 10MB)
asinReport: File (PDF, Excel, CSV, max 10MB)
```

### Response Format
```json
{
  "success": true,
  "message": "Audit request submitted successfully",
  "requestId": "unique-request-id"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "details": "Additional error details"
}
```

## Backend Implementation Requirements

### 1. Database Schema
Create a table `audit_requests` with columns:
```sql
CREATE TABLE audit_requests (
  id SERIAL PRIMARY KEY,
  request_id VARCHAR(255) UNIQUE,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL,
  platform VARCHAR(50) NOT NULL,
  monthly_ad_spend VARCHAR(100) NOT NULL,
  business_goals TEXT NOT NULL,
  business_report_path VARCHAR(500),
  search_term_report_path VARCHAR(500),
  asin_report_path VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  email_sent BOOLEAN DEFAULT FALSE
);
```

### 2. File Upload Handling
- Store uploaded files in a secure directory on your server
- Validate file types (PDF, Excel, CSV only)
- Validate file sizes (max 10MB each)
- Generate unique filenames to avoid conflicts
- Store file paths in database

### 3. Email Configuration (SMTP)
Required environment variables:
```
SMTP_HOST=your-smtp-server.com
SMTP_PORT=587
SMTP_USER=your-smtp-username
SMTP_PASS=your-smtp-password
SMTP_FROM=noreply@yourdomain.com
```

### 4. Email Template
Send email to: admin@amzadscout.com
Subject: "New Free Audit Request - [Company Name]"

Email body should include:
- Contact Information (name, email, phone, company)
- Business Details (platform, monthly ad spend, business goals)
- Attached files (if any)

### 5. Example Backend Implementation (Node.js/Express)

```javascript
const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/audit-requests/');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.pdf', '.xlsx', '.xls', '.csv'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

// Configure nodemailer
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

app.post('/api/free-audit', upload.fields([
  { name: 'businessReport', maxCount: 1 },
  { name: 'searchTermReport', maxCount: 1 },
  { name: 'asinReport', maxCount: 1 }
]), async (req, res) => {
  try {
    const requestId = uuidv4();
    const { firstName, lastName, email, company, phone, platform, monthlyAdSpend, businessGoals } = req.body;
    
    // Save to database
    // ... database insertion code ...
    
    // Prepare email attachments
    const attachments = [];
    if (req.files.businessReport) {
      attachments.push({
        filename: req.files.businessReport[0].originalname,
        path: req.files.businessReport[0].path
      });
    }
    // ... add other attachments ...
    
    // Send email
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: 'admin@amzadscout.com',
      subject: `New Free Audit Request - ${company}`,
      html: `
        <h2>New Free Audit Request</h2>
        <p><strong>Contact Information:</strong></p>
        <ul>
          <li>Name: ${firstName} ${lastName}</li>
          <li>Email: ${email}</li>
          <li>Phone: ${phone}</li>
          <li>Company: ${company}</li>
        </ul>
        <p><strong>Business Details:</strong></p>
        <ul>
          <li>Platform: ${platform}</li>
          <li>Monthly Ad Spend: ${monthlyAdSpend}</li>
          <li>Business Goals: ${businessGoals}</li>
        </ul>
      `,
      attachments: attachments
    });
    
    res.json({
      success: true,
      message: 'Audit request submitted successfully',
      requestId: requestId
    });
    
  } catch (error) {
    console.error('Error processing audit request:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      details: error.message
    });
  }
});
```

### 6. Environment Setup
1. Update your .env file with the API URL:
   ```
   VITE_API_URL=https://yourdomain.com
   ```

2. Ensure your backend server supports:
   - CORS for your domain
   - Multipart form data parsing
   - File upload handling
   - SMTP email sending

### 7. Testing
Test the endpoint with curl:
```bash
curl -X POST http://localhost:3001/api/free-audit \
  -F "firstName=John" \
  -F "lastName=Doe" \
  -F "email=john@example.com" \
  -F "company=Test Company" \
  -F "phone=1234567890" \
  -F "platform=amazon" \
  -F "monthlyAdSpend=5k-10k" \
  -F "businessGoals=Increase ROAS" \
  -F "businessReport=@/path/to/file.pdf"
```


# Database API Endpoints

This document outlines the required API endpoints for your SQL database integration.

## Required Endpoints

### Security Logs

**POST /api/security-logs**
```json
{
  "form_type": "contact",
  "ip_address": "192.168.1.1",
  "user_agent": "Mozilla/5.0...",
  "recaptcha_score": 0.7,
  "honeypot_triggered": false,
  "csrf_valid": true,
  "submission_data": {}
}
```

**GET /api/security-logs?limit=100**
Returns array of security log objects.

### Leads

**POST /api/leads**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "company": "Acme Corp",
  "source": "website",
  "status": "new",
  "notes": "Interested in our services",
  "form_security": {},
  "lead_data": {}
}
```

### Contact Submissions

**POST /api/contact-submissions**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "company": "Acme Corp",
  "message": "Hello, I'm interested...",
  "form_type": "contact"
}
```

## Database Schema

Create these tables in your SQL database:

```sql
-- Security logs table
CREATE TABLE form_security_logs (
  id VARCHAR(36) PRIMARY KEY,
  form_type VARCHAR(50) NOT NULL,
  ip_address VARCHAR(45),
  user_agent TEXT,
  recaptcha_score DECIMAL(3,2),
  honeypot_triggered BOOLEAN,
  csrf_valid BOOLEAN,
  submission_data JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Leads table
CREATE TABLE leads (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  company VARCHAR(255),
  source VARCHAR(100),
  status VARCHAR(50) DEFAULT 'new',
  notes TEXT,
  form_security JSON,
  lead_data JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Contact submissions table
CREATE TABLE contact_submissions (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  company VARCHAR(255),
  message TEXT,
  form_type VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Implementation Notes

1. Replace `/api` in `src/services/databaseService.ts` with your actual API base URL
2. Implement proper error handling and validation in your API endpoints
3. Consider adding authentication/authorization for the API endpoints
4. The IP address should be captured on the backend for security
5. Generate UUIDs for the `id` fields in your backend implementation

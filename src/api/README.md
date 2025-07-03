
# PostgreSQL Database API Endpoints

This document outlines the required API endpoints for your PostgreSQL database integration.

## Database Connection

You'll need to set up a PostgreSQL database and configure your backend to connect to it. Example connection configuration:

```javascript
// Example using pg (node-postgres)
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});
```

## Required API Endpoints

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

## PostgreSQL Database Schema

Create these tables in your PostgreSQL database:

```sql
-- Security logs table
CREATE TABLE form_security_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  form_type VARCHAR(50) NOT NULL,
  ip_address INET,
  user_agent TEXT,
  recaptcha_score DECIMAL(3,2),
  honeypot_triggered BOOLEAN DEFAULT FALSE,
  csrf_valid BOOLEAN DEFAULT TRUE,
  submission_data JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Leads table
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  company VARCHAR(255),
  source VARCHAR(100),
  status VARCHAR(50) DEFAULT 'new',
  notes TEXT,
  form_security JSONB DEFAULT '{}',
  lead_data JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Contact submissions table
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  company VARCHAR(255),
  message TEXT,
  form_type VARCHAR(50) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX idx_form_security_logs_form_type ON form_security_logs(form_type);
CREATE INDEX idx_form_security_logs_created_at ON form_security_logs(created_at DESC);
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX idx_leads_source ON leads(source);
CREATE INDEX idx_leads_status ON leads(status);
CREATE INDEX idx_contact_submissions_form_type ON contact_submissions(form_type);
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at DESC);

-- Trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON leads
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## Backend Implementation Example

Here's an example API endpoint implementation using Node.js and Express with PostgreSQL:

```javascript
const express = require('express');
const { Pool } = require('pg');
const app = express();

const pool = new Pool({
  // Your PostgreSQL connection config
});

// Security logs endpoint
app.post('/api/security-logs', async (req, res) => {
  try {
    const {
      form_type,
      ip_address,
      user_agent,
      recaptcha_score,
      honeypot_triggered,
      csrf_valid,
      submission_data
    } = req.body;

    const query = `
      INSERT INTO form_security_logs 
      (form_type, ip_address, user_agent, recaptcha_score, honeypot_triggered, csrf_valid, submission_data)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;

    await pool.query(query, [
      form_type,
      ip_address,
      user_agent,
      recaptcha_score,
      honeypot_triggered,
      csrf_valid,
      JSON.stringify(submission_data)
    ]);

    res.status(201).json({ success: true });
  } catch (error) {
    console.error('Error inserting security log:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get security logs
app.get('/api/security-logs', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 100;
    const query = `
      SELECT * FROM form_security_logs 
      ORDER BY created_at DESC 
      LIMIT $1
    `;
    
    const result = await pool.query(query, [limit]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching security logs:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Leads endpoint
app.post('/api/leads', async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      company,
      source,
      status,
      notes,
      form_security,
      lead_data
    } = req.body;

    const query = `
      INSERT INTO leads 
      (name, email, phone, company, source, status, notes, form_security, lead_data)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `;

    const result = await pool.query(query, [
      name,
      email,
      phone,
      company,
      source || 'website',
      status || 'new',
      notes,
      JSON.stringify(form_security),
      JSON.stringify(lead_data)
    ]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error inserting lead:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Contact submissions endpoint
app.post('/api/contact-submissions', async (req, res) => {
  try {
    const { name, email, phone, company, message, form_type } = req.body;

    const query = `
      INSERT INTO contact_submissions 
      (name, email, phone, company, message, form_type)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;

    await pool.query(query, [name, email, phone, company, message, form_type]);
    res.status(201).json({ success: true });
  } catch (error) {
    console.error('Error inserting contact submission:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
```

## Environment Variables

Set these environment variables for your PostgreSQL connection:

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=your_database_name
DB_USER=your_username
DB_PASSWORD=your_password
```

## Implementation Notes

1. Update the `baseUrl` in `src/services/databaseService.ts` to point to your PostgreSQL backend API
2. The frontend code is already configured to work with PostgreSQL through the API endpoints
3. Make sure to handle CORS properly in your backend for frontend requests
4. Consider adding authentication/authorization for sensitive endpoints
5. The IP address should be captured on the backend for security reasons
6. Use prepared statements to prevent SQL injection (as shown in the examples)
7. Consider adding connection pooling and proper error handling
8. Set up proper logging and monitoring for your PostgreSQL database


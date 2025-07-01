
export interface EmailTemplate {
  subject: string;
  htmlBody: string;
  textBody?: string;
}

export interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

class EmailService {
  private static instance: EmailService;

  static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  async sendEmail(
    to: string[],
    subject: string,
    htmlBody: string,
    textBody?: string
  ): Promise<EmailResult> {
    try {
      // Simulate email sending with a demo response
      console.log('Demo Email Service - Email would be sent:', {
        to,
        subject,
        htmlBody,
        textBody,
        timestamp: new Date().toISOString()
      });
      
      // Store email in localStorage for demo purposes
      const emails = JSON.parse(localStorage.getItem('demo_emails') || '[]');
      emails.push({
        id: `email_${Date.now()}`,
        to,
        subject,
        htmlBody,
        textBody,
        sentAt: new Date().toISOString(),
        status: 'sent'
      });
      localStorage.setItem('demo_emails', JSON.stringify(emails));
      
      return {
        success: true,
        messageId: `demo_${Date.now()}`,
      };
    } catch (error) {
      console.error('Email sending error:', error);
      return {
        success: false,
        error: `Email failed to send: ${error}`
      };
    }
  }

  async sendContactForm(data: {
    name: string;
    email: string;
    company?: string;
    message: string;
  }): Promise<EmailResult> {
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Contact Form Submission</h2>
        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
          <div style="margin-top: 20px;">
            <strong>Message:</strong>
            <div style="background: white; padding: 15px; border-radius: 4px; margin-top: 10px;">
              ${data.message.replace(/\n/g, '<br>')}
            </div>
          </div>
        </div>
      </div>
    `;

    const textBody = `
      New Contact Form Submission
      Name: ${data.name}
      Email: ${data.email}
      ${data.company ? `Company: ${data.company}` : ''}
      Message: ${data.message}
    `;

    // Send confirmation to user
    const confirmationResult = await this.sendEmail(
      [data.email],
      'Thank you for contacting us',
      `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Thank you for your message, ${data.name}!</h2>
          <p>We have received your inquiry and will get back to you within 24 hours.</p>
          <div style="background: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Your message:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #007bff;">
              ${data.message.replace(/\n/g, '<br>')}
            </div>
          </div>
          <p>Best regards,<br>The Team</p>
        </div>
      `,
      `Thank you for your message, ${data.name}! We will get back to you within 24 hours.`
    );

    // Also send notification to admin (in demo, just log it)
    await this.sendEmail(
      ['admin@example.com'],
      'New Contact Form Submission',
      htmlBody,
      textBody
    );

    return confirmationResult;
  }

  async sendWelcomeEmail(userEmail: string, userName: string): Promise<EmailResult> {
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">Welcome to our platform, ${userName}!</h1>
        <p>Thank you for signing up. We're excited to have you on board.</p>
        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Here's what you can do next:</h3>
          <ul>
            <li>Complete your profile setup</li>
            <li>Explore our features</li>
            <li>Contact our support team if you need help</li>
          </ul>
        </div>
        <p>Best regards,<br>The Team</p>
      </div>
    `;

    return this.sendEmail(
      [userEmail],
      'Welcome to our platform!',
      htmlBody,
      `Welcome ${userName}! Thank you for signing up.`
    );
  }

  async sendPasswordResetEmail(userEmail: string, resetLink: string): Promise<EmailResult> {
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">Password Reset Request</h1>
        <p>You requested a password reset. Click the button below to reset your password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetLink}" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">Reset Password</a>
        </div>
        <p>If you didn't request this, please ignore this email.</p>
        <p>This link will expire in 24 hours.</p>
      </div>
    `;

    return this.sendEmail(
      [userEmail],
      'Password Reset Request',
      htmlBody,
      `Password reset link: ${resetLink}`
    );
  }
}

export const emailService = EmailService.getInstance();


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
      // For demo purposes, log the email instead of actually sending
      console.log('Email would be sent:', {
        to,
        subject,
        htmlBody,
        textBody
      });
      
      return {
        success: false,
        error: 'Email service not configured. Please configure an email provider (SES, SendGrid, etc.) in the dashboard.'
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
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
      <p><strong>Message:</strong></p>
      <p>${data.message.replace(/\n/g, '<br>')}</p>
    `;

    const textBody = `
      New Contact Form Submission
      Name: ${data.name}
      Email: ${data.email}
      ${data.company ? `Company: ${data.company}` : ''}
      Message: ${data.message}
    `;

    return this.sendEmail(
      [data.email], // Send confirmation to user
      'Thank you for contacting us',
      `
        <h2>Thank you for your message, ${data.name}!</h2>
        <p>We have received your inquiry and will get back to you within 24 hours.</p>
        <p>Here's a copy of your message:</p>
        <blockquote style="border-left: 4px solid #ccc; padding-left: 16px; margin: 16px 0;">
          ${data.message.replace(/\n/g, '<br>')}
        </blockquote>
        <p>Best regards,<br>The Team</p>
      `,
      `Thank you for your message, ${data.name}! We will get back to you within 24 hours.`
    );
  }

  async sendWelcomeEmail(userEmail: string, userName: string): Promise<EmailResult> {
    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #333;">Welcome to our platform, ${userName}!</h1>
        <p>Thank you for signing up. We're excited to have you on board.</p>
        <p>Here's what you can do next:</p>
        <ul>
          <li>Complete your profile setup</li>
          <li>Explore our features</li>
          <li>Contact our support team if you need help</li>
        </ul>
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

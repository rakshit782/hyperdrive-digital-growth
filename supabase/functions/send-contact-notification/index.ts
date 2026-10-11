import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactNotificationRequest {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  formType?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, company, message, formType }: ContactNotificationRequest = await req.json();

    let dynamicApiKey = Deno.env.get("RESEND_API_KEY");
    let recipientEmails: string[] = [];
    let isEmailEnabled = true;

    // Connect to Neon to check dashboard-configured email settings
    try {
      const neonUrl = Deno.env.get("NEON_DATABASE_URL");
      if (neonUrl) {
        const { Client } = await import("https://deno.land/x/postgres@v0.17.0/mod.ts");
        const client = new Client(neonUrl);
        await client.connect();
        const settingsRes = await client.queryObject<{
          resend_api_key: string | null;
          notification_email: string | null;
          email_notifications_enabled: boolean;
        }>(
          "SELECT resend_api_key, notification_email, email_notifications_enabled FROM amz_app.site_settings WHERE id = 1"
        );
        await client.end();

        const s = settingsRes.rows[0];
        if (s?.resend_api_key) {
          dynamicApiKey = s.resend_api_key;
        }
        if (s?.notification_email) {
          recipientEmails = s.notification_email.split(",").map((e) => e.trim()).filter(Boolean);
        }
        if (typeof s?.email_notifications_enabled === "boolean") {
          isEmailEnabled = s.email_notifications_enabled;
        }
      }
    } catch (dbErr) {
      console.warn("Could not load email settings from Neon:", dbErr);
    }

    if (!isEmailEnabled || !dynamicApiKey) {
      console.log("Email notification skipped: not configured or disabled.");
      return new Response(JSON.stringify({ success: true, message: "Email notifications disabled or not configured" }), {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const resend = new Resend(dynamicApiKey);

    // Send notification to admin if recipient is specified
    let adminEmail = null;
    if (recipientEmails.length > 0) {
      adminEmail = await resend.emails.send({
        from: "AMZ Inquiries <onboarding@resend.dev>",
        to: recipientEmails,
        subject: `New ${formType || 'Contact'} Form Submission from ${name}`,
        html: `
          <h2>New Contact / Inquiry Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
          ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
          ${message ? `<p><strong>Message:</strong></p><p>${message}</p>` : ''}
          <p><strong>Form Type:</strong> ${formType || 'contact'}</p>
          <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
        `,
      });
    }

    // Send confirmation to lead
    const confirmationEmail = await resend.emails.send({
      from: "AMZ AD SCOUT <onboarding@resend.dev>",
      to: [email],
      subject: "Thank you for contacting AMZ AD SCOUT!",
      html: `
        <h1>Thank you for reaching out, ${name}!</h1>
        <p>We have received your message and our growth team will get back to you shortly.</p>
        <p>Our team typically responds within 24 hours.</p>
        <br>
        <p>Best regards,<br>The AMZ AD SCOUT Team</p>
      `,
    });

    console.log("Emails sent successfully:", { adminEmail, confirmationEmail });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-notification function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);

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

    // Send notification to admin
    const adminEmail = await resend.emails.send({
      from: "Leads <onboarding@resend.dev>",
      to: ["admin@yourdomain.com"], // Replace with actual admin email
      subject: `New ${formType || 'Contact'} Form Submission from ${name}`,
      html: `
        <h2>New Lead Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
        ${message ? `<p><strong>Message:</strong></p><p>${message}</p>` : ''}
        <p><strong>Form Type:</strong> ${formType || 'contact'}</p>
        <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
      `,
    });

    // Send confirmation to lead
    const confirmationEmail = await resend.emails.send({
      from: "Digital Growth <onboarding@resend.dev>",
      to: [email],
      subject: "Thank you for contacting us!",
      html: `
        <h1>Thank you for reaching out, ${name}!</h1>
        <p>We have received your message and will get back to you as soon as possible.</p>
        <p>Our team typically responds within 24 hours.</p>
        <br>
        <p>Best regards,<br>The Digital Growth Team</p>
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

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const leadData = await req.json();
    
    console.log("Inserting lead submission:", { email: leadData.email });

    // Connect to Neon
    const client = new Client(Deno.env.get("NEON_DATABASE_URL")!);
    await client.connect();

    try {
      // Generate lead number
      const leadNumber = `LEAD-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;
      
      const result = await client.queryObject<{ id: string; lead_number: string }>(
        `INSERT INTO leads (
          name, email, phone, company, brand_name, website_url, amazon_store_url, walmart_store_url,
          source, status, notes, lead_number, audit_type, current_spend, goals, lead_data, 
          created_at, updated_at
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, NOW(), NOW())
        RETURNING id, lead_number`,
        [
          leadData.name,
          leadData.email,
          leadData.phone || null,
          leadData.company || null,
          leadData.brandName || null,
          leadData.website || null,
          leadData.amazonStoreUrl || null,
          leadData.walmartStoreUrl || null,
          leadData.source || 'website',
          leadData.status || 'new',
          leadData.notes || null,
          leadNumber,
          leadData.auditType || null,
          leadData.currentSpend || null,
          leadData.goals || null,
          JSON.stringify(leadData.uploadedFiles || {})
        ]
      );

      // Check email notification settings in amz_app.site_settings
      try {
        const settingsResult = await client.queryObject<{
          resend_api_key: string | null;
          notification_email: string | null;
          email_notifications_enabled: boolean;
          email_subject_template: string | null;
          email_html_template: string | null;
        }>(
          `SELECT resend_api_key, notification_email, email_notifications_enabled,
                  email_subject_template, email_html_template
           FROM amz_app.site_settings
           WHERE id = 1`
        );

        const emailSettings = settingsResult.rows[0];
        const resendKey = emailSettings?.resend_api_key || Deno.env.get("RESEND_API_KEY");
        const recipientEmail = emailSettings?.notification_email;
        const isEnabled = emailSettings ? emailSettings.email_notifications_enabled : Boolean(resendKey && recipientEmail);

        if (isEnabled && resendKey && recipientEmail) {
          const recipients = recipientEmail
            .split(",")
            .map((e) => e.trim())
            .filter((e) => e.length > 0);

          if (recipients.length > 0) {
            const auditInfo = leadData.auditType ? `<p><strong>Audit Type:</strong> ${leadData.auditType}</p>` : "";
            const currentSpend = leadData.currentSpend ? `<p><strong>Monthly Ad Spend:</strong> ${leadData.currentSpend}</p>` : "";
            const goals = leadData.goals ? `<p><strong>Goals:</strong> ${leadData.goals}</p>` : "";
            const notes = leadData.notes ? `<p><strong>Notes:</strong> ${leadData.notes}</p>` : "";
            const phone = leadData.phone ? `<p><strong>Phone:</strong> ${leadData.phone}</p>` : "";
            const company = leadData.company ? `<p><strong>Company:</strong> ${leadData.company}</p>` : "";
            const website = leadData.website ? `<p><strong>Website:</strong> <a href="${leadData.website}">${leadData.website}</a></p>` : "";
            const amazonStore = leadData.amazonStoreUrl ? `<p><strong>Amazon Store:</strong> <a href="${leadData.amazonStoreUrl}">${leadData.amazonStoreUrl}</a></p>` : "";
            const walmartStore = leadData.walmartStoreUrl ? `<p><strong>Walmart Store:</strong> <a href="${leadData.walmartStoreUrl}">${leadData.walmartStoreUrl}</a></p>` : "";

            const defaultHtml = `
              <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px;">
                <div style="border-bottom: 2px solid #0284c7; padding-bottom: 12px; margin-bottom: 20px;">
                  <h2 style="color: #0f172a; margin: 0 0 6px 0;">🎯 New Lead Received: {lead_number}</h2>
                  <p style="color: #64748b; margin: 0; font-size: 14px;">Source: {source}</p>
                </div>
                <div style="font-size: 15px; line-height: 1.6; color: #334155;">
                  <p><strong>Name:</strong> {name}</p>
                  <p><strong>Email:</strong> <a href="mailto:{email}">{email}</a></p>
                  ${phone}
                  ${company}
                  ${website}
                  ${amazonStore}
                  ${walmartStore}
                  ${auditInfo}
                  ${currentSpend}
                  ${goals}
                  ${notes}
                  <p style="color: #94a3b8; font-size: 13px; margin-top: 24px; border-top: 1px solid #f1f5f9; padding-top: 12px;">
                    Received at {timestamp}
                  </p>
                </div>
              </div>
            `;

            const replacements: Record<string, string> = {
              "{name}": leadData.name || "",
              "{email}": leadData.email || "",
              "{phone}": leadData.phone || "N/A",
              "{company}": leadData.company || "N/A",
              "{brand}": leadData.brandName || "N/A",
              "{spend}": leadData.currentSpend || "N/A",
              "{audit_type}": leadData.auditType || "N/A",
              "{goals}": leadData.goals || "N/A",
              "{notes}": leadData.notes || "None",
              "{lead_number}": leadNumber,
              "{source}": leadData.source || "Website",
              "{website}": leadData.website || "N/A",
              "{amazon_store}": leadData.amazonStoreUrl || "N/A",
              "{walmart_store}": leadData.walmartStoreUrl || "N/A",
              "{timestamp}": new Date().toUTCString(),
            };

            const interpolate = (tpl: string): string => {
              let result = tpl;
              for (const [key, val] of Object.entries(replacements)) {
                result = result.replaceAll(key, val);
              }
              return result;
            };

            const rawSubject = emailSettings?.email_subject_template?.trim() || "New Lead: {name} ({lead_number})";
            const finalSubject = interpolate(rawSubject);

            const rawHtml = emailSettings?.email_html_template?.trim() || defaultHtml;
            const finalHtml = interpolate(rawHtml);

            const emailRes = await fetch("https://api.resend.com/emails", {
              method: "POST",
              headers: {
                "Authorization": `Bearer ${resendKey}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                from: "AMZ Leads <onboarding@resend.dev>",
                to: recipients,
                subject: finalSubject,
                html: finalHtml,
              }),
            });

            if (!emailRes.ok) {
              const errBody = await emailRes.text();
              console.warn("Resend email delivery failed:", errBody);
            } else {
              console.log("Resend lead notification sent successfully to", recipients);
            }
          }
        }
      } catch (emailErr) {
        // We log error but do not fail lead creation
        console.warn("Could not dispatch lead email notification:", emailErr);
      }

      await client.end();

      return new Response(
        JSON.stringify({ 
          success: true, 
          leadId: result.rows[0]?.id,
          leadNumber: result.rows[0]?.lead_number
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } catch (dbError) {
      await client.end();
      throw dbError;
    }
  } catch (error) {
    console.error("Lead submission error:", error);
    return new Response(
      JSON.stringify({ error: String(error) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

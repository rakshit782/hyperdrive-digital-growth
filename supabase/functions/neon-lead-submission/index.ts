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
      
      const result = await client.queryObject(
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

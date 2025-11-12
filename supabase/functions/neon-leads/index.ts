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
    const { action, limit = 100 } = await req.json();

    console.log("Leads operation:", { action, limit });

    // Connect to Neon
    const client = new Client(Deno.env.get("NEON_DATABASE_URL")!);
    await client.connect();

    try {
      if (action === "list") {
        // Fetch leads from Neon database
        const result = await client.queryObject(
          `SELECT 
            id, name, email, phone, company, brand_name, 
            amazon_store_url, walmart_store_url, source, status, 
            notes, lead_number, audit_type, website_url, 
            current_spend, goals, lead_data, form_security, 
            assigned_to, created_at, updated_at
           FROM leads
           ORDER BY created_at DESC
           LIMIT $1`,
          [limit]
        );

        await client.end();

        return new Response(
          JSON.stringify({ leads: result.rows }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      } else {
        await client.end();
        return new Response(
          JSON.stringify({ error: "Invalid action" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    } catch (dbError) {
      await client.end();
      throw dbError;
    }
  } catch (error) {
    console.error("Leads operation error:", error);
    return new Response(
      JSON.stringify({ error: String(error) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

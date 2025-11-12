import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Get location from IP using ipapi.co
async function getLocationFromIP(ip: string) {
  try {
    const response = await fetch(`https://ipapi.co/${ip}/json/`);
    if (response.ok) {
      const data = await response.json();
      return {
        country: data.country_name || null,
        city: data.city || null,
        region: data.region || null,
        latitude: data.latitude || null,
        longitude: data.longitude || null,
      };
    }
  } catch (error) {
    console.error("Error fetching location:", error);
  }
  return {
    country: null,
    city: null,
    region: null,
    latitude: null,
    longitude: null,
  };
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, limit = 100, logData } = await req.json();

    console.log("Visitor logs operation:", { action, limit });

    // Connect to Neon
    const client = new Client(Deno.env.get("NEON_DATABASE_URL")!);
    await client.connect();

    try {
      if (action === "insert") {
        const location = await getLocationFromIP(logData.ip_address);
        
        await client.queryObject(
          `INSERT INTO visitor_logs (
            ip_address, user_agent, page_url, referrer, 
            country, city, region, latitude, longitude, created_at
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())`,
          [
            logData.ip_address,
            logData.user_agent,
            logData.page_url,
            logData.referrer || null,
            location.country,
            location.city,
            location.region,
            location.latitude,
            location.longitude,
          ]
        );

        await client.end();

        return new Response(
          JSON.stringify({ success: true }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      } else if (action === "list") {
        const result = await client.queryObject(
          `SELECT 
            id, ip_address, user_agent, page_url, referrer,
            country, city, region, latitude, longitude, created_at
           FROM visitor_logs
           ORDER BY created_at DESC
           LIMIT $1`,
          [limit]
        );

        await client.end();

        return new Response(
          JSON.stringify({ logs: result.rows }),
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
    console.error("Visitor logs operation error:", error);
    return new Response(
      JSON.stringify({ error: String(error) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

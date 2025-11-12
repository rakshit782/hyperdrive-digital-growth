import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";
import { verify } from "https://deno.land/x/djwt@v2.8/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const JWT_SECRET = Deno.env.get("JWT_SECRET")!;

async function verifyAdmin(authHeader: string | null): Promise<string | null> {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  try {
    const token = authHeader.substring(7);
    const key = await crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(JWT_SECRET),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    const payload = await verify(token, key);
    
    // Check if user has admin role
    const client = new Client(Deno.env.get("NEON_DATABASE_URL")!);
    await client.connect();
    
    const result = await client.queryObject(
      "SELECT role FROM user_roles WHERE user_id = $1",
      [payload.sub]
    );
    
    await client.end();
    
    if (result.rows.length === 0 || result.rows[0].role !== 'admin') {
      return null;
    }
    
    return payload.sub as string;
  } catch (error) {
    console.error("Auth verification error:", error);
    return null;
  }
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const client = new Client(Deno.env.get("NEON_DATABASE_URL")!);
  
  try {
    const url = new URL(req.url);
    const method = req.method;

    await client.connect();

    // GET - Fetch all pricing plans (public access for active plans)
    if (method === "GET") {
      const result = await client.queryObject(
        `SELECT * FROM pricing_plans 
         WHERE is_active = true 
         ORDER BY sort_order ASC`
      );
      
      await client.end();
      
      return new Response(
        JSON.stringify(result.rows),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // All other operations require admin auth
    const userId = await verifyAdmin(req.headers.get("Authorization"));
    if (!userId) {
      await client.end();
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // POST - Create new pricing plan
    if (method === "POST") {
      const data = await req.json();
      
      const result = await client.queryObject(
        `INSERT INTO pricing_plans (
          name, description, price, billing_period, features, 
          is_popular, is_active, sort_order, created_at, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
        RETURNING *`,
        [
          data.name,
          data.description,
          data.price,
          data.billing_period || 'monthly',
          JSON.stringify(data.features || []),
          data.is_popular || false,
          data.is_active !== undefined ? data.is_active : true,
          data.sort_order || 0
        ]
      );
      
      await client.end();
      
      return new Response(
        JSON.stringify(result.rows[0]),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // PUT - Update pricing plan
    if (method === "PUT") {
      const data = await req.json();
      const id = url.searchParams.get("id");
      
      if (!id) {
        await client.end();
        return new Response(
          JSON.stringify({ error: "Plan ID required" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      const result = await client.queryObject(
        `UPDATE pricing_plans SET
          name = $1,
          description = $2,
          price = $3,
          billing_period = $4,
          features = $5,
          is_popular = $6,
          is_active = $7,
          sort_order = $8,
          updated_at = NOW()
         WHERE id = $9
         RETURNING *`,
        [
          data.name,
          data.description,
          data.price,
          data.billing_period,
          JSON.stringify(data.features || []),
          data.is_popular,
          data.is_active,
          data.sort_order,
          id
        ]
      );
      
      await client.end();
      
      if (result.rows.length === 0) {
        return new Response(
          JSON.stringify({ error: "Plan not found" }),
          { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      return new Response(
        JSON.stringify(result.rows[0]),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // DELETE - Delete pricing plan
    if (method === "DELETE") {
      const id = url.searchParams.get("id");
      
      if (!id) {
        await client.end();
        return new Response(
          JSON.stringify({ error: "Plan ID required" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      await client.queryObject(
        "DELETE FROM pricing_plans WHERE id = $1",
        [id]
      );
      
      await client.end();
      
      return new Response(
        JSON.stringify({ success: true }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    await client.end();
    return new Response(
      JSON.stringify({ error: "Method not allowed" }),
      { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Pricing plans error:", error);
    await client.end();
    return new Response(
      JSON.stringify({ error: String(error) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

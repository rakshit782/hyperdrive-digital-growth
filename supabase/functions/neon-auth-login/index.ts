import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";
import * as bcrypt from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import { create } from "https://deno.land/x/djwt@v2.8/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const JWT_SECRET = Deno.env.get("JWT_SECRET")!;

async function generateTokens(userId: string, email: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(JWT_SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const accessToken = await create(
    { alg: "HS256", typ: "JWT" },
    { 
      sub: userId,
      email,
      exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hour
      iat: Math.floor(Date.now() / 1000)
    },
    key
  );

  const refreshToken = await create(
    { alg: "HS256", typ: "JWT" },
    { 
      sub: userId,
      email,
      type: "refresh",
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30), // 30 days
      iat: Math.floor(Date.now() / 1000)
    },
    key
  );

  return { accessToken, refreshToken };
}

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email and password are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Login attempt for:", email);

    const client = new Client(Deno.env.get("NEON_DATABASE_URL")!);
    await client.connect();

    try {
      // Get user
      const result = await client.queryObject(
        "SELECT id, email, password_hash, full_name FROM users WHERE email = $1",
        [email]
      );

      if (result.rows.length === 0) {
        await client.end();
        return new Response(
          JSON.stringify({ error: "Invalid credentials" }),
          { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const user = result.rows[0] as any;

      // Verify password
      const passwordMatch = await bcrypt.compare(password, user.password_hash);

      if (!passwordMatch) {
        await client.end();
        return new Response(
          JSON.stringify({ error: "Invalid credentials" }),
          { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Get user role
      const roleResult = await client.queryObject(
        "SELECT role FROM user_roles WHERE user_id = $1",
        [user.id]
      );

      const role = roleResult.rows[0]?.role || 'user';

      // Generate tokens
      const tokens = await generateTokens(user.id, user.email);

      await client.end();

      return new Response(
        JSON.stringify({
          success: true,
          user: {
            id: user.id,
            email: user.email,
            full_name: user.full_name,
            role
          },
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } catch (dbError) {
      await client.end();
      throw dbError;
    }
  } catch (error) {
    console.error("Login error:", error);
    return new Response(
      JSON.stringify({ error: String(error) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

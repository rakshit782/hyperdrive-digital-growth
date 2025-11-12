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
    const { email, password, full_name } = await req.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email and password are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Validate password strength
    if (password.length < 6) {
      return new Response(
        JSON.stringify({ error: "Password must be at least 6 characters" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Creating new user:", email);

    const client = new Client(Deno.env.get("NEON_DATABASE_URL")!);
    await client.connect();

    try {
      // Check if user already exists
      const existingUser = await client.queryObject(
        "SELECT id FROM users WHERE email = $1",
        [email]
      );

      if (existingUser.rows.length > 0) {
        await client.end();
        return new Response(
          JSON.stringify({ error: "User with this email already exists" }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password);

      // Insert user
      const result = await client.queryObject(
        `INSERT INTO users (email, password_hash, full_name, created_at, updated_at)
         VALUES ($1, $2, $3, NOW(), NOW())
         RETURNING id, email, full_name, created_at`,
        [email, hashedPassword, full_name || null]
      );

      const user = result.rows[0] as any;

      // Create default user role
      await client.queryObject(
        "INSERT INTO user_roles (user_id, role, created_at, updated_at) VALUES ($1, $2, NOW(), NOW())",
        [user.id, 'user']
      );

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
            created_at: user.created_at
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
    console.error("Signup error:", error);
    return new Response(
      JSON.stringify({ error: String(error) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

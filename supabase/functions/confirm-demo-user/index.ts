
/* 
  Edge Function: confirm-demo-user
  Purpose: Mark specific demo user emails as confirmed (email_confirm = true).
  Security: Only allows the three demo emails.
*/

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const ALLOWED_EMAILS = new Set([
  "admin@demo.com",
  "editor@demo.com",
  "user@demo.com",
]);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email } = await req.json();
    if (!email || typeof email !== "string") {
      return new Response(JSON.stringify({ error: "Missing or invalid email" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    if (!ALLOWED_EMAILS.has(normalizedEmail)) {
      return new Response(JSON.stringify({ error: "Email not allowed" }), {
        status: 403,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

    // Find the user by email (list + filter)
    const { data: listData, error: listError } = await admin.auth.admin.listUsers({
      page: 1,
      perPage: 1000,
    });

    if (listError) {
      return new Response(JSON.stringify({ error: listError.message }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    const user = listData?.users?.find(
      (u: any) => (u.email ?? "").toLowerCase() === normalizedEmail
    );

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Mark as confirmed
    const { error: updateError } = await admin.auth.admin.updateUserById(user.id, {
      email_confirm: true,
    });

    if (updateError) {
      return new Response(JSON.stringify({ error: updateError.message }), {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  }
});

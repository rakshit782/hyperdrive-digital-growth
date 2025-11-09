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
    const { action, logData, limit } = await req.json();

    console.log("Security logs operation:", { action });

    const client = new Client(Deno.env.get("NEON_DATABASE_URL")!);
    await client.connect();

    try {
      let result;

      switch (action) {
        case "insert": {
          await client.queryObject(
            `INSERT INTO security_logs (
              form_type, ip_address, user_agent, recaptcha_score, 
              honeypot_triggered, csrf_valid, submission_data, created_at
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())`,
            [
              logData.form_type,
              logData.ip_address || null,
              logData.user_agent || null,
              logData.recaptcha_score || null,
              logData.honeypot_triggered || null,
              logData.csrf_valid || null,
              JSON.stringify(logData.submission_data || {})
            ]
          );
          result = { success: true };
          break;
        }

        case "list": {
          const logs = await client.queryObject(
            `SELECT id, form_type, ip_address, user_agent, recaptcha_score,
                    honeypot_triggered, csrf_valid, submission_data, created_at
             FROM security_logs 
             ORDER BY created_at DESC 
             LIMIT $1`,
            [limit || 100]
          );
          result = { success: true, logs: logs.rows };
          break;
        }

        default:
          throw new Error("Invalid action");
      }

      await client.end();

      return new Response(
        JSON.stringify(result),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } catch (dbError) {
      await client.end();
      throw dbError;
    }
  } catch (error) {
    console.error("Security logs operation error:", error);
    return new Response(
      JSON.stringify({ error: String(error) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

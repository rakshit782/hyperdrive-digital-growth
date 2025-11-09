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
    const { action, email, name, status, id } = await req.json();

    console.log("Newsletter operation:", { action, email });

    const client = new Client(Deno.env.get("NEON_DATABASE_URL")!);
    await client.connect();

    try {
      let result;

      switch (action) {
        case "subscribe": {
          // Check if email exists
          const existing = await client.queryObject(
            "SELECT id, status FROM newsletter_emails WHERE email = $1",
            [email]
          );

          if (existing.rows.length > 0) {
            const existingEmail = existing.rows[0] as any;
            if (existingEmail.status === 'unsubscribed') {
              // Reactivate
              await client.queryObject(
                "UPDATE newsletter_emails SET status = 'subscribed', updated_at = NOW() WHERE id = $1",
                [existingEmail.id]
              );
              result = { success: true, reactivated: true };
            } else {
              result = { success: false, error: "Email already subscribed" };
            }
          } else {
            // Insert new
            await client.queryObject(
              `INSERT INTO newsletter_emails (email, name, status, source, created_at, updated_at)
               VALUES ($1, $2, 'subscribed', 'website', NOW(), NOW())`,
              [email, name || null]
            );
            result = { success: true };
          }
          break;
        }

        case "list": {
          const emails = await client.queryObject(
            "SELECT id, email, name, status, source, tags, created_at, updated_at FROM newsletter_emails ORDER BY created_at DESC"
          );
          result = { success: true, emails: emails.rows };
          break;
        }

        case "update": {
          await client.queryObject(
            "UPDATE newsletter_emails SET status = $1, updated_at = NOW() WHERE id = $2",
            [status, id]
          );
          result = { success: true };
          break;
        }

        case "delete": {
          await client.queryObject(
            "DELETE FROM newsletter_emails WHERE id = $1",
            [id]
          );
          result = { success: true };
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
    console.error("Newsletter operation error:", error);
    return new Response(
      JSON.stringify({ error: String(error) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

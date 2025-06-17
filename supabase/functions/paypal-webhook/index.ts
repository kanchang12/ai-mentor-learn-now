
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[PAYPAL-WEBHOOK] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("PayPal webhook received");

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const webhookData = await req.json();
    logStep("Webhook data received", { eventType: webhookData.event_type });

    // Handle subscription creation/activation
    if (webhookData.event_type === "BILLING.SUBSCRIPTION.ACTIVATED" || 
        webhookData.event_type === "PAYMENT.SALE.COMPLETED") {
      
      const payerEmail = webhookData.resource?.payer?.email_address || 
                        webhookData.resource?.payer?.payer_info?.email;
      
      if (!payerEmail) {
        logStep("ERROR: No payer email found in webhook");
        return new Response(JSON.stringify({ error: "No payer email found" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        });
      }

      logStep("Processing subscription activation", { email: payerEmail });

      // Update user subscription type to 'paid'
      const { error: updateError } = await supabaseClient
        .from('profiles')
        .update({ 
          subscription_type: 'paid',
          updated_at: new Date().toISOString()
        })
        .eq('email', payerEmail);

      if (updateError) {
        logStep("ERROR updating subscription", { error: updateError.message });
        return new Response(JSON.stringify({ error: "Failed to update subscription" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        });
      }

      logStep("Successfully updated user to paid subscription", { email: payerEmail });
    }

    // Handle subscription cancellation/suspension
    if (webhookData.event_type === "BILLING.SUBSCRIPTION.CANCELLED" || 
        webhookData.event_type === "BILLING.SUBSCRIPTION.SUSPENDED") {
      
      const payerEmail = webhookData.resource?.payer?.email_address || 
                        webhookData.resource?.payer?.payer_info?.email;
      
      if (payerEmail) {
        logStep("Processing subscription cancellation", { email: payerEmail });

        const { error: updateError } = await supabaseClient
          .from('profiles')
          .update({ 
            subscription_type: 'unpaid',
            updated_at: new Date().toISOString()
          })
          .eq('email', payerEmail);

        if (updateError) {
          logStep("ERROR updating subscription to unpaid", { error: updateError.message });
        } else {
          logStep("Successfully updated user to unpaid subscription", { email: payerEmail });
        }
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in PayPal webhook", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.39.6";

// Initialize Supabase client with environment variables
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY") || "";

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Import Stripe (install via `npm:stripe`)
import Stripe from "npm:stripe@12.4.0";
const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2023-10-16",
});

serve(async (req) => {
  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Verify the Stripe signature
    const signature = req.headers.get("stripe-signature");
    if (!signature) {
      return new Response(
        JSON.stringify({ error: "Missing stripe-signature header" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Get the webhook secret from environment variables
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET") || "";
    if (!webhookSecret) {
      return new Response(
        JSON.stringify({ error: "Webhook secret not configured" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Parse the request body as text (required for Stripe webhook verification)
    const body = await req.text();
    let event;

    try {
      // Verify and construct the event
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      return new Response(
        JSON.stringify({ error: `Webhook signature verification failed: ${err.message}` }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Handle different event types
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        await handleCheckoutSessionCompleted(session);
        break;
      }
      
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object;
        await handleSubscriptionChange(subscription);
        break;
      }
      
      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        await handleSubscriptionCancelled(subscription);
        break;
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message || "An error occurred" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
});

// Handler for successful checkout sessions
async function handleCheckoutSessionCompleted(session: any) {
  // Get the customer and subscription details
  const customerId = session.customer;
  const subscriptionId = session.subscription;
  const userId = session.client_reference_id;

  // If there's no user ID, we can't update the profile
  if (!userId) {
    console.error("No user ID found in session metadata");
    return;
  }

  // Get subscription details from Stripe
  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  
  // Update the user's profile with their subscription information
  const { error } = await supabase
    .from("profiles")
    .update({
      subscription_tier: "premium",
      stripe_customer_id: customerId,
      stripe_subscription_id: subscriptionId,
    })
    .eq("id", userId);

  if (error) {
    console.error("Error updating user profile:", error);
  }
}

// Handler for subscription changes
async function handleSubscriptionChange(subscription: any) {
  // Get the customer ID
  const customerId = subscription.customer;
  
  // Find the user with this customer ID
  const { data: profiles, error: fetchError } = await supabase
    .from("profiles")
    .select("id")
    .eq("stripe_customer_id", customerId);

  if (fetchError || !profiles || profiles.length === 0) {
    console.error("Error finding user with customer ID:", customerId, fetchError);
    return;
  }

  const userId = profiles[0].id;
  
  // Check the subscription status
  const status = subscription.status;
  const isPremium = status === "active" || status === "trialing";
  
  // Update the user's subscription tier
  const { error: updateError } = await supabase
    .from("profiles")
    .update({
      subscription_tier: isPremium ? "premium" : "free",
      stories_remaining: isPremium ? -1 : 5, // -1 for unlimited
    })
    .eq("id", userId);

  if (updateError) {
    console.error("Error updating subscription status:", updateError);
  }
}

// Handler for cancelled subscriptions
async function handleSubscriptionCancelled(subscription: any) {
  // Get the customer ID
  const customerId = subscription.customer;
  
  // Find the user with this customer ID
  const { data: profiles, error: fetchError } = await supabase
    .from("profiles")
    .select("id")
    .eq("stripe_customer_id", customerId);

  if (fetchError || !profiles || profiles.length === 0) {
    console.error("Error finding user with customer ID:", customerId, fetchError);
    return;
  }

  const userId = profiles[0].id;
  
  // Reset the user to the free tier
  const { error: updateError } = await supabase
    .from("profiles")
    .update({
      subscription_tier: "free",
      stories_remaining: 5,
    })
    .eq("id", userId);

  if (updateError) {
    console.error("Error updating subscription status:", updateError);
  }
}
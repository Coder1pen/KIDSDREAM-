import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js@2.39.6";

// Initialize Supabase client with environment variables
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }
  
  try {
    // Check if this is a POST request
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
    
    // Parse the request body
    const { userId } = await req.json();
    
    if (!userId) {
      return new Response(JSON.stringify({ error: "Missing userId" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
    
    // Get current user profile
    const { data: profile, error: fetchError } = await supabase
      .from("profiles")
      .select("stories_remaining, subscription_tier")
      .eq("id", userId)
      .single();
    
    if (fetchError) {
      return new Response(
        JSON.stringify({ error: `Error fetching profile: ${fetchError.message}` }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }
    
    // Don't decrement for premium users
    if (profile.subscription_tier === 'premium') {
      return new Response(
        JSON.stringify({ 
          message: "Premium user - no decrement needed",
          storiesRemaining: -1 
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }
    
    // Calculate new stories remaining (don't go below 0)
    const newStoriesRemaining = Math.max(0, (profile.stories_remaining || 0) - 1);
    
    // Update the profile
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ 
        stories_remaining: newStoriesRemaining,
        stories_generated: supabase.sql`stories_generated + 1`
      })
      .eq("id", userId);
    
    if (updateError) {
      return new Response(
        JSON.stringify({ error: `Error updating profile: ${updateError.message}` }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }
    
    return new Response(
      JSON.stringify({ 
        message: "Stories remaining decremented successfully",
        storiesRemaining: newStoriesRemaining
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message || "An error occurred" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
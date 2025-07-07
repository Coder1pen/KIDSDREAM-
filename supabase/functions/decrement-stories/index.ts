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
    // Get the authorization header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Missing authorization header" }), {
        status: 401,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Extract the JWT token
    const token = authHeader.replace('Bearer ', '');
    
    // Verify the user with the token
    const { data: { user }, error: userError } = await supabase.auth.getUser(token);
    
    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Invalid or expired token" }), {
        status: 401,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Check if this is a POST request
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
    
    // Parse the request body
    const body = await req.json();
    const userId = body.userId || user.id; // Use authenticated user's ID if not provided
    
    if (!userId) {
      return new Response(JSON.stringify({ error: "Missing userId" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
    
    // Ensure the user can only modify their own profile
    if (userId !== user.id) {
      return new Response(JSON.stringify({ error: "Unauthorized: Cannot modify another user's profile" }), {
        status: 403,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }

    // Get current user profile - use maybeSingle() to handle cases where no profile exists
    const { data: profile, error: fetchError } = await supabase
      .from("profiles")
      .select("stories_remaining, subscription_tier")
      .eq("id", userId)
      .maybeSingle();
    
    if (fetchError) {
      return new Response(
        JSON.stringify({ error: `Error fetching profile: ${fetchError.message}` }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }
    
    // If no profile found, return error as we cannot proceed without a valid profile
    if (!profile) {
      // Create a new profile for the user if it doesn't exist
      const { data: newProfile, error: createError } = await supabase
        .from("profiles")
        .upsert({
          id: userId,
          email: user.email,
          subscription_tier: 'free',
          stories_generated: 0,
          stories_remaining: 5
        }, { onConflict: 'id' })
        .select()
        .maybeSingle();
      
      if (createError || !newProfile) {
        return new Response(
          JSON.stringify({ error: `Failed to create user profile: ${createError?.message || 'Unknown error'}` }),
          {
            status: 500,
            headers: { "Content-Type": "application/json", ...corsHeaders },
          }
        );
      }
      
      // Use the newly created profile
      profile = newProfile;
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
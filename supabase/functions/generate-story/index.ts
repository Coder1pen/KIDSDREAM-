import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// This is a simple placeholder for the story generation function
// In a production environment, this would connect to an AI service or a more sophisticated backend

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

interface StoryPrompt {
  main_character: string;
  age_group: string;
  setting: string;
  theme: string;
  additional_details?: string;
}

// Sample story templates based on themes
const storyTemplates = {
  adventure: "Once upon a time, {main_character} set off on an epic journey through {setting}. The adventure was filled with excitement, challenges, and discovery. Every step of the way, {main_character} learned valuable lessons about courage and perseverance.\n\nOne day, while exploring a hidden path, {main_character} stumbled upon a mysterious treasure. It wasn't gold or jewels, but something far more valuable - a magical friend who would join the adventure.\n\nTogether, they faced obstacles and solved puzzles, using their wits and teamwork. The {setting} was full of surprises around every corner, and {main_character} couldn't wait to see what they would discover next.\n\nAs the sun began to set, {main_character} realized that the greatest treasure of all was the journey itself and the memories created along the way. With a heart full of joy, {main_character} knew that this was just the beginning of many wonderful adventures to come.",
  
  friendship: "{main_character} lived in a beautiful {setting} where everything was perfect, except for one thing - {main_character} felt lonely and wished for a true friend.\n\nOne sunny morning, while playing near the edge of {setting}, {main_character} heard a soft sound. Following the sound, {main_character} discovered someone who seemed just as lonely.\n\nAt first, they were shy around each other, but soon they began talking and realized they had much in common. They laughed at the same jokes, enjoyed the same games, and both loved exploring {setting}.\n\nDay after day, their friendship grew stronger. They helped each other through difficult times and celebrated happy moments together. {main_character} learned that friendship isn't just about having fun together, but also about being there for each other when things get tough.\n\nBy the end of summer, {main_character} no longer felt lonely. The {setting} seemed even more beautiful now, because it was shared with a true friend. And {main_character} knew that no matter what adventures awaited, they would face them together.",
  
  magic: "In the heart of {setting}, where magic flows like a gentle breeze, lived {main_character} with a very special gift. Unlike others, {main_character} could see the tiny sparkles of magic that floated through the air, invisible to everyone else.\n\nOne evening, as the stars began to twinkle, the sparkles started acting strangely. They swirled and danced, leading {main_character} deeper into {setting} than ever before. There, beneath an ancient tree glowing with moonlight, stood a small door that had never been there before.\n\nBravely, {main_character} opened the door and stepped through into a world where flowers sang lullabies and friendly creatures greeted visitors with warm hugs. Everything was magical and wonderful, yet somehow familiar.\n\nAn elderly wizard approached {main_character} and explained that the magical world needed help. Its source of magic was fading, and only someone who could see the sparkles could restore it.\n\nWith courage in heart, {main_character} followed the wizard's instructions, gathering magical ingredients and reciting ancient spells. As the final spell was cast, the {setting} lit up with colors more vibrant than a rainbow, and magic once again flowed freely.\n\nThe grateful wizard granted {main_character} the ability to visit anytime, explaining that the door would always appear when needed. With a heart full of wonder, {main_character} returned home, knowing that magical adventures would always be just a sparkle away.",
  
  learning: "{main_character} was always curious about everything in {setting}. Every day brought new questions: Why is the sky blue? How do birds fly? What makes flowers grow?\n\nOne day, {main_character}'s questions led to an amazing discovery. While exploring {setting}, {main_character} found an old, wise owl who had answers to all these questions and more.\n\n\"To learn,\" said the owl, \"you must not only ask questions but also observe carefully and try things yourself.\"\n\nTaking this advice to heart, {main_character} began a journey of learning. With the owl's guidance, {main_character} conducted simple experiments, observed nature closely, and read books about {setting} and beyond.\n\nSoon, {main_character} was not only finding answers but also sharing knowledge with friends. Everyone was amazed at how much {main_character} had learned and how exciting learning could be.\n\nThe most important lesson {main_character} learned was that education is an adventure that never ends. Each answer leads to new questions, and there is always something wonderful waiting to be discovered.\n\nAs the sun set over {setting}, {main_character} thanked the wise owl and promised to keep learning something new every day. With a mind full of knowledge and a heart eager for more, {main_character} knew that the greatest adventure of all was the journey of learning.",
  
  animals: "In the bustling {setting}, {main_character} had a special talent that nobody else had - the ability to understand what animals were saying. This magical gift was a secret that {main_character} treasured deeply.\n\nOne morning, {main_character} overheard a group of worried animals discussing a problem. The oldest tree in {setting}, home to countless creatures, was in danger of being cut down to make way for a new building.\n\nDetermined to help, {main_character} gathered all the animals for a meeting. \"If we work together,\" {main_character} said, \"we can save your home!\"\n\nEach animal contributed in their own way: the birds spread news across {setting}, the squirrels collected evidence of all the wildlife living in the tree, and the wise old owl helped {main_character} prepare a presentation about the importance of preserving natural habitats.\n\nWhen the day came to present their case to the town council, {main_character} spoke with such passion about the animals' plight that everyone listened intently. The animals, though unable to speak human language, showed their presence by gathering around the meeting hall.\n\nTouched by {main_character}'s words and the animals' silent plea, the council decided to protect the tree and create a wildlife sanctuary around it.\n\nFrom that day on, {main_character} became known as the protector of animals in {setting}, and though nobody knew about the secret ability to talk with animals, everyone recognized the special bond between {main_character} and every creature great and small.",
  
  family: "In a cozy corner of {setting} lived {main_character} with a loving family. Each family member was different: some were tall, some were short, some were loud, and some were quiet, but together they created a harmony as beautiful as a symphony.\n\nOne day, {main_character}'s family decided to organize a special family day. Everyone would contribute something unique to make it perfect. {main_character} was excited but also nervous - what special talent could {main_character} share?\n\nWhile pondering this question, {main_character} walked through {setting}, observing other families. Some sang together, others cooked together, and some built amazing things. Inspiration struck when {main_character} realized that the most precious gift was not a talent, but the stories that connected the family across generations.\n\n{main_character} began collecting family stories: how Grandpa and Grandma met, Dad's childhood adventures, Mom's favorite memories, and even funny tales about when {main_character} was a baby. Each story was like a thread, weaving the family closer together.\n\nOn family day, while others shared songs and delicious food, {main_character} created a beautiful family story book filled with these precious memories. As {main_character} read the stories aloud, laughter and happy tears filled the room. Everyone contributed additional details, making the stories even richer.\n\nThat night, as stars twinkled over {setting}, {main_character} realized that family wasn't just about being related; it was about sharing love, memories, and stories that would live on for generations. And as the keeper of these stories, {main_character} had found a very special role in the family.",
  
  bedtime: "As the sun set over {setting}, painting the sky with shades of orange and purple, {main_character} prepared for bedtime. The day had been full of play and adventure, and now it was time to rest.\n\nAfter a warm bath that smelled of lavender, {main_character} snuggled under a soft blanket. The room was peaceful, with a gentle night light casting a warm glow and chasing away any shadows that might seem scary.\n\nOutside the window, stars began to appear one by one, like tiny diamonds in the night sky. {main_character} imagined that each star was a friendly guardian, watching over sleeping children throughout the night.\n\nA gentle breeze whispered through {setting}, carrying the sweet scent of flowers and the soft melody of a distant lullaby. Even the moon seemed to smile down at {main_character}'s window, its silver light creating magical patterns on the bedroom floor.\n\nAs {main_character}'s eyes grew heavy, dreams began to form - dreams of flying among those twinkling stars, visiting far-off places, and having wonderful adventures. In these dreams, {main_character} could do anything and go anywhere, all while safely tucked in bed.\n\nWith each slow, deep breath, {main_character} drifted deeper into the land of dreams, where adventures awaited until morning light would once again awaken {setting} to a brand new day full of possibilities.\n\nAnd as {main_character} finally fell asleep with a peaceful smile, the night wrapped around {setting} like a protective blanket, keeping everyone safe until dawn."
};

// Function to customize a story template with the provided prompt
function generateCustomStory(prompt: StoryPrompt): string {
  const template = storyTemplates[prompt.theme as keyof typeof storyTemplates] || storyTemplates.adventure;
  
  let story = template.replaceAll("{main_character}", prompt.main_character)
                      .replaceAll("{setting}", prompt.setting);
  
  // Add age-appropriate customizations
  if (prompt.age_group === "3-5") {
    story = story.replaceAll(".", ".\n\n");  // More paragraph breaks for younger readers
    story = story.split(" ").map(word => word.length > 10 ? "very big" : word).join(" ");  // Simplify long words
  }
  
  // Add custom details if provided
  if (prompt.additional_details && prompt.additional_details.trim().length > 0) {
    const additionalDetail = `\n\nWhat made this adventure even more special was that ${prompt.additional_details}.`;
    story += additionalDetail;
  }
  
  return story;
}

// Generate a title based on the prompt
function generateTitle(prompt: StoryPrompt): string {
  const titles = [
    `${prompt.main_character}'s ${prompt.theme.charAt(0).toUpperCase() + prompt.theme.slice(1)} Adventure`,
    `The Magical ${prompt.setting}`,
    `${prompt.main_character} and the ${prompt.theme.charAt(0).toUpperCase() + prompt.theme.slice(1)} Quest`,
    `Journey to the ${prompt.setting}`,
    `The ${prompt.theme.charAt(0).toUpperCase() + prompt.theme.slice(1)} of ${prompt.main_character}`,
  ];
  
  return titles[Math.floor(Math.random() * titles.length)];
}

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
    const prompt: StoryPrompt = await req.json();
    
    // Validate the required fields
    if (!prompt.main_character || !prompt.age_group || !prompt.setting || !prompt.theme) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
    
    // Generate the story content
    const content = generateCustomStory(prompt);
    const title = generateTitle(prompt);
    
    // Return the generated story
    return new Response(
      JSON.stringify({
        title,
        content,
        created_at: new Date().toISOString(),
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error) {
    // Handle any errors
    return new Response(
      JSON.stringify({ error: error.message || "An error occurred" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
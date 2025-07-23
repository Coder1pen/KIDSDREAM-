import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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

// Advanced story structure templates with multiple narrative patterns
const narrativeStructures = {
  heroJourney: {
    acts: ["call_to_adventure", "crossing_threshold", "trials", "revelation", "transformation", "return"],
    complexity: "high"
  },
  mysteryQuest: {
    acts: ["discovery", "investigation", "clues", "red_herrings", "revelation", "resolution"],
    complexity: "high"
  },
  friendshipArc: {
    acts: ["meeting", "bonding", "conflict", "understanding", "reconciliation", "stronger_bond"],
    complexity: "medium"
  },
  learningJourney: {
    acts: ["curiosity", "exploration", "challenge", "failure", "insight", "mastery"],
    complexity: "medium"
  },
  magicalAdventure: {
    acts: ["ordinary_world", "magical_discovery", "mentor_guidance", "magical_trials", "inner_power", "new_equilibrium"],
    complexity: "high"
  }
};

// Dynamic story elements that change with each generation
const storyVariations = {
  companions: {
    animal: ["wise owl", "playful dolphin", "brave lion", "clever fox", "gentle elephant", "magical unicorn", "talking cat", "flying dragon", "singing bird", "dancing bear"],
    magical: ["fairy godmother", "ancient wizard", "crystal spirit", "star guardian", "moon sprite", "wind dancer", "light weaver", "dream keeper", "time traveler", "shape shifter"],
    human: ["kind mentor", "fellow adventurer", "wise elder", "curious child", "skilled artisan", "brave knight", "gentle healer", "clever inventor", "talented musician", "gifted storyteller"]
  },
  obstacles: {
    physical: ["treacherous mountain", "raging river", "dense forest", "hidden cave", "floating islands", "crystal maze", "shifting sands", "frozen lake", "thorny garden", "misty valley"],
    emotional: ["fear of failure", "doubt about abilities", "loneliness", "anger", "sadness", "confusion", "jealousy", "impatience", "worry", "disappointment"],
    magical: ["enchanted barrier", "riddle of the sphinx", "mirror of truth", "test of courage", "trial of wisdom", "challenge of kindness", "puzzle of time", "maze of memories", "bridge of trust", "gate of understanding"]
  },
  discoveries: {
    internal: ["hidden strength", "true friendship", "inner wisdom", "creative power", "compassionate heart", "brave spirit", "curious mind", "patient soul", "generous nature", "resilient character"],
    external: ["magical artifact", "secret passage", "ancient knowledge", "hidden treasure", "mystical power", "sacred place", "forgotten history", "special gift", "magical ability", "divine blessing"],
    relational: ["true friendship", "family bond", "mentor relationship", "community connection", "animal partnership", "spiritual guidance", "ancestral wisdom", "peer support", "intergenerational understanding", "cross-cultural friendship"]
  },
  plotTwists: {
    revelation: ["the villain was actually trying to help", "the treasure was inside them all along", "they had the power from the beginning", "the journey was the real destination", "the friend was the true hero", "the obstacle was an illusion"],
    transformation: ["the enemy becomes an ally", "weakness becomes strength", "fear becomes courage", "loneliness becomes connection", "confusion becomes clarity", "doubt becomes confidence"],
    discovery: ["a hidden family connection", "a secret magical heritage", "an unexpected talent", "a forgotten memory", "a parallel world", "a time loop", "a prophetic dream", "a magical bloodline"]
  }
};

// Advanced character development arcs
const characterArcs = {
  growth: ["timid to brave", "selfish to generous", "angry to peaceful", "lonely to connected", "confused to wise", "weak to strong", "fearful to confident", "impatient to patient"],
  discovery: ["hidden talent", "magical heritage", "true calling", "inner strength", "special purpose", "unique gift", "ancient connection", "destined role"],
  transformation: ["ordinary to extraordinary", "student to teacher", "follower to leader", "dreamer to achiever", "outsider to belonging", "broken to healed", "lost to found", "small to mighty"]
};

// Complex world-building elements
const worldElements = {
  atmospheres: ["mystical and ethereal", "warm and inviting", "mysterious and intriguing", "vibrant and alive", "peaceful and serene", "exciting and dynamic", "ancient and wise", "magical and wonder-filled"],
  timeOfDay: ["dawn's first light", "golden afternoon", "twilight magic", "starlit night", "misty morning", "sunset glow", "midnight hour", "rainbow after storm"],
  weather: ["gentle breeze", "sparkling snow", "warm sunshine", "soft rain", "dancing clouds", "shimmering mist", "golden light", "silver moonbeams"],
  sounds: ["melodic bird songs", "whispering wind", "babbling brook", "rustling leaves", "distant music", "gentle laughter", "magical chimes", "nature's symphony"],
  scents: ["blooming flowers", "fresh rain", "warm bread", "pine forest", "ocean breeze", "magical herbs", "sweet honey", "morning dew"]
};

// Age-appropriate complexity levels
const complexityLevels = {
  "3-5": {
    sentenceLength: "short",
    vocabulary: "simple",
    concepts: "concrete",
    plotPoints: 3,
    characterDepth: "basic"
  },
  "6-8": {
    sentenceLength: "medium",
    vocabulary: "intermediate",
    concepts: "mixed",
    plotPoints: 4,
    characterDepth: "moderate"
  },
  "9-12": {
    sentenceLength: "varied",
    vocabulary: "advanced",
    concepts: "abstract",
    plotPoints: 5,
    characterDepth: "complex"
  }
};

// Random selection helper
function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomElements<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Generate unique story seed for variation
function generateStorySeed(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2);
  return `${timestamp}_${random}`;
}

// Advanced story generation with multiple layers of randomization
function generateAdvancedStory(prompt: StoryPrompt, isPremium: boolean = false): { title: string, content: string } {
  const seed = generateStorySeed();
  const complexity = complexityLevels[prompt.age_group as keyof typeof complexityLevels];
  
  // Select random narrative structure
  const structures = Object.keys(narrativeStructures);
  const selectedStructure = getRandomElement(structures);
  const structure = narrativeStructures[selectedStructure as keyof typeof narrativeStructures];
  
  // Generate random story elements
  const companion = getRandomElement([
    ...storyVariations.companions.animal,
    ...storyVariations.companions.magical,
    ...storyVariations.companions.human
  ]);
  
  const obstacles = getRandomElements(
    [...storyVariations.obstacles.physical, ...storyVariations.obstacles.emotional, ...storyVariations.obstacles.magical],
    isPremium ? 3 : 2
  );
  
  const discoveries = getRandomElements(
    [...storyVariations.discoveries.internal, ...storyVariations.discoveries.external, ...storyVariations.discoveries.relational],
    isPremium ? 2 : 1
  );
  
  const plotTwist = isPremium ? getRandomElement([
    ...storyVariations.plotTwists.revelation,
    ...storyVariations.plotTwists.transformation,
    ...storyVariations.plotTwists.discovery
  ]) : null;
  
  const characterArc = getRandomElement([
    ...characterArcs.growth,
    ...characterArcs.discovery,
    ...characterArcs.transformation
  ]);
  
  // World-building elements
  const atmosphere = getRandomElement(worldElements.atmospheres);
  const timeOfDay = getRandomElement(worldElements.timeOfDay);
  const weather = getRandomElement(worldElements.weather);
  const sounds = getRandomElement(worldElements.sounds);
  const scents = getRandomElement(worldElements.scents);
  
  // Generate title with variation
  const titleVariations = [
    `${prompt.main_character} and the ${prompt.theme.charAt(0).toUpperCase() + prompt.theme.slice(1)} of ${prompt.setting}`,
    `The ${prompt.theme.charAt(0).toUpperCase() + prompt.theme.slice(1)} Chronicles: ${prompt.main_character}'s Journey`,
    `Beyond ${prompt.setting}: ${prompt.main_character}'s ${prompt.theme.charAt(0).toUpperCase() + prompt.theme.slice(1)} Adventure`,
    `${prompt.main_character}: Guardian of the ${prompt.theme.charAt(0).toUpperCase() + prompt.theme.slice(1)}`,
    `The Magical Tales of ${prompt.main_character} in ${prompt.setting}`,
    `${prompt.main_character} and the Secret of ${prompt.setting}`,
    `The ${prompt.theme.charAt(0).toUpperCase() + prompt.theme.slice(1)} Quest: ${prompt.main_character}'s Destiny`
  ];
  
  if (isPremium) {
    titleVariations.push(
      `The Epic Chronicles of ${prompt.main_character}: Master of ${prompt.theme.charAt(0).toUpperCase() + prompt.theme.slice(1)}`,
      `${prompt.main_character} and the Ancient Mysteries of ${prompt.setting}`,
      `The Legendary Saga: ${prompt.main_character}'s ${prompt.theme.charAt(0).toUpperCase() + prompt.theme.slice(1)} Awakening`
    );
  }
  
  const title = getRandomElement(titleVariations);
  
  // Generate story content based on structure and complexity
  let story = "";
  
  if (isPremium) {
    story = generatePremiumStory(prompt, companion, obstacles, discoveries, plotTwist, characterArc, atmosphere, timeOfDay, weather, sounds, scents, complexity);
  } else {
    story = generateFreeStory(prompt, companion, obstacles, discoveries, characterArc, atmosphere, timeOfDay, weather, complexity);
  }
  
  // Add unique details based on additional_details
  if (prompt.additional_details && prompt.additional_details.trim().length > 0) {
    const details = prompt.additional_details.trim();
    const detailIntegrations = [
      `What made this adventure truly special was that ${details}, adding an unexpected layer of magic to every moment.`,
      `Throughout the journey, ${details} played a crucial role, bringing joy and wonder to ${prompt.main_character}'s experience.`,
      `The presence of ${details} transformed ordinary moments into extraordinary memories that ${prompt.main_character} would treasure forever.`,
      `As the adventure unfolded, ${details} became an integral part of the story, weaving itself into the very fabric of ${prompt.main_character}'s journey.`
    ];
    
    const selectedIntegration = getRandomElement(detailIntegrations);
    
    // Insert detail at random appropriate point in the story
    const sentences = story.split('. ');
    const insertPoint = Math.floor(sentences.length * (0.3 + Math.random() * 0.4)); // Insert between 30-70% through
    sentences.splice(insertPoint, 0, selectedIntegration);
    story = sentences.join('. ');
  }
  
  return { title, content: story };
}

function generatePremiumStory(
  prompt: StoryPrompt, 
  companion: string, 
  obstacles: string[], 
  discoveries: string[], 
  plotTwist: string | null, 
  characterArc: string, 
  atmosphere: string, 
  timeOfDay: string, 
  weather: string, 
  sounds: string, 
  scents: string,
  complexity: any
): string {
  const openings = [
    `In the ${atmosphere} realm of ${prompt.setting}, where ${weather} danced through the air and ${sounds} created a symphony of wonder, ${prompt.main_character} was about to embark on a journey that would forever change their understanding of ${prompt.theme}.`,
    
    `As ${timeOfDay} painted the sky above ${prompt.setting} in magnificent hues, ${prompt.main_character} felt the stirring of destiny within their heart. The air was filled with ${scents}, and the gentle ${sounds} seemed to whisper secrets of an adventure that awaited.`,
    
    `Deep within the ${atmosphere} landscape of ${prompt.setting}, where ancient magic flowed like rivers of starlight and ${weather} carried the essence of countless stories, ${prompt.main_character} discovered they possessed a gift that would unlock the mysteries of ${prompt.theme}.`
  ];
  
  const developments = [
    `The journey began when ${prompt.main_character} encountered ${companion}, a wise and mysterious guide who had been waiting for someone with the pure heart needed to understand the true meaning of ${prompt.theme}. Together, they ventured deeper into ${prompt.setting}, where every step revealed new wonders and challenges.`,
    
    `As they traveled through the ever-changing landscape of ${prompt.setting}, ${prompt.main_character} and their newfound companion ${companion} faced the first of many trials. The ${obstacles[0]} tested not just their physical abilities, but their emotional resilience and spiritual growth.`,
    
    `The path through ${prompt.setting} was neither straight nor simple. ${prompt.main_character} soon learned that true ${prompt.theme} required facing the ${obstacles[1]}, a challenge that would demand everything they thought they knew about themselves and the world around them.`
  ];
  
  const climaxes = [
    `In the heart of ${prompt.setting}, where the very essence of ${prompt.theme} pulsed with ancient power, ${prompt.main_character} faced their greatest challenge yet. The ${obstacles[2] || obstacles[0]} seemed insurmountable, but then came the moment of profound realization - ${discoveries[0]} had been within them all along.`,
    
    `The turning point arrived when ${prompt.main_character} discovered that ${plotTwist || discoveries[1] || discoveries[0]}. This revelation transformed everything they thought they knew about their quest, revealing that the true treasure of ${prompt.theme} was not what they had expected, but something far more precious and personal.`
  ];
  
  const resolutions = [
    `As the adventure reached its conclusion, ${prompt.main_character} had undergone a remarkable transformation - from ${characterArc}. They returned to their daily life in ${prompt.setting} carrying with them not just memories of incredible sights and experiences, but a deep understanding of ${prompt.theme} that would guide them through all future challenges.`,
    
    `The story of ${prompt.main_character}'s journey became legend in ${prompt.setting}, inspiring others to seek their own understanding of ${prompt.theme}. But for ${prompt.main_character}, the greatest reward was the knowledge that they had grown into someone capable of ${discoveries[0]} and ${discoveries[1] || "spreading joy to others"}.`,
    
    `Years later, when ${prompt.main_character} looked back on their adventure in ${prompt.setting}, they realized that every challenge, every moment of doubt, and every discovery had been necessary steps in their journey toward understanding the true essence of ${prompt.theme}. The ${companion} had become a lifelong friend, and the lessons learned continued to illuminate their path forward.`
  ];
  
  return `${getRandomElement(openings)}\n\n${getRandomElement(developments)}\n\n${getRandomElement(climaxes)}\n\n${getRandomElement(resolutions)}`;
}

function generateFreeStory(
  prompt: StoryPrompt, 
  companion: string, 
  obstacles: string[], 
  discoveries: string[], 
  characterArc: string, 
  atmosphere: string, 
  timeOfDay: string, 
  weather: string,
  complexity: any
): string {
  const openings = [
    `In the wonderful world of ${prompt.setting}, ${prompt.main_character} was about to discover something amazing about ${prompt.theme}.`,
    
    `One beautiful day in ${prompt.setting}, when ${weather} made everything feel magical, ${prompt.main_character} met ${companion} who would become their guide on an incredible adventure.`,
    
    `${prompt.main_character} had always been curious about ${prompt.theme}, but they never imagined that ${prompt.setting} would be the place where they would learn its most important secrets.`
  ];
  
  const developments = [
    `Together with ${companion}, ${prompt.main_character} explored the wonders of ${prompt.setting}. They faced the challenge of ${obstacles[0]}, which taught them valuable lessons about courage and determination.`,
    
    `The adventure led them through different parts of ${prompt.setting}, where they encountered ${obstacles[1] || obstacles[0]}. With the help of ${companion}, ${prompt.main_character} learned that every challenge is an opportunity to grow stronger and wiser.`
  ];
  
  const resolutions = [
    `By the end of their journey, ${prompt.main_character} had discovered ${discoveries[0]} and learned the true meaning of ${prompt.theme}. They returned home with a heart full of joy and wisdom that would help them in all their future adventures.`,
    
    `The adventure in ${prompt.setting} taught ${prompt.main_character} that ${prompt.theme} is one of life's greatest treasures. With their new friend ${companion} and the lessons they had learned, they were ready for whatever wonderful adventures awaited them next.`
  ];
  
  return `${getRandomElement(openings)}\n\n${getRandomElement(developments)}\n\n${getRandomElement(resolutions)}`;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }
  
  try {
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Method not allowed" }), {
        status: 405,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
    
    const { prompt, isPremium = false } = await req.json();
    
    if (!prompt || !prompt.main_character || !prompt.age_group || !prompt.setting || !prompt.theme) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      });
    }
    
    // Generate the advanced story content with randomization
    const { title, content } = generateAdvancedStory(prompt, isPremium);
    
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
    return new Response(
      JSON.stringify({ error: error.message || "An error occurred" }),
      {
      status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
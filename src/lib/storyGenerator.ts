import { StoryPrompt } from '../types';
import { supabase } from './supabase';

// Generate unique story seed for variation
function generateStorySeed(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2);
  return `${timestamp}_${random}`;
}

// Random selection helper
function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export async function generateStory(prompt: StoryPrompt, isPremium: boolean = false): Promise<string> {
  try {
    // Add unique seed to ensure different stories each time
    const storySeed = generateStorySeed();
    
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-story`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ prompt, isPremium, seed: storySeed }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate story');
    }

    const data = await response.json();
    return data.content;
  } catch (error) {
    console.error('Error generating story:', error);
    
    // Enhanced fallback with randomization
    const fallbackVariations = generateRandomizedFallback(prompt, isPremium);
    
    return fallbackVariations;
  }
}

function generateRandomizedFallback(prompt: StoryPrompt, isPremium: boolean): string {
  const companions = ["wise owl", "playful dolphin", "magical fairy", "talking cat", "friendly dragon", "clever fox"];
  const obstacles = ["mysterious challenge", "hidden puzzle", "magical barrier", "ancient riddle", "enchanted maze", "secret test"];
  const discoveries = ["inner strength", "true friendship", "hidden wisdom", "magical power", "special gift", "important lesson"];
  const settings_descriptors = ["mystical", "enchanted", "magical", "wondrous", "extraordinary", "magnificent"];
  
  const companion = getRandomElement(companions);
  const obstacle = getRandomElement(obstacles);
  const discovery = getRandomElement(discoveries);
  const descriptor = getRandomElement(settings_descriptors);
  
  const storyVariations = [
    `In the ${descriptor} realm of ${prompt.setting}, ${prompt.main_character} embarked on an incredible journey of ${prompt.theme}. Along the way, they met ${companion}, who became their trusted guide through the adventures ahead.

The path was not always easy. ${prompt.main_character} faced ${obstacle}, which tested their courage and determination. But with each challenge, they grew stronger and wiser, learning valuable lessons about perseverance and believing in themselves.

Through their adventures, ${prompt.main_character} discovered ${discovery}, realizing that the greatest treasures are often found within ourselves. The journey through ${prompt.setting} became more than just an adventure - it became a story of growth, courage, and the magic that happens when we dare to dream.

As the adventure came to an end, ${prompt.main_character} returned home with a heart full of wonderful memories and the knowledge that they were capable of amazing things. The lessons learned in ${prompt.setting} would guide them through many more adventures to come.`,

    `Once upon a time in the beautiful world of ${prompt.setting}, ${prompt.main_character} discovered that ${prompt.theme} was more magical than they had ever imagined. Their adventure began when they encountered ${companion}, who shared ancient wisdom about the wonders that awaited.

Together, they explored the hidden corners of ${prompt.setting}, where every step revealed new mysteries and delights. When they faced ${obstacle}, ${prompt.main_character} learned that true strength comes not from being fearless, but from being brave even when afraid.

The most amazing moment came when ${prompt.main_character} realized they possessed ${discovery} - something that had been with them all along, waiting to be recognized. This revelation transformed not just their understanding of ${prompt.theme}, but their understanding of themselves.

The adventure in ${prompt.setting} became a cherished memory, but more importantly, it became the foundation for a lifetime of confidence, kindness, and wonder. ${prompt.main_character} learned that every ending is really just a new beginning in disguise.`,

    `In the heart of ${prompt.setting}, where ${descriptor} wonders awaited around every corner, ${prompt.main_character} was about to learn the true meaning of ${prompt.theme}. The journey began with a chance meeting with ${companion}, whose gentle wisdom would prove invaluable.

As they ventured deeper into ${prompt.setting}, ${prompt.main_character} encountered ${obstacle}, a challenge that seemed impossible at first. But with patience, creativity, and the support of their new friend, they found a way forward that surprised even themselves.

The greatest treasure they found was not gold or jewels, but ${discovery} - a gift that would enrich their life forever. Through their experiences in ${prompt.setting}, ${prompt.main_character} learned that ${prompt.theme} is not just something we find, but something we create through our choices and actions.

Years later, whenever ${prompt.main_character} faced difficulties, they would remember their adventure in ${prompt.setting} and the lessons learned from ${companion}. The story became a source of strength and inspiration, reminding them that they were capable of overcoming any challenge with courage and kindness.`
  ];
  
  return getRandomElement(storyVariations);
}

export function generateStoryTitle(prompt: StoryPrompt, isPremium: boolean = false): string {
  // Add randomization to title generation
  const titlePrefixes = ["The Amazing", "The Incredible", "The Magical", "The Wonderful", "The Extraordinary", "The Legendary"];
  const titleSuffixes = ["Adventure", "Journey", "Quest", "Tale", "Story", "Chronicles", "Saga", "Legend"];
  
  const basicTitles = [
    `${prompt.main_character}'s ${prompt.theme.charAt(0).toUpperCase() + prompt.theme.slice(1)} Adventure`,
    `The Magical ${prompt.setting}`,
    `${prompt.main_character} and the ${prompt.theme.charAt(0).toUpperCase() + prompt.theme.slice(1)} Quest`,
    `Journey to the ${prompt.setting}`,
    `The ${prompt.theme.charAt(0).toUpperCase() + prompt.theme.slice(1)} of ${prompt.main_character}`,
    `${getRandomElement(titlePrefixes)} ${prompt.theme.charAt(0).toUpperCase() + prompt.theme.slice(1)} ${getRandomElement(titleSuffixes)}`,
    `${prompt.main_character} and the Secrets of ${prompt.setting}`,
    `The ${getRandomElement(titleSuffixes)} of ${prompt.main_character} in ${prompt.setting}`
  ];
  
  const premiumTitles = [
    `${prompt.main_character} and the Chronicles of ${prompt.setting}`,
    `The Legendary Tales of ${prompt.main_character}: A ${prompt.theme.charAt(0).toUpperCase() + prompt.theme.slice(1)} Saga`,
    `Beyond the Realm of ${prompt.setting}: ${prompt.main_character}'s Epic Journey`,
    `The Mystical Adventures of ${prompt.main_character} in the ${prompt.setting}`,
    `${prompt.main_character}: Guardian of ${prompt.setting} and Master of ${prompt.theme.charAt(0).toUpperCase() + prompt.theme.slice(1)}`,
    `${getRandomElement(titlePrefixes)} Chronicles: ${prompt.main_character}'s ${prompt.theme.charAt(0).toUpperCase() + prompt.theme.slice(1)} Awakening`,
    `The Epic ${getRandomElement(titleSuffixes)} of ${prompt.main_character} and the Ancient ${prompt.theme.charAt(0).toUpperCase() + prompt.theme.slice(1)}`,
    `${prompt.main_character}: The ${prompt.theme.charAt(0).toUpperCase() + prompt.theme.slice(1)} Keeper of ${prompt.setting}`
  ];
  
  const titles = isPremium ? premiumTitles : basicTitles;
  return titles[Math.floor(Math.random() * titles.length)];
}
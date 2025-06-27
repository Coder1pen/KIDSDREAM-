import { StoryPrompt } from '../types';
import { supabase } from './supabase';

export async function generateStory(prompt: StoryPrompt, isPremium: boolean = false): Promise<string> {
  try {
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-story`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ prompt, isPremium }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate story');
    }

    const data = await response.json();
    return data.content;
  } catch (error) {
    console.error('Error generating story:', error);
    
    // Enhanced fallback for demo purposes
    const fallbackStories = {
      adventure: `Once upon a time in the magnificent ${prompt.setting}, ${prompt.main_character} discovered they possessed an extraordinary gift that would change their life forever. This wasn't just any ordinary day - it was the beginning of an epic adventure that would test their courage, wisdom, and heart.

The journey began when ${prompt.main_character} found a mysterious artifact that glowed with ancient magic. As they touched it, visions of distant lands and incredible challenges filled their mind. They knew that their destiny was calling, and despite the fears that whispered in their heart, they chose to answer that call.

Through enchanted forests and across crystal rivers, ${prompt.main_character} traveled, meeting wise mentors and loyal companions along the way. Each challenge they faced taught them something new about themselves - that they were braver than they knew, kinder than they imagined, and stronger than they ever believed possible.

The greatest test came when ${prompt.main_character} had to choose between personal glory and helping others. Without hesitation, they chose compassion over conquest, and in that moment, they discovered that true heroism isn't about being the strongest or the smartest - it's about having the courage to do what's right, even when it's difficult.

As the adventure concluded and ${prompt.main_character} returned home to ${prompt.setting}, they carried with them not just memories of incredible sights and sounds, but the knowledge that they had grown into someone truly special. The real treasure wasn't gold or jewels, but the wisdom, friendships, and confidence they had gained along the way.

And though this adventure had ended, ${prompt.main_character} knew it was just the beginning of a lifetime filled with wonder, discovery, and the magic that comes from believing in yourself and caring for others.`,
      
      friendship: `In the heart of ${prompt.setting}, ${prompt.main_character} was about to learn one of life's most precious lessons - that true friendship is one of the greatest treasures in the world.

It all began on a day when ${prompt.main_character} felt particularly lonely. Despite being surrounded by the beauty of ${prompt.setting}, something was missing. That's when they encountered someone who seemed just as lonely and uncertain as they felt.

At first, both were shy and hesitant. Making new friends can feel scary, especially when you've been hurt before or when you're not sure if the other person will like you. But ${prompt.main_character} remembered something their grandmother had once said: "The best way to make a friend is to be a friend."

So ${prompt.main_character} took the first brave step. They offered a smile, shared a snack, and asked a simple question: "Would you like to explore ${prompt.setting} together?" That small act of kindness opened the door to something beautiful.

As days turned into weeks, their friendship blossomed like flowers in spring. They discovered they both loved the same games, shared similar dreams, and could make each other laugh even on the most difficult days. More importantly, they learned to be there for each other through both happy times and sad ones.

When one felt discouraged, the other offered encouragement. When one made a mistake, the other offered forgiveness. When one achieved something wonderful, the other celebrated with genuine joy. They learned that friendship isn't about being perfect - it's about accepting each other's imperfections and growing together.

The most magical moment came when they realized that their friendship had not only changed them but had also made ${prompt.setting} a brighter, more welcoming place for everyone. Other lonely hearts began to find each other, inspired by the example of kindness and acceptance they had witnessed.

${prompt.main_character} learned that friendship is like a garden - it needs care, attention, and patience to grow, but when it flourishes, it brings beauty and joy that lasts a lifetime.`,
      
      magic: `In the mystical realm of ${prompt.setting}, where magic flows like rivers of starlight through the air, ${prompt.main_character} was about to discover that the greatest magic of all lives within the human heart.

The adventure began when ${prompt.main_character} noticed something others couldn't see - tiny sparkles of magic that danced through the air like invisible fireflies. These magical particles seemed to respond to emotions, growing brighter with kindness and dimming with selfishness.

One evening, as the moon cast silver shadows across ${prompt.setting}, the magical sparkles began behaving strangely. They swirled and spun, forming patterns that seemed to be trying to communicate something urgent. Following their ethereal dance, ${prompt.main_character} was led to a hidden doorway that appeared only in moonlight.

Beyond the door lay a world where the impossible became possible - flowers sang lullabies in harmony, trees shared ancient wisdom through rustling leaves, and gentle creatures with eyes like stars welcomed visitors with warm embraces. But this magical realm was in danger, its light slowly fading as the magic that sustained it grew weak.

The Guardian of Magic, an ancient being whose form shifted like aurora in the night sky, explained that magic wasn't just about spells and enchantments - it was about wonder, imagination, and the belief that beautiful things are possible. In the ordinary world, people had begun to lose their sense of wonder, and without that belief, magic itself was dying.

${prompt.main_character} realized that they had been chosen not because they were the most powerful, but because they still believed in magic with the pure heart of someone who sees wonder in everyday miracles - in sunsets and rainbows, in acts of kindness and moments of joy.

The quest to restore magic required ${prompt.main_character} to return to the ordinary world and help others rediscover their sense of wonder. They organized stargazing nights, storytelling circles, and adventures in nature that helped people remember how to see magic in the world around them.

As more hearts opened to wonder and possibility, the magical realm began to heal. The sparkles of magic grew brighter, the singing flowers found their voices again, and the wise trees shared their stories with renewed joy.

${prompt.main_character} learned that magic isn't something separate from ordinary life - it's woven into every act of kindness, every moment of creativity, and every time someone chooses to believe that the world can be more beautiful than it is. The real magic was the ability to see wonder everywhere and to help others see it too.`
    };
    
    return fallbackStories[prompt.theme as keyof typeof fallbackStories] || fallbackStories.adventure;
  }
}

export function generateStoryTitle(prompt: StoryPrompt, isPremium: boolean = false): string {
  const basicTitles = [
    `${prompt.main_character}'s ${prompt.theme.charAt(0).toUpperCase() + prompt.theme.slice(1)} Adventure`,
    `The Magical ${prompt.setting}`,
    `${prompt.main_character} and the ${prompt.theme.charAt(0).toUpperCase() + prompt.theme.slice(1)} Quest`,
    `Journey to the ${prompt.setting}`,
    `The ${prompt.theme.charAt(0).toUpperCase() + prompt.theme.slice(1)} of ${prompt.main_character}`,
  ];
  
  const premiumTitles = [
    `${prompt.main_character} and the Chronicles of ${prompt.setting}`,
    `The Legendary Tales of ${prompt.main_character}: A ${prompt.theme.charAt(0).toUpperCase() + prompt.theme.slice(1)} Saga`,
    `Beyond the Realm of ${prompt.setting}: ${prompt.main_character}'s Epic Journey`,
    `The Mystical Adventures of ${prompt.main_character} in the ${prompt.setting}`,
    `${prompt.main_character}: Guardian of ${prompt.setting} and Master of ${prompt.theme.charAt(0).toUpperCase() + prompt.theme.slice(1)}`,
  ];
  
  const titles = isPremium ? premiumTitles : basicTitles;
  return titles[Math.floor(Math.random() * titles.length)];
}
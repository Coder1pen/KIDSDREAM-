import { StoryPrompt } from '../types';

// This is a placeholder implementation
// In a real application, you would connect to an AI service or backend API
export async function generateStory(prompt: StoryPrompt): Promise<string> {
  try {
    // This would be a call to your backend API or AI service
    const response = await fetch('/api/generate-story', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(prompt),
    });

    if (!response.ok) {
      throw new Error('Failed to generate story');
    }

    const data = await response.json();
    return data.content;
  } catch (error) {
    console.error('Error generating story:', error);
    
    // Fallback for demo purposes
    return `Once upon a time, there was a ${prompt.main_character} who lived in ${prompt.setting}. 
    They loved adventures about ${prompt.theme}. 
    One day, something magical happened...
    
    (This is a placeholder story. In the actual application, we would generate a complete, 
    engaging story based on the provided prompt using an AI service.)`;
  }
}

export function generateStoryTitle(prompt: StoryPrompt): string {
  const titles = [
    `${prompt.main_character}'s ${prompt.theme} Adventure`,
    `The Magical ${prompt.setting}`,
    `${prompt.main_character} and the ${prompt.theme} Mystery`,
    `Journey to the ${prompt.setting}`,
    `The ${prompt.theme} Quest`,
  ];
  
  return titles[Math.floor(Math.random() * titles.length)];
}
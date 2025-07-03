import { create } from 'zustand';
import { Story, StoryPrompt } from '../types';
import { 
  saveStory as saveStoryToDb,
  getUserStories,
  updateStory as updateStoryInDb,
  deleteStory as deleteStoryFromDb
} from '../lib/supabase';
import { generateStory, generateStoryTitle } from '../lib/storyGenerator';

interface StoryState {
  stories: Story[];
  currentStory: Story | null;
  isLoading: boolean;
  error: string | null;
  generateNewStory: (prompt: StoryPrompt, userId: string, isPremium?: boolean) => Promise<Story | null>;
  saveStory: (story: Omit<Story, 'id' | 'created_at'>) => Promise<void>;
  loadUserStories: (userId: string) => Promise<void>;
  updateStory: (id: string, updates: Partial<Story>) => Promise<void>;
  deleteStory: (id: string) => Promise<void>;
  setCurrentStory: (story: Story | null) => void;
  decrementStoriesRemaining: (userId: string) => Promise<void>;
}

export const useStoryStore = create<StoryState>((set, get) => ({
  stories: [],
  currentStory: null,
  isLoading: false,
  error: null,
  
  generateNewStory: async (prompt, userId, isPremium = false) => {
    set({ isLoading: true, error: null });
    try {
      const content = await generateStory(prompt, isPremium);
      const title = generateStoryTitle(prompt, isPremium);
      
      const newStory: Omit<Story, 'id' | 'created_at'> = {
        title,
        content,
        user_id: userId,
        is_favorite: false,
        theme: prompt.theme,
        age_group: prompt.age_group,
        main_character: prompt.main_character,
        setting: prompt.setting
      };
      
      const { data, error } = await saveStoryToDb(newStory);
      
      if (error) throw new Error(error.message);
      if (!data || data.length === 0) throw new Error('Failed to save story');
      
      const savedStory = data[0] as Story;
      
      // Decrement stories remaining for free users
      if (!isPremium) {
        await get().decrementStoriesRemaining(userId);
      }
      
      set(state => ({ 
        stories: [savedStory, ...state.stories],
        currentStory: savedStory,
        isLoading: false
      }));
      
      return savedStory;
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      return null;
    }
  },
  
  saveStory: async (story) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await saveStoryToDb(story);
      
      if (error) throw new Error(error.message);
      if (!data || data.length === 0) throw new Error('Failed to save story');
      
      const savedStory = data[0] as Story;
      
      set(state => ({ 
        stories: [savedStory, ...state.stories],
        isLoading: false
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
  
  loadUserStories: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await getUserStories(userId);
      
      if (error) throw new Error(error.message);
      
      set({ stories: data || [], isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
  
  updateStory: async (id, updates) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await updateStoryInDb(id, updates);
      
      if (error) throw new Error(error.message);
      
      set(state => ({
        stories: state.stories.map(story => 
          story.id === id ? { ...story, ...updates } : story
        ),
        currentStory: state.currentStory?.id === id 
          ? { ...state.currentStory, ...updates } 
          : state.currentStory,
        isLoading: false
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
  
  deleteStory: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await deleteStoryFromDb(id);
      
      if (error) throw new Error(error.message);
      
      set(state => ({
        stories: state.stories.filter(story => story.id !== id),
        currentStory: state.currentStory?.id === id ? null : state.currentStory,
        isLoading: false
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },
  
  setCurrentStory: (story) => {
    set({ currentStory: story });
  },

  decrementStoriesRemaining: async (userId) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/decrement-stories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error('Failed to update story count');
      }
    } catch (error) {
      console.error('Error decrementing stories:', error);
      // Don't throw here to avoid blocking story generation
    }
  }
}));
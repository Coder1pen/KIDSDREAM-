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
  isCurrentStorySaved: boolean;
  isLoading: boolean;
  error: string | null;
  generateNewStory: (prompt: StoryPrompt, userId: string, isPremium?: boolean) => Promise<Story | null>;
  saveStory: (story: Omit<Story, 'id' | 'created_at'>) => Promise<void>;
  saveStoryToLibrary: (story: Story, userId: string) => Promise<void>;
  loadUserStories: (userId: string) => Promise<void>;
  updateStory: (id: string, updates: Partial<Story>) => Promise<void>;
  deleteStory: (id: string) => Promise<void>;
  setCurrentStory: (story: Story | null) => void;
  decrementStoriesRemaining: (userId: string) => Promise<void>;
}

export const useStoryStore = create<StoryState>((set, get) => ({
  stories: [],
  currentStory: null,
  isCurrentStorySaved: false,
  isLoading: false,
  error: null,
  
  generateNewStory: async (prompt, userId, isPremium = false) => {
    set({ isLoading: true, error: null });
    try {
      const content = await generateStory(prompt, isPremium);
      const title = generateStoryTitle(prompt, isPremium);
      
      // Create a temporary story object for display
      const tempStory: Story = {
        id: `temp-${Date.now()}`, // Temporary ID
        title,
        content,
        user_id: userId,
        is_favorite: false,
        theme: prompt.theme,
        age_group: prompt.age_group,
        main_character: prompt.main_character,
        setting: prompt.setting,
        created_at: new Date().toISOString()
      };
      
      // Decrement stories remaining for free users
      if (!isPremium) {
        await get().decrementStoriesRemaining(userId);
      }
      
      set({ 
        currentStory: tempStory,
        isCurrentStorySaved: false,
        isLoading: false
      });
      
      return tempStory;
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      return null;
    }
  },

  saveStoryToLibrary: async (story, userId) => {
    set({ isLoading: true, error: null });
    try {
      const storyToSave: Omit<Story, 'id' | 'created_at'> = {
        title: story.title,
        content: story.content,
        user_id: userId,
        is_favorite: story.is_favorite,
        theme: story.theme,
        age_group: story.age_group,
        main_character: story.main_character,
        setting: story.setting
      };

      const { data, error } = await saveStoryToDb(storyToSave);
      
      if (error) throw new Error(error.message);
      if (!data || data.length === 0) throw new Error('Failed to save story');
      
      const savedStory = data[0] as Story;
      
      set(state => ({ 
        stories: [savedStory, ...state.stories],
        currentStory: savedStory,
        isCurrentStorySaved: true,
        isLoading: false
      }));
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw error;
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
      }));
    } catch (error) {
      console.error('Error updating story:', error);
      throw error;
    }
  },
  
  deleteStory: async (id) => {
    try {
      // First, delete from the database
      const { error } = await deleteStoryFromDb(id);
      
      if (error) throw new Error(error.message);
      
      // Then update the local state to remove the story
      set(state => ({
        stories: state.stories.filter(story => story.id !== id),
        currentStory: state.currentStory?.id === id ? null : state.currentStory,
      }));
      
      console.log(`Story ${id} deleted successfully`);
    } catch (error) {
      console.error('Error deleting story:', error);
      throw error;
    }
  },
  
  setCurrentStory: (story) => {
    set({ 
      currentStory: story,
      isCurrentStorySaved: story ? !story.id.startsWith('temp-') : false
    });
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
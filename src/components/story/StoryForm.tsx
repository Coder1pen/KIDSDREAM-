import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Textarea } from '../ui/Textarea';
import { StoryPrompt } from '../../types';
import { useAuthStore } from '../../store/useAuthStore';
import { useSubscriptionStore } from '../../store/useSubscriptionStore';

interface StoryFormProps {
  onSubmit: (prompt: StoryPrompt) => Promise<void>;
  isGenerating: boolean;
}

export const StoryForm: React.FC<StoryFormProps> = ({ onSubmit, isGenerating }) => {
  const { user } = useAuthStore();
  const { userSubscription } = useSubscriptionStore();
  
  const [prompt, setPrompt] = useState<StoryPrompt>({
    main_character: '',
    age_group: '3-5',
    setting: '',
    theme: 'adventure',
    additional_details: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPrompt(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.main_character || !prompt.setting) return;
    
    await onSubmit(prompt);
  };

  const hasRemainingStories = user && (
    user.subscription_tier === 'premium' || 
    userSubscription.storiesRemaining > 0
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          id="main-character"
          name="main_character"
          label="Main Character"
          placeholder="e.g., Lily the Unicorn, Tommy the Robot, Princess Maya"
          value={prompt.main_character}
          onChange={handleChange}
          required
        />
        
        <Select
          id="age-group"
          name="age_group"
          label="Age Group"
          value={prompt.age_group}
          onChange={handleChange}
          options={[
            { value: '3-5', label: '3-5 years' },
            { value: '6-8', label: '6-8 years' },
            { value: '9-12', label: '9-12 years' },
          ]}
        />
      </div>
      
      <Input
        id="setting"
        name="setting"
        label="Story Setting"
        placeholder="e.g., Enchanted Forest, Space Station, Underwater Kingdom, Magical School"
        value={prompt.setting}
        onChange={handleChange}
        required
      />
      
      <Select
        id="theme"
        name="theme"
        label="Story Theme"
        value={prompt.theme}
        onChange={handleChange}
        options={[
          { value: 'adventure', label: '🗺️ Adventure & Exploration' },
          { value: 'friendship', label: '🤝 Friendship & Kindness' },
          { value: 'magic', label: '✨ Magic & Fantasy' },
          { value: 'learning', label: '📚 Learning & Discovery' },
          { value: 'animals', label: '🐾 Animals & Nature' },
          { value: 'family', label: '👨‍👩‍👧‍👦 Family & Love' },
          { value: 'bedtime', label: '🌙 Bedtime & Dreams' },
          { value: 'courage', label: '🦁 Courage & Bravery' },
          { value: 'creativity', label: '🎨 Creativity & Art' },
          { value: 'science', label: '🔬 Science & Innovation' },
          { value: 'mystery', label: '🔍 Mystery & Detective' },
          { value: 'sports', label: '⚽ Sports & Competition' },
          { value: 'music', label: '🎵 Music & Dance' },
          { value: 'cooking', label: '👨‍🍳 Cooking & Food' },
          { value: 'travel', label: '✈️ Travel & Culture' },
          { value: 'superhero', label: '🦸‍♀️ Superhero & Powers' },
          { value: 'pirates', label: '🏴‍☠️ Pirates & Treasure' },
          { value: 'dinosaurs', label: '🦕 Dinosaurs & Prehistoric' },
          { value: 'space', label: '🚀 Space & Aliens' },
          { value: 'underwater', label: '🌊 Underwater & Mermaids' },
        ]}
      />
      
      <Textarea
        id="additional-details"
        name="additional_details"
        label="Additional Details (Optional)"
        placeholder="Any specific elements you'd like in the story? E.g., includes a talking cat, teaches about sharing, has a rainbow bridge..."
        value={prompt.additional_details}
        onChange={handleChange}
        rows={3}
      />
      
      <div className="flex flex-col items-center space-y-4">
        <Button
          type="submit"
          className="w-full md:w-auto px-8 py-4 text-lg"
          disabled={isGenerating || !hasRemainingStories}
          isLoading={isGenerating}
          leftIcon={<Sparkles className="h-5 w-5" />}
        >
          {isGenerating ? 'Creating Magic...' : 'Generate Story'}
        </Button>
        
        {user ? (
          <div className="text-center">
            <p className="text-sm text-gray-400">
              {user.subscription_tier === 'premium' ? (
                <span className="text-navy-300 font-semibold">
                  ✨ Premium subscription: Unlimited stories with enhanced features
                </span>
              ) : (
                <span>
                  Stories remaining this month: <span className="font-semibold text-navy-300">{userSubscription.storiesRemaining}</span>
                </span>
              )}
            </p>
          </div>
        ) : (
          <p className="text-sm text-gray-400 text-center">
            Sign in to save and generate more stories
          </p>
        )}
        
        {user && userSubscription.storiesRemaining === 0 && user.subscription_tier !== 'premium' && (
          <div className="mt-4 p-4 bg-navy-900/30 border border-navy-700/50 rounded-lg text-center max-w-md">
            <p className="text-navy-300 text-sm mb-3">
              You've used all your free stories this month!
            </p>
            <Button
              onClick={() => window.location.href = '/pricing'}
              size="sm"
              className="bg-gradient-to-r from-navy-600 to-navy-500 hover:from-navy-500 hover:to-navy-400"
            >
              Upgrade to Premium
            </Button>
          </div>
        )}
      </div>
    </form>
  );
};
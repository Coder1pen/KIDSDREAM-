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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          id="main-character"
          name="main_character"
          label="Main Character"
          placeholder="e.g., Lily the Unicorn, Tommy the Robot"
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
        placeholder="e.g., Enchanted Forest, Space Station, Underwater Kingdom"
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
          { value: 'adventure', label: 'Adventure' },
          { value: 'friendship', label: 'Friendship' },
          { value: 'magic', label: 'Magic & Fantasy' },
          { value: 'learning', label: 'Learning & Growing' },
          { value: 'animals', label: 'Animals' },
          { value: 'family', label: 'Family' },
          { value: 'bedtime', label: 'Bedtime Story' },
        ]}
      />
      
      <Textarea
        id="additional-details"
        name="additional_details"
        label="Additional Details (Optional)"
        placeholder="Any specific elements you'd like in the story? E.g., includes a talking cat, teaches about sharing..."
        value={prompt.additional_details}
        onChange={handleChange}
        rows={3}
      />
      
      <div className="flex flex-col items-center">
        <Button
          type="submit"
          className="w-full md:w-auto px-8"
          disabled={isGenerating || !hasRemainingStories}
          isLoading={isGenerating}
          leftIcon={<Sparkles className="h-4 w-4" />}
        >
          {isGenerating ? 'Creating Magic...' : 'Generate Story'}
        </Button>
        
        {user ? (
          <p className="mt-2 text-sm text-gray-500">
            {user.subscription_tier === 'premium' 
              ? 'Premium subscription: Unlimited stories' 
              : `Stories remaining this month: ${userSubscription.storiesRemaining}`
            }
          </p>
        ) : (
          <p className="mt-2 text-sm text-gray-500">
            Sign in to save and generate more stories
          </p>
        )}
        
        {user && userSubscription.storiesRemaining === 0 && user.subscription_tier !== 'premium' && (
          <div className="mt-4 p-3 bg-accent-50 text-accent-800 rounded-md text-sm">
            You've used all your free stories this month. <a href="/pricing" className="font-medium underline">Upgrade to Premium</a> for unlimited stories!
          </div>
        )}
      </div>
    </form>
  );
};
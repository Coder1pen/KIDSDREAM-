import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/Card';
import { StoryForm } from '../components/story/StoryForm';
import { StoryDisplay } from '../components/story/StoryDisplay';
import { StoryPrompt } from '../types';
import { useAuthStore } from '../store/useAuthStore';
import { useStoryStore } from '../store/useStoryStore';
import { useSubscriptionStore } from '../store/useSubscriptionStore';

export const Generator: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { generateNewStory, currentStory } = useStoryStore();
  const { loadUserSubscription, userSubscription } = useSubscriptionStore();
  const [isGenerating, setIsGenerating] = useState(false);
  
  useEffect(() => {
    if (user) {
      loadUserSubscription(user.id);
    }
  }, [user]);
  
  const handleGenerateStory = async (prompt: StoryPrompt) => {
    if (!user) {
      // If user is not logged in, redirect to sign in page
      navigate('/signin?redirect=generator');
      return;
    }
    
    // Check if user can generate stories
    if (user.subscription_tier !== 'premium' && userSubscription.storiesRemaining <= 0) {
      navigate('/pricing');
      return;
    }
    
    setIsGenerating(true);
    try {
      await generateNewStory(prompt, user.id);
      // Update subscription status after generation
      if (user) {
        loadUserSubscription(user.id);
      }
    } catch (error) {
      console.error('Error generating story:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary-900 mb-6 text-center">
        Create a Magical Story
      </h1>
      
      <p className="text-gray-600 mb-8 text-center max-w-2xl mx-auto">
        Fill in the details below to generate a personalized story for your child. 
        The more specific you are, the more magical the story will be!
      </p>
      
      <div className="space-y-8">
        <Card>
          <CardContent className="p-6">
            <StoryForm onSubmit={handleGenerateStory} isGenerating={isGenerating} />
          </CardContent>
        </Card>
        
        {isGenerating && (
          <div className="flex flex-col items-center py-8">
            <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Creating your magical story...</p>
          </div>
        )}
        
        {currentStory && !isGenerating && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-primary-900 mb-4">
              Your Magical Story
            </h2>
            <StoryDisplay story={currentStory} />
          </div>
        )}
      </div>
    </div>
  );
};
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
      const isPremium = user.subscription_tier === 'premium';
      await generateNewStory(prompt, user.id, isPremium);
      
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
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-navy-200 to-navy-100 bg-clip-text text-transparent mb-4">
          Create a Magical Story
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Fill in the details below to generate a personalized story for your child. 
          {user?.subscription_tier === 'premium' ? (
            <span className="block mt-2 text-navy-300 font-semibold">
              ✨ Premium stories are longer, more detailed, and crafted with advanced storytelling techniques!
            </span>
          ) : (
            <span className="block mt-2 text-gray-400">
              Upgrade to Premium for longer, more detailed stories with advanced features!
            </span>
          )}
        </p>
      </div>
      
      <div className="space-y-8">
        <Card hoverEffect>
          <CardContent className="p-8">
            <StoryForm onSubmit={handleGenerateStory} isGenerating={isGenerating} />
          </CardContent>
        </Card>
        
        {isGenerating && (
          <div className="flex flex-col items-center py-12">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-navy-800/30 border-t-navy-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-r-navy-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            </div>
            <p className="mt-6 text-xl text-navy-200 font-medium">
              {user?.subscription_tier === 'premium' 
                ? 'Crafting your premium magical story...' 
                : 'Creating your magical story...'
              }
            </p>
            <p className="mt-2 text-gray-400">
              {user?.subscription_tier === 'premium' 
                ? 'Premium stories take a bit longer but are worth the wait!' 
                : 'This may take a few moments'
              }
            </p>
          </div>
        )}
        
        {currentStory && !isGenerating && (
          <div className="animate-fade-in">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-navy-200 to-navy-100 bg-clip-text text-transparent mb-2">
                Your Magical Story
              </h2>
              {user?.subscription_tier === 'premium' && (
                <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-navy-600/20 to-navy-500/20 rounded-full border border-navy-500/30">
                  <span className="text-navy-300 font-medium">✨ Premium Story</span>
                </div>
              )}
            </div>
            <StoryDisplay story={currentStory} />
          </div>
        )}
      </div>
    </div>
  );
};
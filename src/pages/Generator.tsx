import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { StoryForm } from '../components/story/StoryForm';
import { StoryDisplay } from '../components/story/StoryDisplay';
import { StoryPrompt } from '../types';
import { useAuthStore } from '../store/useAuthStore';
import { useStoryStore } from '../store/useStoryStore';
import { useSubscriptionStore } from '../store/useSubscriptionStore';
import { Crown, Calendar, AlertCircle } from 'lucide-react';

export const Generator: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { generateNewStory, currentStory, isCurrentStorySaved } = useStoryStore();
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
      // Show upgrade prompt instead of navigating immediately
      return;
    }
    
    setIsGenerating(true);
    try {
      const isPremium = user.subscription_tier === 'premium';
      const story = await generateNewStory(prompt, user.id, isPremium);
      
      if (story) {
        // Reload subscription status to get updated count for free users
        if (user && !isPremium) {
          loadUserSubscription(user.id);
        }
      }
    } catch (error) {
      console.error('Error generating story:', error);
      // If there was an error, reload the subscription to get the correct count
      if (user && user.subscription_tier !== 'premium') {
        loadUserSubscription(user.id);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  // Calculate days until next month
  const getDaysUntilNextMonth = () => {
    const now = new Date();
    const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const diffTime = nextMonth.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysUntilReset = getDaysUntilNextMonth();

  return (
    <div className="bg-dark-950 text-white min-h-screen">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-2 h-2 bg-navy-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-navy-300 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-navy-500 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-60 right-1/3 w-1 h-1 bg-navy-400 rounded-full animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-900/20 via-transparent to-dark-950/40"></div>

      <div className="relative max-w-4xl mx-auto px-4 py-8">
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

        {/* Subscription Status Card */}
        {user && (
          <Card className="mb-8 bg-dark-900/50 backdrop-blur-sm border-navy-800/30">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                  {user.subscription_tier === 'premium' ? (
                    <>
                      <div className="w-12 h-12 bg-gradient-to-br from-navy-600 to-navy-500 rounded-full flex items-center justify-center">
                        <Crown className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-navy-200">Premium Subscription</h3>
                        <p className="text-gray-400">Unlimited premium stories</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-12 h-12 bg-dark-700 rounded-full flex items-center justify-center">
                        <span className="text-2xl font-bold text-navy-300">{userSubscription.storiesRemaining}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-navy-200">Free Plan</h3>
                        <p className="text-gray-400">
                          {userSubscription.storiesRemaining} stories remaining this month
                        </p>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Calendar className="h-3 w-3 mr-1" />
                          Resets in {daysUntilReset} days
                        </div>
                      </div>
                    </>
                  )}
                </div>
                
                {user.subscription_tier !== 'premium' && (
                  <Button
                    onClick={() => navigate('/pricing')}
                    leftIcon={<Crown className="h-4 w-4" />}
                    className="bg-gradient-to-r from-navy-600 to-navy-500 hover:from-navy-500 hover:to-navy-400"
                  >
                    Upgrade to Premium
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Story Limit Warning */}
        {user && user.subscription_tier !== 'premium' && userSubscription.storiesRemaining === 0 && (
          <Card className="mb-8 bg-gradient-to-r from-red-900/20 to-orange-900/20 border-red-500/30">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-red-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-red-300 mb-2">
                    You've reached your monthly story limit
                  </h3>
                  <p className="text-gray-300 mb-4">
                    You've used all {userSubscription.storiesRemaining === 0 ? '5' : userSubscription.storiesRemaining} free stories this month. 
                    Your stories will reset in {daysUntilReset} days, or you can upgrade to Premium for unlimited stories.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={() => navigate('/pricing')}
                      leftIcon={<Crown className="h-4 w-4" />}
                      className="bg-gradient-to-r from-navy-600 to-navy-500 hover:from-navy-500 hover:to-navy-400"
                    >
                      Upgrade to Premium
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => navigate('/stories')}
                      className="border-gray-600 text-gray-300 hover:bg-gray-800"
                    >
                      View My Stories
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
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
              <StoryDisplay story={currentStory} showSaveButton={!isCurrentStorySaved} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
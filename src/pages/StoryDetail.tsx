import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { StoryDisplay } from '../components/story/StoryDisplay';
import { useAuthStore } from '../store/useAuthStore';
import { useStoryStore } from '../store/useStoryStore';

export const StoryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { stories, loadUserStories, isLoading } = useStoryStore();
  
  useEffect(() => {
    if (!user) {
      navigate('/signin?redirect=stories');
      return;
    }
    
    if (stories.length === 0) {
      loadUserStories(user.id);
    }
  }, [user, stories.length]);
  
  const story = stories.find(s => s.id === id);
  
  if (isLoading) {
    return (
      <div className="bg-dark-950 text-white min-h-screen">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-2 h-2 bg-navy-400 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-1 h-1 bg-navy-300 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-navy-500 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900/20 via-transparent to-dark-950/40"></div>

        <div className="relative flex flex-col items-center justify-center py-16">
          <div className="relative mb-6">
            <div className="w-16 h-16 border-4 border-navy-800/30 border-t-navy-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-navy-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          <p className="text-xl text-navy-200">Loading your magical story...</p>
        </div>
      </div>
    );
  }
  
  if (!story) {
    return (
      <div className="bg-dark-950 text-white min-h-screen">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-2 h-2 bg-navy-400 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-1 h-1 bg-navy-300 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-navy-500 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900/20 via-transparent to-dark-950/40"></div>

        <div className="relative max-w-4xl mx-auto px-4 py-8">
          <Button 
            variant="ghost" 
            className="mb-6 text-gray-300 hover:text-navy-200" 
            onClick={() => navigate('/stories')}
            leftIcon={<ArrowLeft className="h-4 w-4" />}
          >
            Back to My Stories
          </Button>
          
          <div className="text-center py-16 bg-dark-900/30 rounded-xl border border-navy-800/30">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-navy-200 mb-4">Story not found</h3>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              The story you're looking for doesn't exist or you don't have access to it.
            </p>
            <Button 
              onClick={() => navigate('/stories')}
              className="bg-gradient-to-r from-navy-600 to-navy-500 hover:from-navy-500 hover:to-navy-400"
            >
              Back to My Stories
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
        <Button 
          variant="ghost" 
          className="mb-8 text-gray-300 hover:text-navy-200 hover:bg-navy-900/30" 
          onClick={() => navigate('/stories')}
          leftIcon={<ArrowLeft className="h-4 w-4" />}
        >
          Back to My Stories
        </Button>
        
        <StoryDisplay story={story} />
      </div>
    </div>
  );
};
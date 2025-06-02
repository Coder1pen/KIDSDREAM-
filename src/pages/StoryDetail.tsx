import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
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
      <div className="flex flex-col items-center py-12">
        <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600">Loading story...</p>
      </div>
    );
  }
  
  if (!story) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Story not found</h3>
          <p className="text-gray-500 mb-6">
            The story you're looking for doesn't exist or you don't have access to it.
          </p>
          <Button onClick={() => navigate('/stories')}>
            Back to My Stories
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        className="mb-6" 
        onClick={() => navigate('/stories')}
        leftIcon={<ArrowLeft className="h-4 w-4" />}
      >
        Back to My Stories
      </Button>
      
      <StoryDisplay story={story} />
    </div>
  );
};
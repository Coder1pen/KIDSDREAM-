import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, BookOpen, Trash2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/Card';
import { Button } from '../ui/Button';
import { Story } from '../../types';
import { useStoryStore } from '../../store/useStoryStore';

interface StoryCardProps {
  story: Story;
}

export const StoryCard: React.FC<StoryCardProps> = ({ story }) => {
  const navigate = useNavigate();
  const { updateStory, deleteStory, setCurrentStory } = useStoryStore();
  
  const handleViewStory = () => {
    setCurrentStory(story);
    navigate(`/story/${story.id}`);
  };
  
  const toggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    await updateStory(story.id, { is_favorite: !story.is_favorite });
  };
  
  const handleDeleteStory = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this story?')) {
      await deleteStory(story.id);
    }
  };
  
  // Format the date nicely
  const formattedDate = new Date(story.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
  
  // Get a short preview of the story content
  const contentPreview = story.content.length > 120 
    ? `${story.content.substring(0, 120)}...` 
    : story.content;

  return (
    <Card 
      className="h-full transition-all duration-300 hover:shadow-md cursor-pointer"
      onClick={handleViewStory}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{story.title}</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="p-1 h-auto"
            onClick={toggleFavorite}
            aria-label={story.is_favorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart className={`h-4 w-4 ${story.is_favorite ? 'fill-error-500 text-error-500' : 'text-gray-400'}`} />
          </Button>
        </div>
        <div className="text-xs text-gray-500">{formattedDate}</div>
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="flex flex-wrap gap-1 mb-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-100 text-primary-800">
            {story.theme}
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-secondary-100 text-secondary-800">
            {story.age_group} years
          </span>
        </div>
        <p className="text-sm text-gray-600 line-clamp-3">{contentPreview}</p>
      </CardContent>
      
      <CardFooter className="pt-2 flex justify-between">
        <Button
          variant="ghost"
          size="sm"
          leftIcon={<BookOpen className="h-4 w-4" />}
          onClick={handleViewStory}
        >
          Read
        </Button>
        <Button
          variant="ghost"
          size="sm"
          leftIcon={<Trash2 className="h-4 w-4 text-error-500" />}
          onClick={handleDeleteStory}
          className="text-error-500 hover:bg-error-50"
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};
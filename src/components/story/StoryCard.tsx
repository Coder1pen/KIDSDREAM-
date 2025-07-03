import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, BookOpen, Trash2, Calendar, User } from 'lucide-react';
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
    if (window.confirm('Are you sure you want to delete this story? This action cannot be undone.')) {
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
  const contentPreview = story.content.length > 150 
    ? `${story.content.substring(0, 150)}...` 
    : story.content;

  // Get theme emoji
  const getThemeEmoji = (theme: string) => {
    const themeEmojis: { [key: string]: string } = {
      adventure: '🗺️',
      friendship: '🤝',
      magic: '✨',
      learning: '📚',
      animals: '🐾',
      family: '👨‍👩‍👧‍👦',
      bedtime: '🌙',
      courage: '🦁',
      creativity: '🎨',
      science: '🔬',
      mystery: '🔍',
      sports: '⚽',
      music: '🎵',
      cooking: '👨‍🍳',
      travel: '✈️',
      superhero: '🦸‍♀️',
      pirates: '🏴‍☠️',
      dinosaurs: '🦕',
      space: '🚀',
      underwater: '🌊',
    };
    return themeEmojis[theme] || '📖';
  };

  return (
    <Card 
      className="h-full transition-all duration-300 hover:shadow-glow cursor-pointer bg-dark-900/50 backdrop-blur-sm border-navy-800/30 hover:border-navy-600/50 group"
      onClick={handleViewStory}
      hoverEffect
    >
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg text-navy-100 group-hover:text-navy-50 transition-colors line-clamp-2">
            {story.title}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="p-1 h-auto opacity-70 hover:opacity-100"
            onClick={toggleFavorite}
            aria-label={story.is_favorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart className={`h-4 w-4 transition-colors ${story.is_favorite ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-400'}`} />
          </Button>
        </div>
        
        <div className="flex items-center text-xs text-gray-400 space-x-3 mt-2">
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" />
            {formattedDate}
          </div>
          <div className="flex items-center">
            <User className="h-3 w-3 mr-1" />
            {story.age_group} years
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-3">
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-navy-900/50 text-navy-300 border border-navy-700/50">
            {getThemeEmoji(story.theme)} {story.theme.charAt(0).toUpperCase() + story.theme.slice(1)}
          </span>
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-dark-800/50 text-gray-300 border border-gray-600/30">
            🏰 {story.setting}
          </span>
        </div>
        
        <p className="text-sm text-gray-300 leading-relaxed line-clamp-4">
          {contentPreview}
        </p>
        
        <div className="mt-3 text-xs text-gray-400">
          <span className="font-medium">Character:</span> {story.main_character}
        </div>
      </CardContent>
      
      <CardFooter className="pt-3 flex justify-between bg-dark-950/30 border-t border-navy-800/20">
        <Button
          variant="ghost"
          size="sm"
          leftIcon={<BookOpen className="h-4 w-4" />}
          onClick={handleViewStory}
          className="text-navy-300 hover:text-navy-200 hover:bg-navy-900/30"
        >
          Read Story
        </Button>
        <Button
          variant="ghost"
          size="sm"
          leftIcon={<Trash2 className="h-4 w-4" />}
          onClick={handleDeleteStory}
          className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};
import React, { useEffect, useState, useRef } from 'react';
import { Heart, Share2, Download, Volume2, VolumeX, BookOpen, Save, Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card, CardContent, CardFooter } from '../ui/Card';
import { Story } from '../../types';
import { useStoryStore } from '../../store/useStoryStore';
import { useAuthStore } from '../../store/useAuthStore';

interface StoryDisplayProps {
  story: Story;
  showSaveButton?: boolean;
}

export const StoryDisplay: React.FC<StoryDisplayProps> = ({ story, showSaveButton = false }) => {
  const { user } = useAuthStore();
  const { updateStory, saveStoryToLibrary } = useStoryStore();
  const [isReading, setIsReading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(story.is_favorite);
  const [isSaved, setIsSaved] = useState(!showSaveButton); // If showSaveButton is false, story is already saved
  const [isSaving, setIsSaving] = useState(false);
  const audioRef = useRef<SpeechSynthesisUtterance | null>(null);
  
  useEffect(() => {
    setIsFavorite(story.is_favorite);
  }, [story]);
  
  const toggleFavorite = async () => {
    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus);
    await updateStory(story.id, { is_favorite: newFavoriteStatus });
  };

  const handleSaveStory = async () => {
    if (!user || isSaved || isSaving) return;
    
    setIsSaving(true);
    try {
      await saveStoryToLibrary(story, user.id);
      setIsSaved(true);
    } catch (error) {
      console.error('Error saving story:', error);
      alert('Failed to save story. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };
  
  const shareStory = () => {
    if (navigator.share) {
      navigator.share({
        title: story.title,
        text: `Check out this magical story: ${story.title}`,
        url: window.location.href,
      });
    } else {
      // Fallback if Web Share API is not available
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };
  
  const downloadStory = () => {
    const element = document.createElement('a');
    const file = new Blob([`${story.title}\n\n${story.content}`], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${story.title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  
  const toggleReading = () => {
    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
      return;
    }
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(story.content);
      audioRef.current = utterance;
      
      utterance.onend = () => {
        setIsReading(false);
      };
      
      // Get voices and set a child-friendly one if available
      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(voice => voice.name.includes('female') || voice.name.includes('girl'));
      if (femaleVoice) {
        utterance.voice = femaleVoice;
      }
      
      utterance.pitch = 1.1; // Slightly higher pitch for a child-friendly voice
      utterance.rate = 0.9; // Slightly slower rate for better comprehension
      
      window.speechSynthesis.speak(utterance);
      setIsReading(true);
    } else {
      alert('Text-to-speech is not supported in your browser.');
    }
  };

  // Format the date nicely
  const formattedDate = new Date(story.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Card className="bg-dark-900/50 backdrop-blur-sm border-navy-800/30 shadow-glow">
      <CardContent className="p-8">
        {/* Story Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-navy-200 to-navy-100 bg-clip-text text-transparent">
              {story.title}
            </span>
          </h1>
          
          {/* Story Metadata */}
          <div className="flex flex-wrap justify-center gap-3 mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-navy-900/50 text-navy-300 border border-navy-700/50">
              📖 {story.theme.charAt(0).toUpperCase() + story.theme.slice(1)}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-navy-900/50 text-navy-300 border border-navy-700/50">
              👶 {story.age_group} years
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-navy-900/50 text-navy-300 border border-navy-700/50">
              🏰 {story.setting}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-navy-900/50 text-navy-300 border border-navy-700/50">
              ⭐ {story.main_character}
            </span>
          </div>
          
          <p className="text-sm text-gray-400">
            Created on {formattedDate}
          </p>
        </div>
        
        {/* Story Content */}
        <div className="bg-dark-800/30 rounded-xl p-6 md:p-8 border border-navy-800/20">
          <div className="prose prose-lg max-w-none text-gray-200 leading-relaxed">
            {story.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-6 text-gray-200 leading-relaxed text-lg">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-wrap items-center justify-between gap-4 p-6 bg-dark-950/30 border-t border-navy-800/30">
        <div className="flex items-center space-x-3">
          {/* Save Button - only show if story is not saved yet */}
          {showSaveButton && user && (
            <Button
              variant={isSaved ? "ghost" : "primary"}
              size="sm"
              leftIcon={isSaved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
              onClick={handleSaveStory}
              disabled={isSaved || isSaving}
              isLoading={isSaving}
              className={isSaved ? 'text-green-400 hover:text-green-300' : 'bg-gradient-to-r from-navy-600 to-navy-500 hover:from-navy-500 hover:to-navy-400'}
            >
              {isSaved ? 'Saved' : isSaving ? 'Saving...' : 'Save Story'}
            </Button>
          )}

          <Button
            variant="ghost"
            size="sm"
            leftIcon={<Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />}
            onClick={toggleFavorite}
            className={`${isFavorite ? 'text-red-500 hover:text-red-400' : 'text-gray-400 hover:text-navy-300'}`}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? 'Favorited' : 'Favorite'}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            leftIcon={isReading ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            onClick={toggleReading}
            className={`${isReading ? 'text-navy-400' : 'text-gray-400 hover:text-navy-300'}`}
            aria-label={isReading ? 'Stop reading' : 'Read aloud'}
          >
            {isReading ? 'Stop Reading' : 'Read Aloud'}
          </Button>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Share2 className="h-4 w-4" />}
            onClick={shareStory}
            className="border-navy-700/50 hover:bg-navy-900/30 text-gray-300 hover:text-navy-200"
            aria-label="Share story"
          >
            Share
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Download className="h-4 w-4" />}
            onClick={downloadStory}
            className="border-navy-700/50 hover:bg-navy-900/30 text-gray-300 hover:text-navy-200"
            aria-label="Download story"
          >
            Download
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
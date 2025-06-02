import React, { useEffect, useState, useRef } from 'react';
import { Heart, Share2, Download, BookOpen, Volume2, VolumeX } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card, CardContent, CardFooter } from '../ui/Card';
import { Story } from '../../types';
import { useStoryStore } from '../../store/useStoryStore';

interface StoryDisplayProps {
  story: Story;
}

export const StoryDisplay: React.FC<StoryDisplayProps> = ({ story }) => {
  const { updateStory } = useStoryStore();
  const [isReading, setIsReading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(story.is_favorite);
  const audioRef = useRef<SpeechSynthesisUtterance | null>(null);
  
  useEffect(() => {
    setIsFavorite(story.is_favorite);
  }, [story]);
  
  const toggleFavorite = async () => {
    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus);
    await updateStory(story.id, { is_favorite: newFavoriteStatus });
  };
  
  const shareStory = () => {
    if (navigator.share) {
      navigator.share({
        title: story.title,
        text: `Check out this story: ${story.title}`,
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

  return (
    <Card className="animate-pulse-slow">
      <CardContent className="p-6">
        <h2 className="text-2xl font-bold text-primary-900 mb-4">{story.title}</h2>
        
        <div className="prose max-w-none">
          {story.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4 text-gray-700 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-wrap items-center justify-between gap-2 p-4 bg-gray-50">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<Heart className={`h-4 w-4 ${isFavorite ? 'fill-error-500 text-error-500' : ''}`} />}
            onClick={toggleFavorite}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? 'Favorite' : 'Favorite'}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            leftIcon={isReading ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            onClick={toggleReading}
            aria-label={isReading ? 'Stop reading' : 'Read aloud'}
          >
            {isReading ? 'Stop Reading' : 'Read Aloud'}
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Share2 className="h-4 w-4" />}
            onClick={shareStory}
            aria-label="Share story"
          >
            Share
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Download className="h-4 w-4" />}
            onClick={downloadStory}
            aria-label="Download story"
          >
            Download
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
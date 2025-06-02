import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Search } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { StoryCard } from '../components/story/StoryCard';
import { useAuthStore } from '../store/useAuthStore';
import { useStoryStore } from '../store/useStoryStore';

export const Stories: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { stories, loadUserStories, isLoading } = useStoryStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTheme, setFilterTheme] = useState('');
  
  useEffect(() => {
    if (!user) {
      navigate('/signin?redirect=stories');
      return;
    }
    
    loadUserStories(user.id);
  }, [user]);
  
  // Get unique themes from stories
  const themes = Array.from(new Set(stories.map(story => story.theme)));
  
  // Filter stories based on search term and filter
  const filteredStories = stories.filter(story => {
    const matchesSearch = searchTerm === '' || 
      story.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      story.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTheme = filterTheme === '' || story.theme === filterTheme;
    
    return matchesSearch && matchesTheme;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary-900 mb-6">
        My Stories
      </h1>
      
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="w-full md:w-1/2">
          <Input
            id="search"
            placeholder="Search stories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            leftIcon={<Search className="h-4 w-4 text-gray-400" />}
          />
        </div>
        
        <div className="w-full md:w-1/4">
          <select
            className="w-full rounded-md border border-gray-300 py-2 px-4 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
            value={filterTheme}
            onChange={(e) => setFilterTheme(e.target.value)}
          >
            <option value="">All Themes</option>
            {themes.map(theme => (
              <option key={theme} value={theme}>
                {theme.charAt(0).toUpperCase() + theme.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex flex-col items-center py-12">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading your stories...</p>
        </div>
      ) : filteredStories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map(story => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No stories found</h3>
          <p className="text-gray-500 mb-6">
            {stories.length === 0 
              ? "You haven't created any stories yet." 
              : "No stories match your search criteria."}
          </p>
          {stories.length === 0 && (
            <button
              onClick={() => navigate('/generator')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
            >
              Create Your First Story
            </button>
          )}
        </div>
      )}
    </div>
  );
};
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Search, Filter, Heart, Calendar, Sparkles } from 'lucide-react';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { StoryCard } from '../components/story/StoryCard';
import { useAuthStore } from '../store/useAuthStore';
import { useStoryStore } from '../store/useStoryStore';

export const Stories: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { stories, loadUserStories, isLoading } = useStoryStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTheme, setFilterTheme] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  
  useEffect(() => {
    if (!user) {
      navigate('/signin?redirect=stories');
      return;
    }
    
    loadUserStories(user.id);
  }, [user]);
  
  // Get unique themes from stories
  const themes = Array.from(new Set(stories.map(story => story.theme)));
  
  // Filter and sort stories
  const filteredAndSortedStories = stories
    .filter(story => {
      const matchesSearch = searchTerm === '' || 
        story.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        story.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.main_character.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.setting.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesTheme = filterTheme === '' || story.theme === filterTheme;
      const matchesFavorites = !showFavoritesOnly || story.is_favorite;
      
      return matchesSearch && matchesTheme && matchesFavorites;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'oldest':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        case 'favorites':
          return (b.is_favorite ? 1 : 0) - (a.is_favorite ? 1 : 0);
        default:
          return 0;
      }
    });

  const favoriteCount = stories.filter(story => story.is_favorite).length;

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

      <div className="relative max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-navy-200 to-navy-100 bg-clip-text text-transparent">
              My Story Library
            </span>
          </h1>
          <p className="text-xl text-gray-300">
            Your collection of magical tales and adventures
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl p-6 border border-navy-800/30 text-center">
            <div className="text-3xl font-bold text-navy-300 mb-2">{stories.length}</div>
            <div className="text-gray-400">Total Stories</div>
          </div>
          <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl p-6 border border-navy-800/30 text-center">
            <div className="text-3xl font-bold text-red-400 mb-2">{favoriteCount}</div>
            <div className="text-gray-400">Favorite Stories</div>
          </div>
          <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl p-6 border border-navy-800/30 text-center">
            <div className="text-3xl font-bold text-navy-300 mb-2">{themes.length}</div>
            <div className="text-gray-400">Different Themes</div>
          </div>
        </div>
        
        {/* Filters and Search */}
        <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-navy-800/30">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="w-full lg:w-1/3">
              <Input
                id="search"
                placeholder="Search stories, characters, or settings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                leftIcon={<Search className="h-4 w-4 text-gray-400" />}
              />
            </div>
            
            <div className="w-full lg:w-1/4">
              <Select
                id="theme-filter"
                value={filterTheme}
                onChange={(e) => setFilterTheme(e.target.value)}
                options={[
                  { value: '', label: 'All Themes' },
                  ...themes.map(theme => ({
                    value: theme,
                    label: theme.charAt(0).toUpperCase() + theme.slice(1)
                  }))
                ]}
              />
            </div>

            <div className="w-full lg:w-1/4">
              <Select
                id="sort-by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                options={[
                  { value: 'newest', label: 'Newest First' },
                  { value: 'oldest', label: 'Oldest First' },
                  { value: 'alphabetical', label: 'A-Z' },
                  { value: 'favorites', label: 'Favorites First' },
                ]}
              />
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant={showFavoritesOnly ? 'primary' : 'ghost'}
                size="sm"
                leftIcon={<Heart className="h-4 w-4" />}
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className={showFavoritesOnly ? 'bg-red-600 hover:bg-red-700' : 'text-gray-400 hover:text-red-400'}
              >
                Favorites Only
              </Button>
            </div>
          </div>
        </div>
        
        {/* Stories Grid */}
        {isLoading ? (
          <div className="flex flex-col items-center py-16">
            <div className="relative mb-6">
              <div className="w-16 h-16 border-4 border-navy-800/30 border-t-navy-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-navy-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
            </div>
            <p className="text-xl text-navy-200">Loading your magical stories...</p>
          </div>
        ) : filteredAndSortedStories.length > 0 ? (
          <>
            <div className="mb-6 text-center">
              <p className="text-gray-400">
                Showing {filteredAndSortedStories.length} of {stories.length} stories
                {showFavoritesOnly && ' (favorites only)'}
                {filterTheme && ` (${filterTheme} theme)`}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedStories.map(story => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16 bg-dark-900/30 rounded-xl border border-navy-800/30">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-navy-200 mb-4">
              {stories.length === 0 
                ? "No stories yet" 
                : "No stories match your filters"}
            </h3>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              {stories.length === 0 
                ? "You haven't created any magical stories yet. Start your storytelling journey today!" 
                : "Try adjusting your search terms or filters to find the stories you're looking for."}
            </p>
            {stories.length === 0 && (
              <Button
                onClick={() => navigate('/generator')}
                leftIcon={<Sparkles className="h-5 w-5" />}
                className="bg-gradient-to-r from-navy-600 to-navy-500 hover:from-navy-500 hover:to-navy-400 shadow-glow"
              >
                Create Your First Story
              </Button>
            )}
          </div>
        )}

        {/* Quick Actions */}
        {stories.length > 0 && (
          <div className="mt-12 text-center">
            <Button
              onClick={() => navigate('/generator')}
              leftIcon={<Sparkles className="h-5 w-5" />}
              className="bg-gradient-to-r from-navy-600 to-navy-500 hover:from-navy-500 hover:to-navy-400 shadow-glow"
            >
              Create Another Story
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
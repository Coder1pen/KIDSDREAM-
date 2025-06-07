import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, User, LogOut, Star, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuthStore } from '../../store/useAuthStore';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuthStore();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-dark-950/95 backdrop-blur-md border-b border-navy-800/50 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <div className="relative">
                <BookOpen className="h-8 w-8 text-navy-400 group-hover:text-navy-300 transition-colors duration-300" />
                <Sparkles className="h-4 w-4 text-navy-300 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <span className="ml-3 text-xl font-bold bg-gradient-to-r from-navy-300 to-navy-100 bg-clip-text text-transparent">
                KIDS DREAM
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link 
              to="/" 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                isActive('/') 
                  ? 'bg-navy-800/50 text-navy-200 shadow-glow' 
                  : 'text-gray-300 hover:bg-navy-900/30 hover:text-navy-200'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/generator" 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                isActive('/generator') 
                  ? 'bg-navy-800/50 text-navy-200 shadow-glow' 
                  : 'text-gray-300 hover:bg-navy-900/30 hover:text-navy-200'
              }`}
            >
              Story Generator
            </Link>
            <Link 
              to="/stories" 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                isActive('/stories') 
                  ? 'bg-navy-800/50 text-navy-200 shadow-glow' 
                  : 'text-gray-300 hover:bg-navy-900/30 hover:text-navy-200'
              }`}
            >
              My Stories
            </Link>
            <Link 
              to="/pricing" 
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                isActive('/pricing') 
                  ? 'bg-navy-800/50 text-navy-200 shadow-glow' 
                  : 'text-gray-300 hover:bg-navy-900/30 hover:text-navy-200'
              }`}
            >
              Pricing
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-3 ml-4">
                <Link to="/profile">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    leftIcon={<User className="h-4 w-4" />}
                    className="text-gray-300 hover:text-navy-200 hover:bg-navy-900/30"
                  >
                    Profile
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  leftIcon={<LogOut className="h-4 w-4" />}
                  onClick={() => signOut()}
                  className="text-gray-300 hover:text-red-300 hover:bg-red-900/20"
                >
                  Sign Out
                </Button>
                {user.subscription_tier === 'premium' && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-navy-600 to-navy-500 text-white shadow-glow">
                    <Star className="h-3 w-3 mr-1 fill-current" />
                    Premium
                  </span>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3 ml-4">
                <Link to="/signin">
                  <Button variant="ghost" size="sm" className="text-gray-300 hover:text-navy-200 hover:bg-navy-900/30">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button variant="primary" size="sm" className="bg-gradient-to-r from-navy-600 to-navy-500 hover:from-navy-500 hover:to-navy-400 shadow-glow">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-navy-200 hover:bg-navy-900/30 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-navy-500 transition-colors duration-300"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden animate-slide-up">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-dark-900/95 backdrop-blur-md shadow-dark rounded-b-lg border-t border-navy-800/50">
            <Link 
              to="/" 
              className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                isActive('/') 
                  ? 'bg-navy-800/50 text-navy-200' 
                  : 'text-gray-300 hover:bg-navy-900/30 hover:text-navy-200'
              }`}
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link 
              to="/generator" 
              className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                isActive('/generator') 
                  ? 'bg-navy-800/50 text-navy-200' 
                  : 'text-gray-300 hover:bg-navy-900/30 hover:text-navy-200'
              }`}
              onClick={closeMenu}
            >
              Story Generator
            </Link>
            <Link 
              to="/stories" 
              className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                isActive('/stories') 
                  ? 'bg-navy-800/50 text-navy-200' 
                  : 'text-gray-300 hover:bg-navy-900/30 hover:text-navy-200'
              }`}
              onClick={closeMenu}
            >
              My Stories
            </Link>
            <Link 
              to="/pricing" 
              className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                isActive('/pricing') 
                  ? 'bg-navy-800/50 text-navy-200' 
                  : 'text-gray-300 hover:bg-navy-900/30 hover:text-navy-200'
              }`}
              onClick={closeMenu}
            >
              Pricing
            </Link>
            
            {user ? (
              <>
                <Link 
                  to="/profile" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-navy-900/30 hover:text-navy-200 transition-all duration-300"
                  onClick={closeMenu}
                >
                  Profile
                </Link>
                <button 
                  className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-red-900/20 hover:text-red-300 transition-all duration-300"
                  onClick={() => {
                    signOut();
                    closeMenu();
                  }}
                >
                  Sign Out
                </button>
              </>
            ) : (
              <div className="px-3 py-2 space-y-2">
                <Link 
                  to="/signin" 
                  className="block w-full text-center rounded-md py-2 bg-navy-900/50 border border-navy-700 font-medium text-gray-300 hover:bg-navy-800/50 hover:text-navy-200 transition-all duration-300"
                  onClick={closeMenu}
                >
                  Sign In
                </Link>
                <Link 
                  to="/signup" 
                  className="block w-full text-center rounded-md py-2 bg-gradient-to-r from-navy-600 to-navy-500 font-medium text-white hover:from-navy-500 hover:to-navy-400 shadow-glow transition-all duration-300"
                  onClick={closeMenu}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
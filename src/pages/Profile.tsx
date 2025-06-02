import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, User, CreditCard, BookOpen, LogOut } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { useAuthStore } from '../store/useAuthStore';
import { useStoryStore } from '../store/useStoryStore';
import { useSubscriptionStore } from '../store/useSubscriptionStore';

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuthStore();
  const { stories, loadUserStories } = useStoryStore();
  const { userSubscription, loadUserSubscription } = useSubscriptionStore();
  
  useEffect(() => {
    if (!user) {
      navigate('/signin?redirect=profile');
      return;
    }
    
    loadUserStories(user.id);
    loadUserSubscription(user.id);
  }, [user]);
  
  if (!user) return null;

  // Format the date nicely
  const formattedDate = new Date(user.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-primary-900 mb-6">
        My Profile
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Account Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Email</h3>
                  <p className="mt-1 text-lg text-gray-900">{user.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Member Since</h3>
                  <p className="mt-1 text-lg text-gray-900">{formattedDate}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Subscription</h3>
                  <p className="mt-1 text-lg text-gray-900">
                    {user.subscription_tier === 'premium' 
                      ? 'Premium Plan' 
                      : 'Free Plan'}
                  </p>
                </div>
                
                {user.subscription_tier !== 'premium' && (
                  <div className="pt-4">
                    <Button
                      onClick={() => navigate('/pricing')}
                      className="w-full sm:w-auto"
                    >
                      Upgrade to Premium
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Account Stats */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="h-5 w-5 mr-2" />
                Account Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Total Stories</h3>
                  <p className="mt-1 text-3xl font-bold text-primary-600">{stories.length}</p>
                </div>
                
                {user.subscription_tier !== 'premium' && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Stories Remaining</h3>
                    <p className="mt-1 text-3xl font-bold text-secondary-600">
                      {userSubscription.storiesRemaining}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">Resets monthly</p>
                  </div>
                )}
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Favorite Stories</h3>
                  <p className="mt-1 text-3xl font-bold text-accent-600">
                    {stories.filter(story => story.is_favorite).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        <Button
          variant="outline"
          className="p-4 h-auto justify-start"
          leftIcon={<BookOpen className="h-5 w-5" />}
          onClick={() => navigate('/stories')}
        >
          <span className="text-left">
            <span className="block font-medium">My Stories</span>
            <span className="block text-sm text-gray-500 mt-1">
              View and manage your stories
            </span>
          </span>
        </Button>
        
        <Button
          variant="outline"
          className="p-4 h-auto justify-start"
          leftIcon={<CreditCard className="h-5 w-5" />}
          onClick={() => navigate('/pricing')}
        >
          <span className="text-left">
            <span className="block font-medium">Subscription</span>
            <span className="block text-sm text-gray-500 mt-1">
              Manage your subscription plan
            </span>
          </span>
        </Button>
        
        <Button
          variant="outline"
          className="p-4 h-auto justify-start"
          leftIcon={<Settings className="h-5 w-5" />}
          onClick={() => navigate('/settings')}
        >
          <span className="text-left">
            <span className="block font-medium">Settings</span>
            <span className="block text-sm text-gray-500 mt-1">
              Adjust your account preferences
            </span>
          </span>
        </Button>
      </div>
      
      {/* Sign Out Button */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <Button
          variant="ghost"
          className="text-error-600 hover:bg-error-50 hover:text-error-700"
          leftIcon={<LogOut className="h-5 w-5" />}
          onClick={() => signOut()}
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
};
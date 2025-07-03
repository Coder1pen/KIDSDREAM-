import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, Sparkles, Crown, Loader } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { useAuthStore } from '../store/useAuthStore';
import { useSubscriptionStore } from '../store/useSubscriptionStore';

export const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, loadUser } = useAuthStore();
  const { loadUserSubscription } = useSubscriptionStore();
  const [isLoading, setIsLoading] = useState(true);
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const refreshUserData = async () => {
      if (user) {
        try {
          // Wait a moment for webhook processing
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          // Reload user data to get updated subscription status
          await loadUser();
          await loadUserSubscription(user.id);
        } catch (error) {
          console.error('Error refreshing user data:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    refreshUserData();
  }, [user, loadUser, loadUserSubscription]);

  if (isLoading) {
    return (
      <div className="bg-dark-950 text-white min-h-screen">
        <div className="relative flex flex-col items-center justify-center py-16">
          <div className="relative mb-6">
            <div className="w-16 h-16 border-4 border-navy-800/30 border-t-navy-500 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-navy-400 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          </div>
          <p className="text-xl text-navy-200">Processing your subscription...</p>
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
        <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-navy-300 rounded-full animate-float"></div>
        <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-navy-500 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-900/20 via-transparent to-dark-950/40"></div>

      <div className="relative max-w-4xl mx-auto px-4 py-16 md:py-24">
        <div className="text-center">
          <Card className="max-w-2xl mx-auto bg-dark-900/50 backdrop-blur-sm border-navy-500/50 shadow-glow">
            <CardContent className="p-12">
              {/* Success Icon */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="w-24 h-24 bg-gradient-to-br from-navy-600 to-navy-500 rounded-full flex items-center justify-center shadow-glow">
                    <CheckCircle className="h-12 w-12 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2">
                    <Crown className="h-8 w-8 text-navy-300 animate-pulse" />
                  </div>
                  <div className="absolute -bottom-2 -left-2">
                    <Sparkles className="h-6 w-6 text-navy-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
                  </div>
                </div>
              </div>

              {/* Success Message */}
              <h1 className="text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-navy-200 to-navy-100 bg-clip-text text-transparent">
                  Welcome to Premium!
                </span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Your subscription has been activated successfully. You now have access to unlimited premium stories 
                with advanced features and enhanced storytelling.
              </p>

              {/* Premium Features Highlight */}
              <div className="bg-navy-900/30 rounded-xl p-6 mb-8 border border-navy-700/30">
                <h3 className="text-lg font-semibold text-navy-200 mb-4 flex items-center justify-center">
                  <Crown className="h-5 w-5 mr-2" />
                  Your Premium Benefits
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-navy-400 rounded-full mr-3"></div>
                    Unlimited story generation
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-navy-400 rounded-full mr-3"></div>
                    3x longer, detailed stories
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-navy-400 rounded-full mr-3"></div>
                    Advanced character development
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-navy-400 rounded-full mr-3"></div>
                    Priority story generation
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-navy-400 rounded-full mr-3"></div>
                    Multiple plot layers
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-navy-400 rounded-full mr-3"></div>
                    Ad-free experience
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
                <Button
                  size="lg"
                  onClick={() => navigate('/generator')}
                  leftIcon={<Sparkles className="h-5 w-5" />}
                  className="bg-gradient-to-r from-navy-600 to-navy-500 hover:from-navy-500 hover:to-navy-400 shadow-glow"
                >
                  Create Your First Premium Story
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/profile')}
                  className="border-navy-600/50 hover:bg-navy-900/30"
                >
                  View Profile
                </Button>
              </div>

              {/* Additional Info */}
              <div className="mt-8 pt-6 border-t border-navy-800/30">
                <p className="text-sm text-gray-400">
                  {sessionId && (
                    <>
                      Transaction ID: {sessionId.slice(-8)}
                      <br />
                    </>
                  )}
                  You can manage your subscription anytime from your profile page.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Star, BookOpen, MessageCircle, Rocket, Zap, Shield, Heart } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const Home: React.FC = () => {
  return (
    <div className="bg-dark-950 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-navy-gradient opacity-20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-2 h-2 bg-navy-400 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-1 h-1 bg-navy-300 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-navy-500 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-60 right-1/3 w-1 h-1 bg-navy-400 rounded-full animate-pulse" style={{ animationDelay: '3s' }}></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-navy-200 via-navy-100 to-white bg-clip-text text-transparent">
                  Magical Stories for
                </span>
                <br />
                <span className="bg-gradient-to-r from-navy-400 via-navy-300 to-navy-200 bg-clip-text text-transparent">
                  Little Dreamers
                </span>
              </h1>
            </div>
            
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
                Generate personalized, delightful stories for your children in seconds. 
                Let their imagination soar with <span className="text-navy-300 font-semibold">KIDS DREAM</span>!
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-scale-in" style={{ animationDelay: '0.4s' }}>
              <Link to="/generator">
                <Button size="lg" leftIcon={<Sparkles className="h-6 w-6" />} className="text-lg px-8 py-4">
                  Create a Story
                </Button>
              </Link>
              <Link to="/pricing">
                <Button size="lg" variant="outline" className="text-lg px-8 py-4">
                  View Plans
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="mt-16 relative animate-float">
            <div className="relative mx-auto max-w-5xl rounded-2xl shadow-glow-lg overflow-hidden border border-navy-700/30">
              <img 
                src="https://images.pexels.com/photos/256468/pexels-photo-256468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Children reading a storybook" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-950/60 via-transparent to-transparent"></div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-10 -left-10 md:left-0 animate-float">
              <Sparkles className="h-20 w-20 text-navy-400 drop-shadow-glow" />
            </div>
            <div className="absolute -bottom-10 -right-10 md:right-0 animate-float" style={{ animationDelay: '2s' }}>
              <Star className="h-20 w-20 text-navy-300 drop-shadow-glow" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-navy-200 to-navy-100 bg-clip-text text-transparent">
                Inspire Your Child's Imagination
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Our AI-powered story generator creates custom tales based on your child's interests, 
              age, and preferences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group bg-dark-900/50 backdrop-blur-sm p-8 rounded-2xl border border-navy-800/30 hover:border-navy-600/50 transition-all duration-500 hover:shadow-glow hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-navy-600 to-navy-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-navy-100 mb-3">
                Personalized Stories
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Create stories featuring your child's name, favorite settings, and themes they love.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="group bg-dark-900/50 backdrop-blur-sm p-8 rounded-2xl border border-navy-800/30 hover:border-navy-600/50 transition-all duration-500 hover:shadow-glow hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-navy-600 to-navy-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-navy-100 mb-3">
                Age-Appropriate Content
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Stories are tailored to different age groups, ensuring the perfect level of complexity and themes.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="group bg-dark-900/50 backdrop-blur-sm p-8 rounded-2xl border border-navy-800/30 hover:border-navy-600/50 transition-all duration-500 hover:shadow-glow hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-navy-600 to-navy-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-navy-100 mb-3">
                Read Aloud Feature
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Let our app read stories aloud with engaging voices for a magical bedtime experience.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="group bg-dark-900/50 backdrop-blur-sm p-8 rounded-2xl border border-navy-800/30 hover:border-navy-600/50 transition-all duration-500 hover:shadow-glow hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-navy-600 to-navy-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Rocket className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-navy-100 mb-3">
                Unlimited Creativity
              </h3>
              <p className="text-gray-400 leading-relaxed">
                From magical forests to space adventures, the possibilities are endless with our story generator.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="group bg-dark-900/50 backdrop-blur-sm p-8 rounded-2xl border border-navy-800/30 hover:border-navy-600/50 transition-all duration-500 hover:shadow-glow hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-navy-600 to-navy-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-navy-100 mb-3">
                Save & Share
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Save your favorite stories to your library and share them with family and friends.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="group bg-dark-900/50 backdrop-blur-sm p-8 rounded-2xl border border-navy-800/30 hover:border-navy-600/50 transition-all duration-500 hover:shadow-glow hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-navy-600 to-navy-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-navy-100 mb-3">
                Educational Themes
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Choose stories that teach important values and life lessons in an engaging way.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 md:py-32 relative">
        <div className="absolute inset-0 bg-navy-gradient opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-dark-900/50 backdrop-blur-sm rounded-3xl shadow-glow-lg overflow-hidden border border-navy-700/30">
            <div className="md:flex">
              <div className="md:w-1/2 p-12 md:p-16 lg:p-20">
                <h2 className="text-4xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-navy-200 to-navy-100 bg-clip-text text-transparent">
                    Ready to Start Creating?
                  </span>
                </h2>
                <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                  Join thousands of parents who are enriching their children's lives with personalized stories.
                </p>
                <div className="space-y-4 sm:space-y-0 sm:space-x-6 sm:flex">
                  <Link to="/generator">
                    <Button size="lg" leftIcon={<Zap className="h-5 w-5" />}>
                      Start Free
                    </Button>
                  </Link>
                  <Link to="/pricing">
                    <Button size="lg" variant="outline">
                      See Premium Features
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2 relative">
                <img 
                  src="https://images.pexels.com/photos/3755511/pexels-photo-3755511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Child reading a book" 
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-navy-900/40 to-dark-950/60"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-20 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-navy-200 to-navy-100 bg-clip-text text-transparent">
                Loved by Parents and Children
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              See what families are saying about KIDS DREAM stories.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-dark-900/50 backdrop-blur-sm p-8 rounded-2xl border border-navy-800/30 hover:border-navy-600/50 transition-all duration-500 hover:shadow-glow">
              <div className="flex items-center mb-6">
                <div className="flex text-navy-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                "My 5-year-old daughter is absolutely in love with the stories we create together. She asks for a new one every night!"
              </p>
              <div className="flex items-center">
                <div className="mr-4 font-medium text-navy-200">Sarah M.</div>
                <div className="text-sm text-gray-400">Mother of two</div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-dark-900/50 backdrop-blur-sm p-8 rounded-2xl border border-navy-800/30 hover:border-navy-600/50 transition-all duration-500 hover:shadow-glow">
              <div className="flex items-center mb-6">
                <div className="flex text-navy-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                "As a busy parent, I don't always have the energy to create stories from scratch. KIDS DREAM has been a lifesaver for our bedtime routine."
              </p>
              <div className="flex items-center">
                <div className="mr-4 font-medium text-navy-200">James T.</div>
                <div className="text-sm text-gray-400">Father of three</div>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-dark-900/50 backdrop-blur-sm p-8 rounded-2xl border border-navy-800/30 hover:border-navy-600/50 transition-all duration-500 hover:shadow-glow">
              <div className="flex items-center mb-6">
                <div className="flex text-navy-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                "The stories are not only entertaining but also educational. I love how they incorporate values like sharing and kindness in such a natural way."
              </p>
              <div className="flex items-center">
                <div className="mr-4 font-medium text-navy-200">Lisa K.</div>
                <div className="text-sm text-gray-400">Preschool teacher</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
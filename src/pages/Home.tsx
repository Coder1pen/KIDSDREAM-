import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Star, BookOpen, MessageCircle, Rocket } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const Home: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-900 mb-6">
              Magical Stories for Little Dreamers
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8">
              Generate personalized, delightful stories for your children in seconds. 
              Let their imagination soar with KIDS DREAM!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/generator">
                <Button size="lg" leftIcon={<Sparkles className="h-5 w-5" />}>
                  Create a Story
                </Button>
              </Link>
              <Link to="/pricing">
                <Button size="lg" variant="outline">
                  View Plans
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="mt-12 relative">
            <div className="relative mx-auto max-w-4xl rounded-lg shadow-lg overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/256468/pexels-photo-256468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Children reading a storybook" 
                className="w-full h-auto object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-primary-900 opacity-10 rounded-lg"></div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-10 -left-10 md:left-0 animate-float">
              <Sparkles className="h-16 w-16 text-accent-400" />
            </div>
            <div className="absolute -bottom-10 -right-10 md:right-0 animate-float" style={{ animationDelay: '2s' }}>
              <Star className="h-16 w-16 text-secondary-400" />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Inspire Your Child's Imagination
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our AI-powered story generator creates custom tales based on your child's interests, 
              age, and preferences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Personalized Stories
              </h3>
              <p className="text-gray-600">
                Create stories featuring your child's name, favorite settings, and themes they love.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 bg-secondary-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Age-Appropriate Content
              </h3>
              <p className="text-gray-600">
                Stories are tailored to different age groups, ensuring the perfect level of complexity and themes.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mb-4">
                <MessageCircle className="h-6 w-6 text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Read Aloud Feature
              </h3>
              <p className="text-gray-600">
                Let our app read stories aloud with engaging voices for a magical bedtime experience.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 bg-success-100 rounded-lg flex items-center justify-center mb-4">
                <Rocket className="h-6 w-6 text-success-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Unlimited Creativity
              </h3>
              <p className="text-gray-600">
                From magical forests to space adventures, the possibilities are endless with our story generator.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 bg-error-100 rounded-lg flex items-center justify-center mb-4">
                <Star className="h-6 w-6 text-error-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Save & Share
              </h3>
              <p className="text-gray-600">
                Save your favorite stories to your library and share them with family and friends.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <div className="w-12 h-12 bg-warning-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-warning-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Educational Themes
              </h3>
              <p className="text-gray-600">
                Choose stories that teach important values and life lessons in an engaging way.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 p-8 md:p-12 lg:p-16">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Ready to Start Creating?
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Join thousands of parents who are enriching their children's lives with personalized stories.
                </p>
                <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex">
                  <Link to="/generator">
                    <Button size="lg">
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
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-500 opacity-20"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Loved by Parents and Children
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              See what families are saying about KIDS DREAM stories.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="flex text-accent-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "My 5-year-old daughter is absolutely in love with the stories we create together. She asks for a new one every night!"
              </p>
              <div className="flex items-center">
                <div className="mr-4 font-medium text-gray-900">Sarah M.</div>
                <div className="text-sm text-gray-500">Mother of two</div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="flex text-accent-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "As a busy parent, I don't always have the energy to create stories from scratch. KIDS DREAM has been a lifesaver for our bedtime routine."
              </p>
              <div className="flex items-center">
                <div className="mr-4 font-medium text-gray-900">James T.</div>
                <div className="text-sm text-gray-500">Father of three</div>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="flex text-accent-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                "The stories are not only entertaining but also educational. I love how they incorporate values like sharing and kindness in such a natural way."
              </p>
              <div className="flex items-center">
                <div className="mr-4 font-medium text-gray-900">Lisa K.</div>
                <div className="text-sm text-gray-500">Preschool teacher</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
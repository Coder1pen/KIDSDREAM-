import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Star, BookOpen, MessageCircle, Rocket, Zap, Shield, Heart, Crown, Wand2, Scroll, Feather } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const Home: React.FC = () => {
  return (
    <div className="bg-dark-950 text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-2 h-2 bg-navy-400 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-1 h-1 bg-navy-300 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-navy-500 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-60 right-1/3 w-1 h-1 bg-navy-400 rounded-full animate-pulse" style={{ animationDelay: '3s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-navy-300 rounded-full animate-float"></div>
          <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-navy-500 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900/20 via-transparent to-dark-950/40"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-8">
              <div className="animate-fade-in">
                <div className="inline-flex items-center px-4 py-2 bg-navy-900/30 backdrop-blur-sm rounded-full border border-navy-700/50 mb-6">
                  <Sparkles className="h-4 w-4 text-navy-400 mr-2" />
                  <span className="text-navy-300 text-sm font-medium">AI-Powered Story Generation</span>
                </div>
                
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-navy-200 via-navy-100 to-white bg-clip-text text-transparent">
                    Magical Stories
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-navy-400 via-navy-300 to-navy-200 bg-clip-text text-transparent">
                    for Little Dreamers
                  </span>
                </h1>
              </div>
              
              <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-2xl">
                  Create personalized, enchanting stories that spark imagination and bring joy to bedtime. 
                  Our advanced AI crafts unique tales tailored to your child's interests and age.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 animate-scale-in" style={{ animationDelay: '0.4s' }}>
                <Link to="/generator">
                  <Button size="lg" leftIcon={<Wand2 className="h-6 w-6" />} className="text-lg px-8 py-4 shadow-glow-lg">
                    Create Your Story
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button size="lg" variant="outline" leftIcon={<Crown className="h-5 w-5" />} className="text-lg px-8 py-4">
                    Explore Premium
                  </Button>
                </Link>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <div className="text-center">
                  <div className="text-3xl font-bold text-navy-300">10K+</div>
                  <div className="text-sm text-gray-400">Stories Created</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-navy-300">5K+</div>
                  <div className="text-sm text-gray-400">Happy Families</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-navy-300">4.9★</div>
                  <div className="text-sm text-gray-400">Parent Rating</div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Visual */}
            <div className="relative animate-float">
              <div className="relative">
                {/* Main Image */}
                <div className="relative rounded-3xl overflow-hidden shadow-glow-lg border border-navy-700/30">
                  <img 
                    src="https://images.pexels.com/photos/256468/pexels-photo-256468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                    alt="Children reading magical stories" 
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950/60 via-transparent to-transparent"></div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-6 -left-6 bg-dark-900/80 backdrop-blur-sm rounded-2xl p-4 border border-navy-700/50 animate-float">
                  <BookOpen className="h-8 w-8 text-navy-400" />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-dark-900/80 backdrop-blur-sm rounded-2xl p-4 border border-navy-700/50 animate-float" style={{ animationDelay: '1s' }}>
                  <Sparkles className="h-8 w-8 text-navy-300" />
                </div>
                <div className="absolute top-1/2 -right-4 bg-dark-900/80 backdrop-blur-sm rounded-xl p-3 border border-navy-700/50 animate-float" style={{ animationDelay: '2s' }}>
                  <Star className="h-6 w-6 text-navy-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-900 to-dark-950"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-navy-900/30 backdrop-blur-sm rounded-full border border-navy-700/50 mb-6">
              <Rocket className="h-4 w-4 text-navy-400 mr-2" />
              <span className="text-navy-300 text-sm font-medium">Advanced AI Technology</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-navy-200 to-navy-100 bg-clip-text text-transparent">
                Why Parents Choose KIDS DREAM
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Our cutting-edge AI creates personalized stories that adapt to your child's interests, 
              age, and developmental needs, making every story a unique adventure.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group bg-dark-900/50 backdrop-blur-sm p-8 rounded-2xl border border-navy-800/30 hover:border-navy-600/50 transition-all duration-500 hover:shadow-glow hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-navy-600 to-navy-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Wand2 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-navy-100 mb-3">
                AI-Powered Personalization
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Our advanced AI creates unique stories tailored to your child's name, interests, and age group, ensuring every tale feels personally crafted.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="group bg-dark-900/50 backdrop-blur-sm p-8 rounded-2xl border border-navy-800/30 hover:border-navy-600/50 transition-all duration-500 hover:shadow-glow hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-navy-600 to-navy-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Crown className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-navy-100 mb-3">
                Premium Story Quality
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Premium subscribers enjoy longer, more detailed stories with advanced narrative techniques and richer character development.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="group bg-dark-900/50 backdrop-blur-sm p-8 rounded-2xl border border-navy-800/30 hover:border-navy-600/50 transition-all duration-500 hover:shadow-glow hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-navy-600 to-navy-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <MessageCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-navy-100 mb-3">
                Interactive Read-Aloud
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Built-in text-to-speech with child-friendly voices makes bedtime stories magical, even when parents are busy.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="group bg-dark-900/50 backdrop-blur-sm p-8 rounded-2xl border border-navy-800/30 hover:border-navy-600/50 transition-all duration-500 hover:shadow-glow hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-navy-600 to-navy-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-navy-100 mb-3">
                Educational Themes
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Stories incorporate valuable life lessons about friendship, courage, kindness, and problem-solving in age-appropriate ways.
              </p>
            </div>
            
            {/* Feature 5 */}
            <div className="group bg-dark-900/50 backdrop-blur-sm p-8 rounded-2xl border border-navy-800/30 hover:border-navy-600/50 transition-all duration-500 hover:shadow-glow hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-navy-600 to-navy-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-navy-100 mb-3">
                Safe & Secure
              </h3>
              <p className="text-gray-400 leading-relaxed">
                All content is child-safe, with no inappropriate themes. Your family's data is protected with enterprise-grade security.
              </p>
            </div>
            
            {/* Feature 6 */}
            <div className="group bg-dark-900/50 backdrop-blur-sm p-8 rounded-2xl border border-navy-800/30 hover:border-navy-600/50 transition-all duration-500 hover:shadow-glow hover:scale-105">
              <div className="w-16 h-16 bg-gradient-to-br from-navy-600 to-navy-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Scroll className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-navy-100 mb-3">
                Story Library
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Save, organize, and revisit your favorite stories. Build a personal library of magical tales your child will treasure.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Premium Showcase */}
      <section className="py-20 md:py-32 relative">
        <div className="absolute inset-0 bg-navy-gradient opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-dark-900/50 backdrop-blur-sm rounded-3xl shadow-glow-lg overflow-hidden border border-navy-700/30">
            <div className="md:flex">
              <div className="md:w-1/2 p-12 md:p-16 lg:p-20">
                <div className="inline-flex items-center px-4 py-2 bg-navy-600/20 rounded-full border border-navy-500/30 mb-6">
                  <Crown className="h-4 w-4 text-navy-300 mr-2" />
                  <span className="text-navy-300 text-sm font-medium">Premium Experience</span>
                </div>
                
                <h2 className="text-4xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-navy-200 to-navy-100 bg-clip-text text-transparent">
                    Unlock Premium Storytelling
                  </span>
                </h2>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  Premium subscribers enjoy stories that are 3x longer, with complex character development, 
                  multiple plot layers, and sophisticated narrative techniques that grow with your child.
                </p>
                
                <div className="space-y-4 mb-10">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-navy-400 rounded-full mr-4"></div>
                    <span className="text-gray-300">Epic adventures with multiple chapters</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-navy-400 rounded-full mr-4"></div>
                    <span className="text-gray-300">Rich character development and dialogue</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-navy-400 rounded-full mr-4"></div>
                    <span className="text-gray-300">Advanced themes and life lessons</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-navy-400 rounded-full mr-4"></div>
                    <span className="text-gray-300">Unlimited story generation</span>
                  </div>
                </div>
                
                <div className="space-y-4 sm:space-y-0 sm:space-x-6 sm:flex">
                  <Link to="/pricing">
                    <Button size="lg" leftIcon={<Crown className="h-5 w-5" />}>
                      Upgrade to Premium
                    </Button>
                  </Link>
                  <Link to="/generator">
                    <Button size="lg" variant="outline">
                      Try Free Version
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2 relative">
                <img 
                  src="https://images.pexels.com/photos/3755511/pexels-photo-3755511.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Premium storytelling experience" 
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-navy-900/40 to-dark-950/60"></div>
                
                {/* Floating Premium Badge */}
                <div className="absolute top-8 right-8 bg-dark-900/80 backdrop-blur-sm rounded-2xl p-4 border border-navy-500/50">
                  <div className="flex items-center space-x-2">
                    <Crown className="h-6 w-6 text-navy-300" />
                    <span className="text-navy-200 font-semibold">Premium</span>
                  </div>
                </div>
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
            <div className="inline-flex items-center px-4 py-2 bg-navy-900/30 backdrop-blur-sm rounded-full border border-navy-700/50 mb-6">
              <Heart className="h-4 w-4 text-navy-400 mr-2" />
              <span className="text-navy-300 text-sm font-medium">Loved by Families</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-navy-200 to-navy-100 bg-clip-text text-transparent">
                What Parents Are Saying
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Join thousands of families who have made bedtime magical with KIDS DREAM stories.
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
                "The premium stories are absolutely incredible! My daughter is captivated by the detailed adventures, and I'm amazed by how educational they are. Worth every penny!"
              </p>
              <div className="flex items-center">
                <div className="mr-4 font-medium text-navy-200">Sarah M.</div>
                <div className="text-sm text-gray-400">Premium subscriber</div>
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
                "As a busy parent, KIDS DREAM has been a lifesaver. The AI creates such personalized stories that my kids think I wrote them myself. The read-aloud feature is perfect for bedtime!"
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
                "I'm a teacher and I use KIDS DREAM stories in my classroom. The educational themes are perfectly woven into engaging narratives. My students are always excited for story time!"
              </p>
              <div className="flex items-center">
                <div className="mr-4 font-medium text-navy-200">Lisa K.</div>
                <div className="text-sm text-gray-400">Elementary teacher</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 md:py-32 relative">
        <div className="absolute inset-0 bg-navy-gradient opacity-10"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-navy-200 to-navy-100 bg-clip-text text-transparent">
                Start Creating Magic Tonight
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto">
              Join thousands of families who have transformed bedtime into an adventure. 
              Create your first personalized story in minutes.
            </p>
            
            <div className="space-y-4 sm:space-y-0 sm:space-x-6 sm:flex sm:justify-center">
              <Link to="/generator">
                <Button size="lg" leftIcon={<Zap className="h-5 w-5" />} className="shadow-glow-lg">
                  Create Free Story
                </Button>
              </Link>
              <Link to="/pricing">
                <Button size="lg" variant="outline" leftIcon={<Crown className="h-5 w-5" />}>
                  Explore Premium
                </Button>
              </Link>
            </div>
            
            <p className="mt-6 text-sm text-gray-400">
              No credit card required for free stories • Upgrade anytime
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
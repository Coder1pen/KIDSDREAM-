import React from 'react';
import { Github, Code, BookOpen, Users } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const Developers: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Developers
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Join our community of developers and help build the future of children's stories
        </p>
      </div>
      
      {/* GitHub Section */}
      <section className="mb-20">
        <div className="bg-gray-50 rounded-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-8 md:p-12">
              <div className="flex items-center mb-4">
                <Github className="h-8 w-8 text-gray-900 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Open Source</h2>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                KIDS DREAM is built on open source technologies. We believe in transparency and community collaboration.
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-900">Repository</h3>
                  <p className="text-gray-600">
                    Our codebase is available on GitHub. Fork, star, and contribute!
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Issues</h3>
                  <p className="text-gray-600">
                    Found a bug or have a feature request? Open an issue on our GitHub repository.
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Pull Requests</h3>
                  <p className="text-gray-600">
                    We welcome contributions from the community. Submit a PR with your improvements!
                  </p>
                </div>
              </div>
              <div className="mt-8">
                <a 
                  href="https://github.com/kidsdream/story-generator" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-900 hover:bg-gray-800"
                >
                  <Github className="h-5 w-5 mr-2" />
                  View on GitHub
                </a>
              </div>
            </div>
            <div className="md:w-1/2 bg-gray-900 p-8 md:p-12 text-white">
              <h3 className="text-xl font-semibold mb-4">Quick Start</h3>
              <div className="bg-gray-800 rounded-md p-4 font-mono text-sm overflow-x-auto">
                <pre>
{`# Clone the repository
git clone https://github.com/kidsdream/story-generator.git

# Install dependencies
cd story-generator
npm install

# Set up environment variables
cp .env.example .env

# Start the development server
npm run dev`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* API Documentation */}
      <section className="mb-20">
        <div className="flex items-center mb-8">
          <Code className="h-8 w-8 text-primary-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">API Documentation</h2>
        </div>
        
        <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-4">Story Generation API</h3>
            <p className="text-gray-600 mb-6">
              Our API allows you to integrate KIDS DREAM story generation into your own applications.
            </p>
            
            <div className="space-y-8">
              {/* Endpoint Example */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Generate a Story</h4>
                <div className="bg-gray-50 rounded-md p-4">
                  <p className="text-sm font-medium text-gray-700">Endpoint</p>
                  <div className="mt-1 flex items-center bg-gray-100 rounded p-2">
                    <span className="text-purple-600 font-mono">POST</span>
                    <span className="ml-2 font-mono text-gray-800">/api/generate-story</span>
                  </div>
                  
                  <p className="text-sm font-medium text-gray-700 mt-4">Request Body</p>
                  <div className="mt-1 bg-gray-100 rounded p-2 font-mono text-sm overflow-x-auto">
                    <pre>
{`{
  "main_character": "Lily the Unicorn",
  "age_group": "3-5",
  "setting": "Enchanted Forest",
  "theme": "friendship",
  "additional_details": "Include a talking rabbit"
}`}
                    </pre>
                  </div>
                  
                  <p className="text-sm font-medium text-gray-700 mt-4">Response</p>
                  <div className="mt-1 bg-gray-100 rounded p-2 font-mono text-sm overflow-x-auto">
                    <pre>
{`{
  "id": "story_123",
  "title": "Lily the Unicorn's Friendship Adventure",
  "content": "Once upon a time in the Enchanted Forest...",
  "created_at": "2023-06-15T12:34:56Z"
}`}
                    </pre>
                  </div>
                </div>
              </div>
              
              {/* Authentication */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Authentication</h4>
                <p className="text-gray-600 mb-4">
                  All API requests require authentication using an API key.
                </p>
                <div className="bg-gray-50 rounded-md p-4 font-mono text-sm">
                  <pre>
{`// Example using fetch
fetch('https://api.kidsdream.app/generate-story', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_API_KEY'
  },
  body: JSON.stringify({
    main_character: "Lily the Unicorn",
    age_group: "3-5",
    setting: "Enchanted Forest",
    theme: "friendship"
  })
})`}
                  </pre>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <Button>
                View Full API Documentation
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Community */}
      <section>
        <div className="flex items-center mb-8">
          <Users className="h-8 w-8 text-primary-600 mr-3" />
          <h2 className="text-2xl font-bold text-gray-900">Join Our Community</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold mb-3">Discord</h3>
            <p className="text-gray-600 mb-4">
              Chat with other developers, get help, and share your projects.
            </p>
            <Button variant="outline">Join Discord</Button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold mb-3">Contributing Guide</h3>
            <p className="text-gray-600 mb-4">
              Learn how to contribute to the project and get your PRs accepted.
            </p>
            <Button variant="outline">Read Guide</Button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold mb-3">Developer Newsletter</h3>
            <p className="text-gray-600 mb-4">
              Stay updated on new features, API changes, and community projects.
            </p>
            <Button variant="outline">Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  );
};
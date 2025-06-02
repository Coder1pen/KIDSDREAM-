# KIDS DREAM - Magical Story Generator

KIDS DREAM is an interactive children's story generator that creates personalized, engaging stories based on user input. With features like customizable characters, settings, and themes, KIDS DREAM brings storytelling to life for children of all ages.

## Features

- **Personalized Story Generation**: Create unique stories based on character names, settings, themes, and age groups
- **User Authentication**: Secure account creation and login functionality
- **Subscription System**: Free and premium tiers with Stripe payment integration
- **Story Management**: Save, favorite, share, and download generated stories
- **Text-to-Speech**: Listen to stories with built-in narration feature
- **Responsive Design**: Beautiful user interface that works on all devices

## Tech Stack

- **Frontend**: React with TypeScript, Tailwind CSS
- **State Management**: Zustand
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **Payments**: Stripe
- **Routing**: React Router
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Supabase account
- Stripe account (for payment processing)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/kids-dream.git
cd kids-dream
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

4. Start the development server
```bash
npm run dev
```

## Project Structure

```
kids-dream/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── layout/      # Layout components (Header, Footer)
│   │   ├── story/       # Story-related components
│   │   ├── subscription/ # Subscription-related components
│   │   └── ui/          # Basic UI components (Button, Card, etc.)
│   ├── lib/             # Utility functions and API clients
│   ├── pages/           # Page components
│   │   └── auth/        # Authentication pages
│   ├── store/           # Zustand state management
│   ├── types/           # TypeScript type definitions
│   ├── App.tsx          # Main App component with routing
│   └── main.tsx         # Entry point
├── .env                 # Environment variables (not committed to git)
└── README.md            # Project documentation
```

## Database Schema

The application uses Supabase with the following tables:

### profiles
- `id` (uuid, primary key)
- `email` (text)
- `subscription_tier` (text, default: 'free')
- `created_at` (timestamp)
- `stories_generated` (integer)
- `stories_remaining` (integer)

### stories
- `id` (uuid, primary key)
- `title` (text)
- `content` (text)
- `user_id` (uuid, foreign key)
- `created_at` (timestamp)
- `is_favorite` (boolean)
- `theme` (text)
- `age_group` (text)
- `main_character` (text)
- `setting` (text)

### subscription_tiers
- `id` (text, primary key)
- `name` (text)
- `price` (numeric)
- `features` (text[])
- `stories_per_month` (integer)
- `is_premium` (boolean)

## API Documentation

### Story Generation

```typescript
POST /api/generate-story

// Request
{
  main_character: string;
  age_group: string;
  setting: string;
  theme: string;
  additional_details?: string;
}

// Response
{
  id: string;
  title: string;
  content: string;
  created_at: string;
}
```

### Subscription Management

```typescript
POST /api/create-checkout-session

// Request
{
  priceId: string;
  userId: string;
}

// Response
{
  sessionId: string;
  url: string;
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Development Guidelines

### Code Style

- Use TypeScript for type safety
- Follow React best practices and hooks guidelines
- Use Tailwind CSS for styling
- Write meaningful commit messages
- Add comments for complex logic
- Keep components small and focused
- Use proper error handling
- Follow the existing project structure

### Testing

- Write unit tests for utility functions
- Add component tests for critical UI elements
- Test edge cases and error scenarios
- Ensure responsive design works on all devices
- Test subscription flows with Stripe test keys

### Security

- Never commit sensitive information
- Use environment variables for secrets
- Implement proper authentication checks
- Validate user input
- Follow security best practices
- Keep dependencies updated

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.

## Acknowledgments

- [Supabase](https://supabase.io/) for authentication and database
- [Stripe](https://stripe.com/) for payment processing
- [Lucide Icons](https://lucide.dev/) for beautiful icons
- [Tailwind CSS](https://tailwindcss.com/) for styling
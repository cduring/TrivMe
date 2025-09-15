# TrivMe 🎯

A modern, interactive trivia game platform built with React and Supabase. Create, join, and play custom trivia games with friends!

## ✨ Features

- **🎮 Game Creation**: Build custom trivia games with your own questions
- **👥 Multiplayer Support**: Join games with friends using session IDs
- **🔐 User Authentication**: Secure login/signup with Supabase Auth
- **🎨 Modern UI**: Beautiful, responsive design with Tailwind CSS
- **⚡ Real-time Updates**: Live game state management
- **📱 Mobile Friendly**: Optimized for all device sizes

## 🚀 Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS
- **Backend**: Supabase (Database, Auth, Real-time)
- **State Management**: TanStack Query (React Query)
- **Forms**: React Hook Form
- **Routing**: React Router v6
- **Icons**: React Icons
- **Notifications**: React Hot Toast

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd TrivMe
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:

   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🗄️ Database Setup

### Supabase Tables

1. **games** - Stores game information
   - `id` (uuid, primary key)
   - `title` (text)
   - `description` (text)
   - `game_type` (text)
   - `is_private` (boolean)
   - `owner_id` (uuid, foreign key to auth.users)
   - `created_at` (timestamp)

2. **questions** - Stores trivia questions
   - `id` (uuid, primary key)
   - `game_id` (uuid, foreign key to games)
   - `question` (text)
   - `options` (jsonb array)
   - `correct_answer` (integer)
   - `created_at` (timestamp)

### Row Level Security (RLS) Policies

Make sure to enable RLS on your tables and create appropriate policies:

```sql
-- Enable RLS
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;

-- Games policies
CREATE POLICY "Enable insert for authenticated users only" ON games
FOR INSERT TO authenticated
WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Enable read access for all users" ON games
FOR SELECT TO authenticated
USING (true);

-- Questions policies
CREATE POLICY "Enable insert for game owners" ON questions
FOR INSERT TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM games
    WHERE games.id = questions.game_id
    AND games.owner_id = auth.uid()
  )
);
```

## 🎯 Usage

### Creating a Game

1. Sign up or log in to your account
2. Click "Create TrivMe" to start building a new game
3. Fill in the game details (title, description, privacy settings)
4. Add questions using the Question Builder
5. Share your game with friends!

### Joining a Game

1. Get a game session ID from a friend
2. Navigate to the Join page
3. Enter the session ID to join the game
4. Start playing!

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AuthBar.jsx
│   ├── AuthForm.jsx
│   ├── GameItem.jsx
│   ├── GameList.jsx
│   ├── NavBar.jsx
│   └── ...
├── contexts/           # React contexts
│   └── AuthContext.jsx
├── hooks/              # Custom React hooks
│   ├── useAuth.js
│   └── useGame.js
├── pages/              # Page components
│   ├── Create.jsx
│   ├── Game.jsx
│   ├── Home.jsx
│   ├── Join.jsx
│   ├── Login.jsx
│   └── ...
├── services/           # API and external services
│   ├── apiAuth.js
│   ├── apiGames.js
│   ├── apiQuestions.js
│   └── supabase.js
└── App.jsx            # Main app component
```

## 🔧 Configuration

### Supabase Setup

1. Create a new Supabase project
2. Set up your database tables (see Database Setup section)
3. Configure authentication settings
4. Update your environment variables

### Tailwind CSS

The project uses Tailwind CSS v4 with custom configuration. The main styles are in `src/index.css`.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🐛 Troubleshooting

### Common Issues

**RLS Policy Violations**

- Ensure your Supabase RLS policies are correctly configured
- Check that user authentication is working properly
- Verify that the `owner_id` field matches the authenticated user's ID

**Authentication Issues**

- Make sure your Supabase URL and API keys are correct
- Check that the user is properly authenticated before making database calls

**Build Issues**

- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check that all environment variables are set correctly

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub or contact the development team.

---

**Happy Trivia Gaming! 🎉**

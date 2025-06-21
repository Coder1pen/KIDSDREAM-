import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Home } from './pages/Home';
import { Generator } from './pages/Generator';
import { Stories } from './pages/Stories';
import { StoryDetail } from './pages/StoryDetail';
import { Pricing } from './pages/Pricing';
import { Profile } from './pages/Profile';
import { SignIn } from './pages/auth/SignIn';
import { SignUp } from './pages/auth/SignUp';
import { Developers } from './pages/Developers';
import { useAuthStore } from './store/useAuthStore';

function App() {
  const { loadUser } = useAuthStore();
  
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/generator" element={<Generator />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/story/:id" element={<StoryDetail />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/developers" element={<Developers />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
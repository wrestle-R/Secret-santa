import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import LandingPage from './pages/Landing';
import CreateGroupPage from './pages/CreateGroup';
import SharePage from './pages/Share';
import RevealPage from './pages/Reveal';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-background font-sans antialiased relative">
          <Navbar />
          <main className="pt-24 pb-8">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/create" element={<CreateGroupPage />} />
              <Route path="/share/:groupId" element={<SharePage />} />
              <Route path="/reveal/:assignmentId" element={<RevealPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;

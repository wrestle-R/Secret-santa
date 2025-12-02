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
        <div className="min-h-screen" style={{ backgroundColor: 'oklch(var(--background))' }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/create" element={<CreateGroupPage />} />
            <Route path="/share/:groupId" element={<SharePage />} />
            <Route path="/reveal/:groupId/:participantIndex" element={<RevealPage />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;

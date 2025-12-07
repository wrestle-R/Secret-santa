import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Gift, Sparkles, PartyPopper, Eye, EyeOff } from 'lucide-react';
import ElectricBorder from '../components/ElectricBorder';

const RevealPage = () => {
  const { encodedData } = useParams();
  const navigate = useNavigate();
  const [groupData, setGroupData] = useState(null);
  const [assignment, setAssignment] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (!encodedData) {
      navigate('/');
      return;
    }

    try {
      // Decode the assignment data from the URL
      const decoded = JSON.parse(decodeURIComponent(atob(encodedData)));
      setGroupData({ groupName: decoded.gn });
      setAssignment({ giver: decoded.g, receiver: decoded.r });
    } catch (e) {
      console.error("Failed to decode URL", e);
      navigate('/');
    }
  }, [encodedData, navigate]);

  const handleReveal = () => {
    setRevealed(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  if (!groupData || !assignment) {
    return (
      <div className="min-h-screen pt-32 flex items-center justify-center" style={{ backgroundColor: 'oklch(var(--background))' }}>
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full" style={{ borderColor: 'oklch(var(--primary))', borderTopColor: 'transparent' }}></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 relative overflow-hidden" style={{ backgroundColor: 'oklch(var(--background))' }}>
      {/* Confetti Effect */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: Math.random() * window.innerWidth, 
                  y: -20,
                  rotate: 0,
                  opacity: 1
                }}
                animate={{ 
                  y: window.innerHeight + 20,
                  rotate: Math.random() * 360,
                  opacity: 0
                }}
                transition={{ 
                  duration: 2 + Math.random() * 2,
                  ease: "linear"
                }}
                className="absolute w-3 h-3 rounded-full"
                style={{ 
                  backgroundColor: ['oklch(var(--primary))', 'oklch(var(--secondary))', 'oklch(var(--accent))'][Math.floor(Math.random() * 3)]
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="inline-block mb-4"
            >
              <Gift 
                className="w-20 h-20 mx-auto" 
                style={{ color: 'oklch(var(--primary))' }}
              />
            </motion.div>
            
            <h1 
              className="text-3xl md:text-4xl font-bold mb-4 tracking-wide"
              style={{ color: 'oklch(var(--foreground))' }}
            >
              {groupData.groupName}
            </h1>
            
            <p 
              className="text-xl tracking-wide"
              style={{ color: 'oklch(var(--muted-foreground))' }}
            >
              Hello, <span style={{ color: 'oklch(var(--primary))' }} className="font-bold">{assignment.giver}</span>! 👋
            </p>
          </div>

          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="p-8 md:p-12 rounded-3xl"
            style={{
              backgroundColor: 'oklch(var(--card))',
              border: '2px solid oklch(var(--border))',
              boxShadow: 'var(--shadow-2xl)'
            }}
          >
            {!revealed ? (
              <div className="text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 15 }}
                  className="mb-8"
                >
                  <div 
                    className="w-24 h-24 mx-auto rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'oklch(var(--primary) / 0.1)' }}
                  >
                    <EyeOff 
                      className="w-12 h-12" 
                      style={{ color: 'oklch(var(--primary))' }}
                    />
                  </div>
                </motion.div>

                <h2 
                  className="text-2xl md:text-3xl font-bold mb-4 tracking-wide"
                  style={{ color: 'oklch(var(--foreground))' }}
                >
                  Ready to discover your Secret Santa match?
                </h2>
                
                <p 
                  className="text-lg mb-8 tracking-wide"
                  style={{ color: 'oklch(var(--muted-foreground))' }}
                >
                  Click the button below to reveal who you'll be gifting to! 🎁
                </p>

                <motion.button
                  onClick={handleReveal}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-10 py-4 rounded-full text-lg font-bold tracking-wide inline-flex items-center gap-2"
                  style={{
                    backgroundColor: 'oklch(var(--primary))',
                    color: 'oklch(var(--primary-foreground))',
                    boxShadow: 'var(--shadow-xl)'
                  }}
                >
                  <Eye className="w-6 h-6" />
                  Reveal My Match
                </motion.button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                  className="mb-8"
                >
                  <div 
                    className="w-32 h-32 mx-auto rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'oklch(var(--primary) / 0.1)' }}
                  >
                    <PartyPopper 
                      className="w-16 h-16" 
                      style={{ color: 'oklch(var(--primary))' }}
                    />
                  </div>
                </motion.div>

                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl mb-4 tracking-wide"
                  style={{ color: 'oklch(var(--muted-foreground))' }}
                >
                  You're Secret Santa for...
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 15 }}
                  className="mb-8 inline-block"
                >
                  <ElectricBorder color="oklch(var(--accent))" speed={2} chaos={0.5}>
                    <div 
                      className="inline-block px-12 py-6 rounded-2xl relative z-10"
                      style={{
                        backgroundColor: 'oklch(var(--primary))',
                        boxShadow: 'var(--shadow-xl)'
                      }}
                    >
                      <h3 
                        className="text-4xl md:text-5xl font-bold tracking-wide"
                        style={{ color: 'oklch(var(--primary-foreground))' }}
                      >
                        {assignment.receiver}
                      </h3>
                    </div>
                  </ElectricBorder>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="flex items-center justify-center gap-2 mb-6"
                >
                  <Sparkles 
                    className="w-6 h-6" 
                    style={{ color: 'oklch(var(--accent))' }}
                  />
                  <p 
                    className="text-lg tracking-wide"
                    style={{ color: 'oklch(var(--foreground))' }}
                  >
                    Time to find the perfect gift!
                  </p>
                  <Sparkles 
                    className="w-6 h-6" 
                    style={{ color: 'oklch(var(--accent))' }}
                  />
                </motion.div>

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  onClick={() => navigate('/create')}
                  className="mt-4 text-sm underline opacity-70 hover:opacity-100 transition-opacity"
                  style={{ color: 'oklch(var(--muted-foreground))' }}
                >
                  Create your own Secret Santa group
                </motion.button>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="p-4 rounded-xl"
                  style={{
                    backgroundColor: 'oklch(var(--muted) / 0.5)',
                    border: '1px solid oklch(var(--border))'
                  }}
                >
                  <p 
                    className="text-sm tracking-wide"
                    style={{ color: 'oklch(var(--muted-foreground))' }}
                  >
                    🤫 Remember: Keep it secret! Don't tell anyone who you're gifting to.
                  </p>
                </motion.div>
              </motion.div>
            )}
          </motion.div>

          {/* Additional Info */}
          {revealed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="mt-8 text-center"
            >
              <motion.button
                onClick={() => navigate('/')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-full font-medium tracking-wide"
                style={{
                  backgroundColor: 'oklch(var(--muted))',
                  color: 'oklch(var(--foreground))',
                  border: '1px solid oklch(var(--border))'
                }}
              >
                Back to Home
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default RevealPage;

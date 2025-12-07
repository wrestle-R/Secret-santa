import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Snowfall from 'react-snowfall';
import { useContext, useMemo } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const LandingPage = () => {
  const navigate = useNavigate();
  const { isDark } = useContext(ThemeContext);

  const snowflakeImages = useMemo(() => {
    const snowflake1 = document.createElement('img');
    snowflake1.src = '/Snowflake.png';
    return [snowflake1];
  }, []);

  const features = [
    {
      title: "Create Groups",
      description: "Add your group name and all participants"
    },
    {
      title: "Generate QR Codes",
      description: "Unique QR codes for each participant"
    },
    {
      title: "Secret Reveal",
      description: "Each person scans to discover their match"
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 relative overflow-hidden" style={{ backgroundColor: 'oklch(var(--background))' }}>
      <Snowfall 
        snowflakeCount={50}
        images={snowflakeImages}
        radius={[10, 30]}
      />
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
            className="mb-6"
          />
          
          <h1 
            className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 tracking-wide"
            style={{ color: 'oklch(var(--foreground))' }}
          >
            Secret Santa
          </h1>
          
          <p 
            className="text-lg sm:text-xl md:text-2xl mb-8 max-w-2xl mx-auto tracking-wide px-2"
            style={{ color: 'oklch(var(--muted-foreground))' }}
          >
            Organize your gift exchange with ease. Create groups, generate QR codes, and let the magic happen!
          </p>

          <motion.button
            onClick={() => navigate('/create')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold tracking-wide inline-flex items-center gap-2"
            style={{
              backgroundColor: 'oklch(var(--primary))',
              color: 'oklch(var(--primary-foreground))',
              boxShadow: 'var(--shadow-lg)'
            }}
          >
            Create Your Group
          </motion.button>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="p-6 sm:p-8 rounded-2xl text-center"
              style={{
                backgroundColor: 'oklch(var(--card))',
                border: '1px solid oklch(var(--border))',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              <div 
                className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                style={{ backgroundColor: 'oklch(var(--primary) / 0.1)' }}
              />
              <h3 
                className="text-lg sm:text-xl font-bold mb-2 tracking-wide"
                style={{ color: 'oklch(var(--foreground))' }}
              >
                {feature.title}
              </h3>
              <p 
                className="text-sm sm:text-base tracking-wide"
                style={{ color: 'oklch(var(--muted-foreground))' }}
              >
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* How It Works Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-16 sm:mt-20 text-center"
        >
          <h2 
            className="text-3xl sm:text-4xl font-bold mb-10 sm:mb-12 tracking-wide"
            style={{ color: 'oklch(var(--foreground))' }}
          >
            How It Works
          </h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {[
              { step: "1", text: "Create a group with a name" },
              { step: "2", text: "Add all participant names" },
              { step: "3", text: "Generate QR codes" },
              { step: "4", text: "Share & reveal matches" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.4 }}
                className="relative"
              >
                <div 
                  className="w-12 sm:w-16 h-12 sm:h-16 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center text-xl sm:text-2xl font-bold"
                  style={{
                    backgroundColor: 'oklch(var(--primary))',
                    color: 'oklch(var(--primary-foreground))'
                  }}
                >
                  {item.step}
                </div>
                <p 
                  className="text-xs sm:text-sm tracking-wide"
                  style={{ color: 'oklch(var(--muted-foreground))' }}
                >
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default LandingPage;

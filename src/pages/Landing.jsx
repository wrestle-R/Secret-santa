import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Gift, Users, QrCode, Sparkles } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Create Groups",
      description: "Add your group name and all participants"
    },
    {
      icon: <QrCode className="w-8 h-8" />,
      title: "Generate QR Codes",
      description: "Unique QR codes for each participant"
    },
    {
      icon: <Gift className="w-8 h-8" />,
      title: "Secret Reveal",
      description: "Each person scans to discover their match"
    }
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 px-6" style={{ backgroundColor: 'oklch(var(--background))' }}>
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
            className="inline-block mb-6"
          >
            <Gift 
              className="w-24 h-24 mx-auto" 
              style={{ color: 'oklch(var(--primary))' }}
            />
          </motion.div>
          
          <h1 
            className="text-6xl md:text-7xl font-bold mb-6 tracking-wide"
            style={{ color: 'oklch(var(--foreground))' }}
          >
            Secret Santa 🎅
          </h1>
          
          <p 
            className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto tracking-wide"
            style={{ color: 'oklch(var(--muted-foreground))' }}
          >
            Organize your gift exchange with ease. Create groups, generate QR codes, and let the magic happen!
          </p>

          <motion.button
            onClick={() => navigate('/create')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full text-lg font-semibold tracking-wide inline-flex items-center gap-2"
            style={{
              backgroundColor: 'oklch(var(--primary))',
              color: 'oklch(var(--primary-foreground))',
              boxShadow: 'var(--shadow-lg)'
            }}
          >
            <Sparkles className="w-5 h-5" />
            Create Your Group
          </motion.button>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="p-8 rounded-2xl text-center"
              style={{
                backgroundColor: 'oklch(var(--card))',
                border: '1px solid oklch(var(--border))',
                boxShadow: 'var(--shadow-md)'
              }}
            >
              <div 
                className="inline-flex p-4 rounded-full mb-4"
                style={{ backgroundColor: 'oklch(var(--primary) / 0.1)' }}
              >
                <span style={{ color: 'oklch(var(--primary))' }}>
                  {feature.icon}
                </span>
              </div>
              <h3 
                className="text-xl font-bold mb-2 tracking-wide"
                style={{ color: 'oklch(var(--foreground))' }}
              >
                {feature.title}
              </h3>
              <p 
                className="tracking-wide"
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
          className="mt-20 text-center"
        >
          <h2 
            className="text-4xl font-bold mb-12 tracking-wide"
            style={{ color: 'oklch(var(--foreground))' }}
          >
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
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
                  className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold"
                  style={{
                    backgroundColor: 'oklch(var(--primary))',
                    color: 'oklch(var(--primary-foreground))'
                  }}
                >
                  {item.step}
                </div>
                <p 
                  className="tracking-wide"
                  style={{ color: 'oklch(var(--muted-foreground))' }}
                >
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="mt-20 text-center"
        >
          <div 
            className="p-12 rounded-3xl max-w-3xl mx-auto"
            style={{
              backgroundColor: 'oklch(var(--card))',
              border: '1px solid oklch(var(--border))',
              boxShadow: 'var(--shadow-xl)'
            }}
          >
            <h3 
              className="text-3xl font-bold mb-4 tracking-wide"
              style={{ color: 'oklch(var(--foreground))' }}
            >
              Ready to spread the joy?
            </h3>
            <p 
              className="text-lg mb-8 tracking-wide"
              style={{ color: 'oklch(var(--muted-foreground))' }}
            >
              Start organizing your Secret Santa gift exchange now!
            </p>
            <motion.button
              onClick={() => navigate('/create')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full text-lg font-semibold tracking-wide"
              style={{
                backgroundColor: 'oklch(var(--primary))',
                color: 'oklch(var(--primary-foreground))',
                boxShadow: 'var(--shadow-lg)'
              }}
            >
              Get Started
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;

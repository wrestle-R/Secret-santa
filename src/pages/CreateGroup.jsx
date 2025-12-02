import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Plus, X, Users, Sparkles, ArrowRight } from 'lucide-react';

const CreateGroupPage = () => {
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState('');
  const [participants, setParticipants] = useState(['', '']);
  const [error, setError] = useState('');

  const addParticipant = () => {
    setParticipants([...participants, '']);
  };

  const removeParticipant = (index) => {
    if (participants.length > 2) {
      setParticipants(participants.filter((_, i) => i !== index));
    }
  };

  const updateParticipant = (index, value) => {
    const newParticipants = [...participants];
    newParticipants[index] = value;
    setParticipants(newParticipants);
  };

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const createSecretSantaAssignments = (names) => {
    let assignments = [];
    let isValid = false;

    // Keep trying until we get a valid assignment where no one gets themselves
    while (!isValid) {
      const shuffled = shuffleArray(names);
      isValid = true;
      
      for (let i = 0; i < names.length; i++) {
        if (names[i] === shuffled[i]) {
          isValid = false;
          break;
        }
      }
      
      if (isValid) {
        assignments = names.map((giver, index) => ({
          giver,
          receiver: shuffled[index]
        }));
      }
    }
    
    return assignments;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!groupName.trim()) {
      setError('Please enter a group name');
      return;
    }

    const validParticipants = participants.filter(p => p.trim() !== '');
    
    if (validParticipants.length < 2) {
      setError('You need at least 2 participants');
      return;
    }

    // Check for duplicate names
    const uniqueNames = new Set(validParticipants.map(p => p.trim().toLowerCase()));
    if (uniqueNames.size !== validParticipants.length) {
      setError('All participant names must be unique');
      return;
    }

    // Create assignments
    const assignments = createSecretSantaAssignments(validParticipants.map(p => p.trim()));

    // Store in localStorage and navigate to share page
    const groupData = {
      groupName: groupName.trim(),
      participants: validParticipants.map(p => p.trim()),
      assignments,
      createdAt: new Date().toISOString(),
      groupId: Date.now().toString()
    };

    localStorage.setItem(`secretsanta_${groupData.groupId}`, JSON.stringify(groupData));
    navigate(`/share/${groupData.groupId}`);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6" style={{ backgroundColor: 'oklch(var(--background))' }}>
      <div className="max-w-3xl mx-auto">
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
              <Users 
                className="w-16 h-16 mx-auto" 
                style={{ color: 'oklch(var(--primary))' }}
              />
            </motion.div>
            
            <h1 
              className="text-4xl md:text-5xl font-bold mb-4 tracking-wide"
              style={{ color: 'oklch(var(--foreground))' }}
            >
              Create Secret Santa Group
            </h1>
            
            <p 
              className="text-lg tracking-wide"
              style={{ color: 'oklch(var(--muted-foreground))' }}
            >
              Set up your group and add participants
            </p>
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="p-8 rounded-3xl"
            style={{
              backgroundColor: 'oklch(var(--card))',
              border: '1px solid oklch(var(--border))',
              boxShadow: 'var(--shadow-xl)'
            }}
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Group Name */}
              <div>
                <label 
                  className="block text-sm font-semibold mb-2 tracking-wide"
                  style={{ color: 'oklch(var(--foreground))' }}
                >
                  Group Name
                </label>
                <input
                  type="text"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  placeholder="e.g., Office Secret Santa 2024"
                  className="w-full px-4 py-3 rounded-xl tracking-wide outline-none focus:ring-2 transition-all"
                  style={{
                    backgroundColor: 'oklch(var(--input))',
                    color: 'oklch(var(--foreground))',
                    border: '1px solid oklch(var(--border))',
                    '--tw-ring-color': 'oklch(var(--ring))'
                  }}
                />
              </div>

              {/* Participants */}
              <div>
                <label 
                  className="block text-sm font-semibold mb-4 tracking-wide"
                  style={{ color: 'oklch(var(--foreground))' }}
                >
                  Participants (minimum 2)
                </label>
                
                <div className="space-y-3">
                  <AnimatePresence>
                    {participants.map((participant, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.2 }}
                        className="flex gap-2"
                      >
                        <input
                          type="text"
                          value={participant}
                          onChange={(e) => updateParticipant(index, e.target.value)}
                          placeholder={`Participant ${index + 1}`}
                          className="flex-1 px-4 py-3 rounded-xl tracking-wide outline-none focus:ring-2 transition-all"
                          style={{
                            backgroundColor: 'oklch(var(--input))',
                            color: 'oklch(var(--foreground))',
                            border: '1px solid oklch(var(--border))',
                            '--tw-ring-color': 'oklch(var(--ring))'
                          }}
                        />
                        {participants.length > 2 && (
                          <motion.button
                            type="button"
                            onClick={() => removeParticipant(index)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="p-3 rounded-xl"
                            style={{
                              backgroundColor: 'oklch(var(--destructive) / 0.1)',
                              color: 'oklch(var(--destructive))'
                            }}
                          >
                            <X className="w-5 h-5" />
                          </motion.button>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <motion.button
                  type="button"
                  onClick={addParticipant}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="mt-4 w-full py-3 rounded-xl font-medium tracking-wide inline-flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: 'oklch(var(--secondary))',
                    color: 'oklch(var(--secondary-foreground))',
                    border: '1px solid oklch(var(--border))'
                  }}
                >
                  <Plus className="w-5 h-5" />
                  Add Participant
                </motion.button>
              </div>

              {/* Error Message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-4 rounded-xl"
                    style={{
                      backgroundColor: 'oklch(var(--destructive) / 0.1)',
                      color: 'oklch(var(--destructive))',
                      border: '1px solid oklch(var(--destructive) / 0.3)'
                    }}
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl text-lg font-semibold tracking-wide inline-flex items-center justify-center gap-2"
                style={{
                  backgroundColor: 'oklch(var(--primary))',
                  color: 'oklch(var(--primary-foreground))',
                  boxShadow: 'var(--shadow-lg)'
                }}
              >
                <Sparkles className="w-5 h-5" />
                Generate QR Codes
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </form>
          </motion.div>

          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-8 p-6 rounded-2xl"
            style={{
              backgroundColor: 'oklch(var(--muted) / 0.5)',
              border: '1px solid oklch(var(--border))'
            }}
          >
            <p 
              className="text-sm tracking-wide"
              style={{ color: 'oklch(var(--muted-foreground))' }}
            >
              💡 <strong>Tip:</strong> After creating the group, you'll get unique QR codes for each participant. 
              They can scan their code to reveal who they're giving a gift to!
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateGroupPage;

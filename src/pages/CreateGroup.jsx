import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Plus, X, ArrowRight, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/card';
import { db } from '../config/firebase';
import { collection, addDoc, writeBatch, doc } from 'firebase/firestore';

const CreateGroupPage = () => {
  const navigate = useNavigate();
  const [groupName, setGroupName] = useState('');
  const [participants, setParticipants] = useState(['', '']);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
        assignments = names.map((name, index) => ({
          giver: name,
          receiver: shuffled[index]
        }));
      }
    }
    return assignments;
  };

  const handleSubmit = async () => {
    if (!groupName.trim()) {
      setError('Please enter a group name');
      return;
    }

    const validParticipants = participants.filter(p => p.trim() !== '');
    if (validParticipants.length < 3) {
      setError('You need at least 3 participants for Secret Santa');
      return;
    }

    // Check for duplicate names
    const uniqueParticipants = new Set(validParticipants.map(p => p.trim()));
    if (uniqueParticipants.size !== validParticipants.length) {
      setError('Participant names must be unique. Please remove duplicates.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const assignments = createSecretSantaAssignments(validParticipants);
      
      // Create group in Firestore
      const groupRef = await addDoc(collection(db, 'groups'), {
        name: groupName,
        createdAt: new Date()
      });

      // Create assignments in Firestore
      const batch = writeBatch(db);
      
      assignments.forEach(assignment => {
        const assignmentRef = doc(collection(db, 'assignments'));
        batch.set(assignmentRef, {
          groupId: groupRef.id,
          groupName: groupName,
          giver: assignment.giver,
          receiver: assignment.receiver,
          createdAt: new Date()
        });
      });

      await batch.commit();

      navigate(`/share/${groupRef.id}`);
    } catch (err) {
      console.error("Error creating group: ", err);
      // Check for common Firebase errors
      if (err.code === 'permission-denied') {
        setError("Permission denied. Please check your Firestore security rules.");
      } else if (err.code === 'unavailable') {
        setError("Network error. Please check your internet connection.");
      } else {
        setError(`Failed to create group: ${err.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-3.5rem)] py-12 px-4 sm:px-6 lg:px-8 bg-background text-foreground flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <Card className="border-border/50 shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Create Group</CardTitle>
            <CardDescription className="text-center">
              Enter your group details to get started.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="groupName">Group Name</Label>
              <Input
                id="groupName"
                placeholder="e.g. Office Party 2025"
                value={groupName}
                onChange={(e) => {
                  setGroupName(e.target.value);
                  setError('');
                }}
                className="text-lg"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Participants</Label>
                <span className="text-xs text-muted-foreground">Min. 3 people</span>
              </div>
              
              <AnimatePresence>
                {participants.map((participant, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex gap-2"
                  >
                    <Input
                      placeholder={`Participant ${index + 1}`}
                      value={participant}
                      onChange={(e) => updateParticipant(index, e.target.value)}
                    />
                    {participants.length > 2 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeParticipant(index)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              <Button
                variant="outline"
                onClick={addParticipant}
                className="w-full border-dashed"
              >
                <Plus className="mr-2 h-4 w-4" /> Add Participant
              </Button>
            </div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-destructive text-center font-medium"
              >
                {error}
              </motion.p>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full text-lg h-12" 
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <span className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent border-white rounded-full"></span>
                  Creating...
                </span>
              ) : (
                <>
                  Create & Generate Links <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default CreateGroupPage;

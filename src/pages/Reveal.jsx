import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { Gift, Eye, EyeOff } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../components/ui/card';

const RevealPage = () => {
  const { encodedData } = useParams();
  const navigate = useNavigate();
  const [groupData, setGroupData] = useState(null);
  const [assignment, setAssignment] = useState(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (!encodedData) {
      navigate('/');
      return;
    }

    try {
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
  };

  if (!groupData || !assignment) {
    return (
      <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center bg-background">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background text-foreground">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <Card className="border-border/50 shadow-2xl overflow-hidden">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
              <Gift className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-2xl">Hello, {assignment.giver}!</CardTitle>
            <CardDescription>
              You are participating in <span className="font-semibold text-foreground">{groupData.groupName}</span>
            </CardDescription>
          </CardHeader>
          
          <CardContent className="text-center py-8">
            <AnimatePresence mode="wait">
              {!revealed ? (
                <motion.div
                  key="hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <p className="text-muted-foreground">
                    Your Secret Santa match is ready to be revealed.
                  </p>
                  <Button 
                    size="lg" 
                    onClick={handleReveal}
                    className="w-full text-lg h-12"
                  >
                    <Eye className="mr-2 h-5 w-5" /> Reveal Match
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="revealed"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="space-y-6"
                >
                  <p className="text-sm text-muted-foreground uppercase tracking-widest">You are gifting to</p>
                  <div className="py-6 bg-muted/30 rounded-lg border border-border/50">
                    <h2 className="text-4xl font-black text-primary tracking-tight">
                      {assignment.receiver}
                    </h2>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Shh! Keep it a secret until the exchange!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
          
          {revealed && (
            <CardFooter>
              <Button 
                variant="ghost" 
                className="w-full"
                onClick={() => setRevealed(false)}
              >
                <EyeOff className="mr-2 h-4 w-4" /> Hide Match
              </Button>
            </CardFooter>
          )}
        </Card>
      </motion.div>
    </div>
  );
};

export default RevealPage;

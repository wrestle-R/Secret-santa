import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { ArrowRight, Users, QrCode, Sparkles } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

const features = [
  {
    icon: <Users className="h-6 w-6" />,
    title: "Smart Matching",
    description: "Automatically generates fair, conflict-free pairings with no self-matches or repeats."
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "Multi-Event Support",
    description: "Create and manage multiple Secret Santa groups for friends, family, or the workplace."
  },
  {
    icon: <QrCode className="h-6 w-6" />,
    title: "Export & Share",
    description: "Easily download participant lists or share access links for seamless coordination."
  }
];

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center pb-12 px-4 sm:px-6 lg:px-8 bg-background text-foreground">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl mx-auto space-y-8"
      >
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight lg:text-7xl">
          Secret Santa 
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
The most IDIOTPROOF way to organize a secret Santa exchange
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button size="lg" onClick={() => navigate('/create')} className="text-lg px-8">
            Start Exchange <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-5xl w-full"
      >
        {features.map((feature, index) => (
          <Card key={index} className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-colors">
            <CardHeader>
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                {feature.icon}
              </div>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                {feature.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </div>
  );
};

export default LandingPage;

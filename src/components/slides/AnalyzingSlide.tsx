import React, { useEffect } from 'react';
import { SlideContainer } from '../SlideContainer';
import { motion } from 'motion/react';
import { Activity } from 'lucide-react';

interface AnalyzingSlideProps {
  onComplete: () => void;
}

export function AnalyzingSlide({ onComplete }: AnalyzingSlideProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <SlideContainer className="bg-gradient-to-br from-zinc-900 to-black text-white flex flex-col items-center justify-center p-8">
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="w-24 h-24 bg-red-600/20 rounded-full flex items-center justify-center mb-8 relative"
      >
        <div className="absolute inset-0 border-4 border-red-600 rounded-full border-t-transparent animate-spin" />
        <Activity className="w-10 h-10 text-red-500" />
      </motion.div>

      <motion.h2 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold mb-3 text-center"
      >
        Analizujemy Twój profil...
      </motion.h2>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-zinc-400 text-sm text-center max-w-xs space-y-2"
      >
        <p>Obliczanie optymalnej dawki</p>
        <p>Dopasowywanie do celów treningowych</p>
        <p>Generowanie spersonalizowanych porad</p>
      </motion.div>
    </SlideContainer>
  );
}

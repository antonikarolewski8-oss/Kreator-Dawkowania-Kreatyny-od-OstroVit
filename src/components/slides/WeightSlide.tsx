import React, { useState, useEffect } from 'react';
import { SlideContainer } from '../SlideContainer';
import { Navigation } from '../Navigation';
import { ProgressBar } from '../ProgressBar';
import { motion } from 'motion/react';
import { Scale } from 'lucide-react';

interface WeightSlideProps {
  weight: number;
  onChange: (weight: number) => void;
  onNext: () => void;
  onPrev: () => void;
  currentStep: number;
  totalSteps: number;
}

export function WeightSlide({ weight, onChange, onNext, onPrev, currentStep, totalSteps }: WeightSlideProps) {
  const [localWeight, setLocalWeight] = useState(weight);

  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(localWeight);
    }, 300);
    return () => clearTimeout(timer);
  }, [localWeight, onChange]);

  return (
    <SlideContainer>
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      
      <div className="p-8 pt-12 flex-1 flex flex-col items-center justify-center overflow-y-auto pb-24">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Scale className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Ile ważysz?</h2>
          <p className="text-gray-500 text-sm">Dawkowanie kreatyny zależy od masy ciała.</p>
        </motion.div>

        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-xs relative"
        >
          <div className="text-6xl font-black text-center text-gray-900 mb-8 tabular-nums">
            {localWeight} <span className="text-2xl text-gray-400 font-medium">kg</span>
          </div>
          
          <input
            type="range"
            min="40"
            max="150"
            step="1"
            value={localWeight}
            onChange={(e) => setLocalWeight(Number(e.target.value))}
            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-600 focus:outline-none focus:ring-4 focus:ring-red-600/20"
          />
          
          <div className="flex justify-between text-xs text-gray-400 font-medium mt-3 px-1">
            <span>40 kg</span>
            <span>150 kg</span>
          </div>
        </motion.div>
      </div>

      <Navigation 
        onNext={onNext} 
        onPrev={onPrev} 
        canGoNext={true} 
      />
    </SlideContainer>
  );
}

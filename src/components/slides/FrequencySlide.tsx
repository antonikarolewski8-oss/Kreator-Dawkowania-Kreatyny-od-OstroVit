import React from 'react';
import { SlideContainer } from '../SlideContainer';
import { Navigation } from '../Navigation';
import { ProgressBar } from '../ProgressBar';
import { Frequency } from '../../types';
import { cn } from '../../utils';
import { motion } from 'motion/react';
import { CalendarDays, CalendarHeart, CalendarClock } from 'lucide-react';

interface FrequencySlideProps {
  selected: Frequency | null;
  onChange: (freq: Frequency) => void;
  onNext: () => void;
  onPrev: () => void;
  currentStep: number;
  totalSteps: number;
}

const FREQUENCIES = [
  { id: 'low', label: '1-2 razy w tygodniu', icon: CalendarHeart, desc: 'Aktywność rekreacyjna' },
  { id: 'medium', label: '3-4 razy w tygodniu', icon: CalendarDays, desc: 'Regularne treningi' },
  { id: 'high', label: '5+ razy w tygodniu', icon: CalendarClock, desc: 'Intensywny reżim treningowy' },
] as const;

export function FrequencySlide({ selected, onChange, onNext, onPrev, currentStep, totalSteps }: FrequencySlideProps) {
  return (
    <SlideContainer>
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      
      <div className="p-8 pt-12 flex-1 flex flex-col overflow-y-auto pb-24">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Jak często trenujesz?</h2>
          <p className="text-gray-500 text-sm mb-8">Wpływa to na zapotrzebowanie organizmu na regenerację.</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4">
          {FREQUENCIES.map((freq, index) => {
            const isSelected = selected === freq.id;
            const Icon = freq.icon;
            
            return (
              <motion.button
                key={freq.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => {
                  onChange(freq.id as Frequency);
                  setTimeout(onNext, 400); // Auto-advance
                }}
                className={cn(
                  "flex items-center p-5 rounded-2xl border-2 text-left transition-all",
                  isSelected 
                    ? "border-red-600 bg-red-50" 
                    : "border-gray-100 bg-white hover:border-red-200 hover:bg-gray-50"
                )}
              >
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center mr-4 shadow-sm",
                  isSelected ? "bg-red-600 text-white" : "bg-white text-gray-500 border border-gray-200"
                )}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className={cn("font-bold text-lg", isSelected ? "text-red-900" : "text-gray-900")}>
                    {freq.label}
                  </div>
                  <div className="text-sm text-gray-500">{freq.desc}</div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <Navigation 
        onNext={onNext} 
        onPrev={onPrev} 
        canGoNext={selected !== null} 
      />
    </SlideContainer>
  );
}

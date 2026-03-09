import React from 'react';
import { SlideContainer } from '../SlideContainer';
import { Navigation } from '../Navigation';
import { ProgressBar } from '../ProgressBar';
import { Experience } from '../../types';
import { cn } from '../../utils';
import { motion } from 'motion/react';
import { Sprout, TrendingUp, Trophy } from 'lucide-react';

interface ExperienceSlideProps {
  selected: Experience | null;
  onChange: (exp: Experience) => void;
  onNext: () => void;
  onPrev: () => void;
  currentStep: number;
  totalSteps: number;
}

const EXPERIENCES = [
  { id: 'beginner', label: 'Początkujący', icon: Sprout, desc: 'Nigdy nie stosowałem kreatyny lub robiłem to krótko.' },
  { id: 'intermediate', label: 'Średnio zaawansowany', icon: TrendingUp, desc: 'Mam za sobą kilka cykli, znam podstawy.' },
  { id: 'advanced', label: 'Zaawansowany', icon: Trophy, desc: 'Stosuję regularnie, znam swój organizm.' },
] as const;

export function ExperienceSlide({ selected, onChange, onNext, onPrev, currentStep, totalSteps }: ExperienceSlideProps) {
  return (
    <SlideContainer>
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      
      <div className="p-8 pt-12 flex-1 flex flex-col overflow-y-auto pb-24">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Jakie jest Twoje doświadczenie?</h2>
          <p className="text-gray-500 text-sm mb-8">Pomoże nam to dostosować szczegółowość porad.</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4">
          {EXPERIENCES.map((exp, index) => {
            const isSelected = selected === exp.id;
            const Icon = exp.icon;
            
            return (
              <motion.button
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => {
                  onChange(exp.id as Experience);
                  setTimeout(onNext, 400); // Auto-advance
                }}
                className={cn(
                  "flex flex-col p-5 rounded-2xl border-2 text-left transition-all relative overflow-hidden",
                  isSelected 
                    ? "border-red-600 bg-red-50" 
                    : "border-gray-100 bg-white hover:border-red-200 hover:bg-gray-50"
                )}
              >
                <div className="flex items-center mb-2">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center mr-3",
                    isSelected ? "bg-red-600 text-white" : "bg-gray-100 text-gray-500"
                  )}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className={cn("font-bold text-lg", isSelected ? "text-red-900" : "text-gray-900")}>
                    {exp.label}
                  </div>
                </div>
                <div className="text-sm text-gray-600 pl-11">{exp.desc}</div>
                
                {isSelected && (
                  <motion.div 
                    layoutId="outline"
                    className="absolute inset-0 border-2 border-red-600 rounded-2xl pointer-events-none"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
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

import React from 'react';
import { SlideContainer } from '../SlideContainer';
import { Navigation } from '../Navigation';
import { ProgressBar } from '../ProgressBar';
import { Goal } from '../../types';
import { cn } from '../../utils';
import { motion } from 'motion/react';
import { Dumbbell, Zap, Timer, Flame } from 'lucide-react';

interface GoalSlideProps {
  selectedGoals: Goal[];
  onChange: (goals: Goal[]) => void;
  onNext: () => void;
  onPrev: () => void;
  currentStep: number;
  totalSteps: number;
}

const GOALS = [
  { id: 'muscle', label: 'Budowa masy mięśniowej', icon: Dumbbell, desc: 'Zwiększenie objętości i siły' },
  { id: 'strength', label: 'Maksymalna siła', icon: Zap, desc: 'Większe ciężary, lepsze wyniki' },
  { id: 'endurance', label: 'Wytrzymałość', icon: Timer, desc: 'Dłuższe i intensywniejsze treningi' },
  { id: 'fat_loss', label: 'Redukcja tkanki tłuszczowej', icon: Flame, desc: 'Ochrona mięśni podczas redukcji' },
] as const;

export function GoalSlide({ selectedGoals, onChange, onNext, onPrev, currentStep, totalSteps }: GoalSlideProps) {
  const toggleGoal = (goal: Goal) => {
    if (selectedGoals.includes(goal)) {
      onChange(selectedGoals.filter(g => g !== goal));
    } else {
      if (selectedGoals.length < 2) {
        onChange([...selectedGoals, goal]);
      } else {
        // Replace the oldest selection if trying to select more than 2
        onChange([selectedGoals[1], goal]);
      }
    }
  };

  return (
    <SlideContainer>
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      
      <div className="p-8 pt-12 flex-1 flex flex-col overflow-y-auto pb-24">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Jaki jest Twój główny cel?</h2>
          <p className="text-gray-500 text-sm mb-6">Możesz wybrać maksymalnie 2 cele.</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-3">
          {GOALS.map((goal, index) => {
            const isSelected = selectedGoals.includes(goal.id as Goal);
            const Icon = goal.icon;
            
            return (
              <motion.button
                key={goal.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => toggleGoal(goal.id as Goal)}
                className={cn(
                  "flex items-center p-4 rounded-xl border-2 text-left transition-all",
                  isSelected 
                    ? "border-red-600 bg-red-50" 
                    : "border-gray-100 bg-white hover:border-red-200 hover:bg-gray-50"
                )}
              >
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center mr-4",
                  isSelected ? "bg-red-600 text-white" : "bg-gray-100 text-gray-500"
                )}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className={cn("font-semibold", isSelected ? "text-red-900" : "text-gray-900")}>
                    {goal.label}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">{goal.desc}</div>
                </div>
                <div className={cn(
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                  isSelected ? "border-red-600 bg-red-600" : "border-gray-300"
                )}>
                  {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <Navigation 
        onNext={onNext} 
        onPrev={onPrev} 
        canGoNext={selectedGoals.length > 0} 
      />
    </SlideContainer>
  );
}

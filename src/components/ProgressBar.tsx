import React from 'react';
import { cn } from '../utils';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gray-100 z-20">
      <div 
        className="h-full bg-red-600 transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

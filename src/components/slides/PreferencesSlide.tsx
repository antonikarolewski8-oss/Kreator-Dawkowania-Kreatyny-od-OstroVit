import React from 'react';
import { SlideContainer } from '../SlideContainer';
import { Navigation } from '../Navigation';
import { ProgressBar } from '../ProgressBar';
import { FormPreference, TimingPreference } from '../../types';
import { cn } from '../../utils';
import { motion } from 'motion/react';
import { Pill, Beaker, Sun, Moon, Zap, Coffee } from 'lucide-react';

interface PreferencesSlideProps {
  form: FormPreference | null;
  timing: TimingPreference | null;
  onChangeForm: (form: FormPreference) => void;
  onChangeTiming: (timing: TimingPreference) => void;
  onNext: () => void;
  onPrev: () => void;
  currentStep: number;
  totalSteps: number;
}

const FORMS = [
  { id: 'powder', label: 'Proszek', icon: Beaker },
  { id: 'capsules', label: 'Kapsułki', icon: Pill },
] as const;

const TIMINGS = [
  { id: 'morning', label: 'Rano', icon: Sun },
  { id: 'pre_workout', label: 'Przed treningiem', icon: Zap },
  { id: 'post_workout', label: 'Po treningu', icon: Coffee },
  { id: 'evening', label: 'Wieczorem', icon: Moon },
] as const;

export function PreferencesSlide({ 
  form, timing, onChangeForm, onChangeTiming, onNext, onPrev, currentStep, totalSteps 
}: PreferencesSlideProps) {
  return (
    <SlideContainer>
      <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      
      <div className="p-6 pt-10 flex-1 flex flex-col overflow-y-auto pb-24">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-1">Ostatnie szczegóły</h2>
          <p className="text-gray-500 text-sm">Wybierz swoje preferencje suplementacji.</p>
        </motion.div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">Preferowana forma</h3>
            <div className="grid grid-cols-2 gap-3">
              {FORMS.map((f) => {
                const isSelected = form === f.id;
                const Icon = f.icon;
                return (
                  <button
                    key={f.id}
                    onClick={() => onChangeForm(f.id as FormPreference)}
                    className={cn(
                      "flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all",
                      isSelected 
                        ? "border-red-600 bg-red-50 text-red-700" 
                        : "border-gray-100 bg-white text-gray-600 hover:border-red-200 hover:bg-gray-50"
                    )}
                  >
                    <Icon className="w-6 h-6 mb-2" />
                    <span className="font-semibold text-sm">{f.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">Kiedy wolisz brać?</h3>
            <div className="grid grid-cols-2 gap-3">
              {TIMINGS.map((t) => {
                const isSelected = timing === t.id;
                const Icon = t.icon;
                return (
                  <button
                    key={t.id}
                    onClick={() => onChangeTiming(t.id as TimingPreference)}
                    className={cn(
                      "flex items-center p-3 rounded-xl border-2 transition-all",
                      isSelected 
                        ? "border-red-600 bg-red-50 text-red-700" 
                        : "border-gray-100 bg-white text-gray-600 hover:border-red-200 hover:bg-gray-50"
                    )}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    <span className="font-medium text-sm">{t.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      <Navigation 
        onNext={onNext} 
        onPrev={onPrev} 
        canGoNext={form !== null && timing !== null} 
        isLast={true}
      />
    </SlideContainer>
  );
}

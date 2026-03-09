import React, { useState, useEffect } from 'react';
import { WelcomeSlide } from './components/slides/WelcomeSlide';
import { GoalSlide } from './components/slides/GoalSlide';
import { ExperienceSlide } from './components/slides/ExperienceSlide';
import { WeightSlide } from './components/slides/WeightSlide';
import { FrequencySlide } from './components/slides/FrequencySlide';
import { PreferencesSlide } from './components/slides/PreferencesSlide';
import { AnalyzingSlide } from './components/slides/AnalyzingSlide';
import { ResultsSlide } from './components/slides/ResultsSlide';
import { Footer } from './components/Footer';
import { EmbedButton } from './components/EmbedButton';
import { UserState, INITIAL_STATE } from './types';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [step, setStep] = useState(0);
  const [state, setState] = useState<UserState>(INITIAL_STATE);
  const [isEmbedded, setIsEmbedded] = useState(false);

  useEffect(() => {
    // Check if embedded via URL param
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('embed') === 'true') {
      setIsEmbedded(true);
    }
  }, []);

  const handleNext = () => setStep((s) => Math.min(s + 1, 7));
  const handlePrev = () => setStep((s) => Math.max(s - 1, 0));
  const handleRestart = () => {
    setState(INITIAL_STATE);
    setStep(0);
  };

  const totalSteps = 5; // Steps 1 to 5 are the actual questions
  const currentProgressStep = Math.max(0, Math.min(step, totalSteps));

  const renderSlide = () => {
    switch (step) {
      case 0:
        return <WelcomeSlide onNext={handleNext} />;
      case 1:
        return (
          <GoalSlide
            selectedGoals={state.goals}
            onChange={(goals) => setState({ ...state, goals })}
            onNext={handleNext}
            onPrev={handlePrev}
            currentStep={1}
            totalSteps={totalSteps}
          />
        );
      case 2:
        return (
          <ExperienceSlide
            selected={state.experience}
            onChange={(experience) => setState({ ...state, experience })}
            onNext={handleNext}
            onPrev={handlePrev}
            currentStep={2}
            totalSteps={totalSteps}
          />
        );
      case 3:
        return (
          <WeightSlide
            weight={state.weight}
            onChange={(weight) => setState({ ...state, weight })}
            onNext={handleNext}
            onPrev={handlePrev}
            currentStep={3}
            totalSteps={totalSteps}
          />
        );
      case 4:
        return (
          <FrequencySlide
            selected={state.frequency}
            onChange={(frequency) => setState({ ...state, frequency })}
            onNext={handleNext}
            onPrev={handlePrev}
            currentStep={4}
            totalSteps={totalSteps}
          />
        );
      case 5:
        return (
          <PreferencesSlide
            form={state.form}
            timing={state.timing}
            onChangeForm={(form) => setState({ ...state, form })}
            onChangeTiming={(timing) => setState({ ...state, timing })}
            onNext={handleNext}
            onPrev={handlePrev}
            currentStep={5}
            totalSteps={totalSteps}
          />
        );
      case 6:
        return <AnalyzingSlide onComplete={handleNext} />;
      case 7:
        return <ResultsSlide state={state} onRestart={handleRestart} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans text-gray-900">
      {!isEmbedded && (
        <header className="w-full bg-white shadow-sm py-4 px-6 flex justify-center items-center">
          <h1 className="text-xl font-bold tracking-tight">OstroVit <span className="text-red-600">Kreator</span></h1>
        </header>
      )}

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 w-full">
        <div className="w-full max-w-[600px] mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {renderSlide()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {!isEmbedded && <Footer />}
      {!isEmbedded && <EmbedButton />}
    </div>
  );
}

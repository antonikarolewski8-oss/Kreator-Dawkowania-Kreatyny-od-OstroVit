import React, { useState } from 'react';
import { SlideContainer } from '../SlideContainer';
import { Activity, ArrowRight, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface WelcomeSlideProps {
  onNext: () => void;
}

export function WelcomeSlide({ onNext }: WelcomeSlideProps) {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <SlideContainer className="bg-gradient-to-br from-zinc-900 to-black text-white p-8 flex flex-col justify-between">
      <div className="flex justify-between items-center">
        <div className="font-bold text-xl tracking-tighter">OstroVit</div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowInfo(true)}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            aria-label="Jak to działa?"
          >
            <Info className="w-4 h-4 text-zinc-300" />
          </button>
          <div className="bg-red-600/20 text-red-500 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            Kreator
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center text-center space-y-6">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-lg shadow-red-600/30"
        >
          <Activity className="w-10 h-10 text-white" />
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
            Zoptymalizuj swoją <span className="text-red-500">suplementację</span>
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-sm mx-auto">
            Odpowiedz na kilka pytań i otrzymaj spersonalizowany plan dawkowania kreatyny dopasowany do Twoich celów.
          </p>
        </motion.div>
      </div>

      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        onClick={onNext}
        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 rounded-xl flex items-center justify-center transition-all active:scale-95 shadow-lg shadow-red-600/20"
      >
        Rozpocznij analizę
        <ArrowRight className="w-5 h-5 ml-2" />
      </motion.button>

      <AnimatePresence>
        {showInfo && (
          <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-full"
            >
              <div className="flex justify-between items-center p-5 border-b border-zinc-800">
                <h3 className="text-lg font-bold text-white flex items-center">
                  <Info className="w-5 h-5 mr-2 text-red-500" />
                  Jak to działa?
                </h3>
                <button 
                  onClick={() => setShowInfo(false)}
                  className="p-2 hover:bg-zinc-800 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-zinc-400" />
                </button>
              </div>

              <div className="p-5 overflow-y-auto space-y-4 text-sm text-zinc-300">
                <div>
                  <h4 className="font-bold text-white mb-1">CO to jest?</h4>
                  <p>Inteligentny kalkulator, który na podstawie Twoich parametrów i celów dobiera optymalną dawkę i sposób suplementacji kreatyny.</p>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">KIEDY używać?</h4>
                  <p>Gdy zaczynasz suplementację, zmieniasz cel treningowy lub chcesz upewnić się, że Twoja obecna dawka jest optymalna.</p>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">JAK to działa?</h4>
                  <ol className="list-decimal pl-4 space-y-1 mt-1">
                    <li>Odpowiadasz na 5 krótkich pytań o swój trening i ciało.</li>
                    <li>Nasz algorytm analizuje Twoje odpowiedzi.</li>
                    <li>Otrzymujesz spersonalizowane rekomendacje i plan dawkowania.</li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">DLACZEGO warto?</h4>
                  <p>Unikasz błędów w dawkowaniu, maksymalizujesz efekty suplementacji i oszczędzasz produkt.</p>
                </div>
                
                <div className="mt-6 p-3 bg-red-900/20 border border-red-900/50 rounded-lg text-red-200 text-xs">
                  <span className="font-bold text-red-400">⚠️ WAŻNE:</span> To są nasze sugestie oparte na Twoich odpowiedziach. Ostateczna decyzja należy do Ciebie. W razie wątpliwości zdrowotnych skonsultuj się z lekarzem.
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </SlideContainer>
  );
}

import React from 'react';
import { cn } from '../utils';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface NavigationProps {
  onNext?: () => void;
  onPrev?: () => void;
  nextLabel?: string;
  prevLabel?: string;
  canGoNext?: boolean;
  canGoPrev?: boolean;
  isLast?: boolean;
}

export function Navigation({
  onNext,
  onPrev,
  nextLabel = "Dalej",
  prevLabel = "Wstecz",
  canGoNext = true,
  canGoPrev = true,
  isLast = false,
}: NavigationProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent pt-12 flex justify-between items-center z-10">
      {canGoPrev ? (
        <button
          onClick={onPrev}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors active:scale-95"
          aria-label={prevLabel}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      ) : (
        <div className="w-12 h-12" />
      )}

      <button
        onClick={onNext}
        disabled={!canGoNext}
        className={cn(
          "flex items-center justify-center px-8 h-12 rounded-full font-semibold transition-all active:scale-95",
          canGoNext
            ? "bg-red-600 text-white hover:bg-red-700 shadow-md hover:shadow-lg"
            : "bg-gray-200 text-gray-400 cursor-not-allowed",
          isLast && canGoNext ? "bg-black hover:bg-gray-900" : ""
        )}
      >
        {isLast ? "Zobacz wyniki" : nextLabel}
        {!isLast && <ChevronRight className="w-5 h-5 ml-1" />}
      </button>
    </div>
  );
}

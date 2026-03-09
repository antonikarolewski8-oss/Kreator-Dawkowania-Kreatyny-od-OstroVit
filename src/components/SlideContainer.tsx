import React from 'react';
import { cn } from '../utils';

interface SlideContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function SlideContainer({ children, className, id }: SlideContainerProps) {
  return (
    <div 
      id={id}
      className={cn(
        "w-full max-w-[600px] aspect-square mx-auto overflow-hidden relative bg-white shadow-xl rounded-2xl flex flex-col",
        className
      )}
    >
      {children}
    </div>
  );
}

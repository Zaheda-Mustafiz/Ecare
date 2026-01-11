import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  onClick?: () => void;
  className?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ onClick, className = '' }) => {
  const handleBack = () => {
    // 1. Use custom handler if provided (ideal for SPAs like this one)
    if (onClick) {
      onClick();
      return;
    }

    // 2. Browser History Logic (as requested)
    // Check if there is history state to go back to
    if (typeof window !== 'undefined' && window.history.length > 1) {
      window.history.back();
    } else {
      // 3. Fallback: Redirect to home if no history exists
      window.location.href = '/';
    }
  };

  return (
    <button 
      onClick={handleBack}
      className={`fixed top-4 left-4 z-[100] p-3 bg-white/90 backdrop-blur-md border border-slate-200 text-slate-700 rounded-full shadow-md hover:bg-slate-50 hover:text-slate-900 hover:shadow-lg hover:-translate-x-1 transition-all duration-200 active:scale-95 group flex items-center justify-center ${className}`}
      aria-label="Go back"
      title="Go Back"
    >
      <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
    </button>
  );
};

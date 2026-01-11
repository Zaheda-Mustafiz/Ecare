import React from 'react';

interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  light?: boolean;
}

export const Section: React.FC<SectionProps> = ({ id, className = '', children, title, subtitle, light = false }) => {
  return (
    <section id={id} className={`py-16 md:py-24 px-4 sm:px-6 lg:px-8 ${light ? 'bg-slate-50' : 'bg-white'} ${className}`}>
      <div className="max-w-7xl mx-auto">
        {(title || subtitle) && (
          <div className="text-center mb-12 md:mb-16">
            {title && <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">{title}</h2>}
            {subtitle && <p className="text-lg text-slate-600 max-w-2xl mx-auto">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};
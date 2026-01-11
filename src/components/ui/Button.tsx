import React from 'react';
import { Loader } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient' | 'danger' | 'success';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  rounded?: 'sm' | 'md' | 'lg' | 'full';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  pulse?: boolean;
  tooltip?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  rounded = 'lg',
  shadow = 'md',
  isLoading = false, 
  icon,
  iconPosition = 'left',
  fullWidth = false,
  pulse = false,
  tooltip,
  className = '', 
  disabled = false,
  ...props 
}) => {
  
  const baseStyles = "inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed active:scale-95 hover:shadow-2xl transform hover:-translate-y-1 group relative";
  
  const variants = {
    primary: "bg-slate-700 text-white hover:bg-slate-800 focus:ring-slate-700 hover:shadow-slate-700/50",
    secondary: "bg-slate-600 text-white hover:bg-slate-700 focus:ring-slate-600 hover:shadow-slate-600/50",
    outline: "border-2 border-slate-300 bg-white text-slate-700 hover:border-slate-500 hover:bg-slate-50 focus:ring-slate-300",
    ghost: "bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-800 focus:ring-slate-300",
    gradient: "bg-gradient-to-r from-slate-400 to-slate-600 text-white hover:from-slate-500 hover:to-slate-700 focus:ring-slate-600 hover:shadow-slate-600/50",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600 hover:shadow-red-600/50",
    success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-600 hover:shadow-green-600/50"
  };

  const sizes = {
    xs: "px-2 py-1 text-xs gap-1.5",
    sm: "px-4 py-2 text-sm gap-2",
    md: "px-6 py-3 text-base gap-2",
    lg: "px-8 py-4 text-lg gap-3",
    xl: "px-10 py-5 text-xl gap-3",
  };

  const roundedStyles = {
    sm: "rounded-md",
    md: "rounded-lg",
    lg: "rounded-xl",
    full: "rounded-full",
  };

  const shadowStyles = {
    none: "shadow-none",
    sm: "shadow-sm",
    md: "shadow-lg shadow-slate-600/20",
    lg: "shadow-xl shadow-slate-600/30",
  };

  const widthClass = fullWidth ? "w-full justify-center" : "";
  const pulseClass = pulse ? "animate-pulse" : "";

  // Tooltip element
  const tooltipElement = tooltip ? (
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-slate-900 text-white text-xs rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
      {tooltip}
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
    </div>
  ) : null;

  return (
    <>
      <button 
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${roundedStyles[rounded]} ${shadowStyles[shadow]} ${widthClass} ${pulseClass} ${className}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <Loader size={size === 'xs' ? 14 : size === 'sm' ? 16 : size === 'md' ? 18 : size === 'lg' ? 20 : 24} className="animate-spin" />
            {children && <span className="ml-2">{children}</span>}
          </>
        ) : (
          <>
            {icon && iconPosition === 'left' && <span className="flex items-center justify-center">{icon}</span>}
            {children}
            {icon && iconPosition === 'right' && <span className="flex items-center justify-center">{icon}</span>}
          </>
        )}
      </button>
      {tooltipElement}
    </>
  );
};
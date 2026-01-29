import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  fullWidth = false, 
  className,
  ...props 
}: ButtonProps) => {
  const baseStyles = "relative font-bold uppercase tracking-widest transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group";
  
  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-8 py-3 text-sm',
    lg: 'px-10 py-4 text-base'
  };

  const variants = {
    primary: 'bg-gold text-dark hover:bg-white hover:text-dark border-none',
    outline: 'bg-transparent border-2 border-gold text-gold hover:bg-gold hover:text-dark',
    gradient: 'bg-linear-to-r from-gold to-yellow-300 text-dark hover:shadow-lg hover:shadow-gold/20 border-none'
  };

  return (
    <button 
      className={clsx(baseStyles, sizes[size], variants[variant], fullWidth && "w-full", className)}
      {...props}
    >
      {/* Shine effect for primary button */}
      {variant === 'primary' && (
        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite]" />
      )}
      
      {/* Fill effect for outline button */}
      {variant === 'outline' && (
        <span className="absolute inset-0 w-full h-full bg-gold origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 -z-10" />
      )}
      
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
};

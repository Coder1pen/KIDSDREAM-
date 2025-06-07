import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-500 disabled:opacity-50 disabled:pointer-events-none transform hover:scale-105 active:scale-95';
  
  const variants = {
    primary: 'bg-gradient-to-r from-navy-600 to-navy-500 text-white hover:from-navy-500 hover:to-navy-400 shadow-glow hover:shadow-glow-lg',
    secondary: 'bg-gradient-to-r from-dark-700 to-dark-600 text-white hover:from-dark-600 hover:to-dark-500 shadow-lg',
    outline: 'border border-navy-600/50 bg-transparent hover:bg-navy-900/30 text-navy-300 hover:text-navy-200 hover:border-navy-500',
    ghost: 'bg-transparent hover:bg-navy-900/30 text-navy-300 hover:text-navy-200',
    link: 'bg-transparent underline-offset-4 hover:underline text-navy-300 hover:text-navy-200 p-0 h-auto transform-none hover:scale-100 active:scale-100',
  };
  
  const sizes = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4',
    lg: 'h-12 px-6 text-lg',
  };
  
  const variantStyle = variants[variant];
  const sizeStyle = variant === 'link' ? '' : sizes[size];
  
  return (
    <button
      className={`${baseStyles} ${variantStyle} ${sizeStyle} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};
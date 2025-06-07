import React, { forwardRef } from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, helperText, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={props.id} 
            className="block text-sm font-medium text-navy-200 mb-2"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`
            w-full rounded-lg border ${error ? 'border-red-500' : 'border-navy-700/50'} 
            bg-dark-800/50 backdrop-blur-sm px-4 py-3 text-navy-100 placeholder-gray-400
            focus:border-navy-500 focus:outline-none focus:ring-2 focus:ring-navy-500/20
            disabled:opacity-50 disabled:bg-dark-900/50
            transition-all duration-300 resize-vertical
            ${className}
          `}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${props.id}-error` : helperText ? `${props.id}-helper` : undefined}
          {...props}
        />
        {helperText && !error && (
          <p id={`${props.id}-helper`} className="mt-2 text-sm text-gray-400">
            {helperText}
          </p>
        )}
        {error && (
          <p id={`${props.id}-error`} className="mt-2 text-sm text-red-400">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
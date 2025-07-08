import type { InputHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';
import { AlertCircle } from 'lucide-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string | null;
  rightIcon?: ReactNode;
}

export function Input({ label, error, rightIcon, className, id, ...props }: InputProps) {
  const inputId = id || `input-${label.replace(/\s+/g, '-').toLowerCase()}`;
  const hasError = Boolean(error);

  return (
    <div className="w-full flex flex-col gap-1">
      <label
        htmlFor={inputId}
        className={clsx(
          'text-xs font-bold uppercase mb-1',
          hasError ? 'text-danger' : props.value || props.defaultValue ? 'text-blue-base' : 'text-gray-500'
        )}
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={inputId}
          className={clsx(
            'w-full px-4 py-3 rounded-lg font-sans text-sm transition-colors',
            'border',
            hasError
              ? 'border-danger focus:border-danger focus:ring-danger'
              : props.value || props.defaultValue
                ? 'border-blue-base focus:border-blue-base focus:ring-blue-base'
                : 'border-gray-200 focus:border-blue-base',
            'focus:outline-none focus:ring-2',
            className
          )}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${inputId}-error` : undefined}
          {...props}
        />
        {rightIcon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{rightIcon}</span>
        )}
      </div>
      {hasError && (
        <div className="flex items-center gap-1 mt-1 text-xs text-danger" id={`${inputId}-error`}>
          <AlertCircle size={16} className="inline-block" />
          {error}
        </div>
      )}
    </div>
  );
} 
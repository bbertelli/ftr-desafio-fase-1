import type { ReactNode } from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  leftIcon?: ReactNode;
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  leftIcon,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  const base =
    'w-full flex items-center justify-center gap-2 font-semibold font-sans rounded-xl transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-base focus:ring-offset-2';

  const variants = {
    primary:
      'bg-blue-base text-white hover:bg-blue-dark disabled:bg-blue-base disabled:opacity-50 disabled:cursor-not-allowed',
    secondary:
      'bg-gray-200 text-blue-base hover:bg-white hover:border-blue-base hover:text-blue-base border border-transparent disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed',
  };

  return (
    <button
      type="button"
      className={clsx(base, variants[variant], className)}
      disabled={disabled}
      {...props}
    >
      {leftIcon && <span className={clsx('inline-flex items-center', variant === 'secondary' ? 'text-blue-base' : 'text-white', disabled && 'text-gray-400')}>{leftIcon}</span>}
      {children}
    </button>
  );
} 
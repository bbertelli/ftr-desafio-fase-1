import type { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode;
  label: string;
}

export function IconButton({ icon, label, disabled, className, ...props }: IconButtonProps) {
  return (
    <button
      type="button"
      className={clsx(
        'w-10 h-10 flex items-center justify-center rounded-lg bg-gray-200 transition-colors',
        'hover:bg-white hover:border hover:border-blue-base hover:text-blue-base',
        'focus:outline-none focus:ring-2 focus:ring-blue-base focus:ring-offset-2',
        'disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed',
        className
      )}
      disabled={disabled}
      aria-label={label}
      {...props}
    >
      {icon}
      <span className="sr-only">{label}</span>
    </button>
  );
} 
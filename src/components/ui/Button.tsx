'use client';

import { cn } from '@/src/utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({
  children,
  onClick,
  disabled,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'hover:cursor-pointer',
        disabled && 'opacity-50',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

import { type ButtonHTMLAttributes, type ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {
  const { children, className = '', ...rest } = props;

  return (
    <button
      {...rest}
      className={`inline-flex w-fit rounded-lg border-2 border-transparent bg-[var(--accent-bg)] px-2 py-1 text-base font-[var(--mono)] text-[var(--accent)] transition ease-in hover:scale-105 hover:border-[var(--accent-border)] hover:text-[var(--text-h)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] active:scale-95 active:border-[var(--accent)] disabled:scale-100 disabled:cursor-not-allowed disabled:border-[var(--border)] disabled:bg-[var(--border)] disabled:text-[var(--text)] ${className}`}
    >
      {children}
    </button>
  );
}

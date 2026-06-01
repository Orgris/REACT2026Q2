import type { ReactNode } from 'react';

type FooterProps = {
  className?: string;
  children?: ReactNode;
};

export function Footer({ children, className = '' }: FooterProps) {
  return (
    <footer
      className={`flex shrink items-start justify-start rounded-t-lg border border-b-0 border-[var(--border)] bg-[var(--bg)] p-6 pb-0 ${className}`}
    >
      {children}
    </footer>
  );
}

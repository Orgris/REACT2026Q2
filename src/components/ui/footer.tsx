import type { ReactNode } from 'react';

type FooterProps = {
  className?: string;
  children?: ReactNode;
};

export function Footer({ children, className = '' }: FooterProps) {
  return (
    <footer
      className={`grow rounded-t-lg border border-b-0 border-[var(--border)] bg-[var(--bg)] pt-6 ${className}`}
    >
      {children}
    </footer>
  );
}

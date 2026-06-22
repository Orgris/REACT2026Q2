import { ErrorButton } from './button/error-button';

type FooterProps = {
  className?: string;
};

export function Footer({ className = '' }: FooterProps) {
  return (
    <footer
      className={`
        flex items-start justify-start rounded-t-lg border border-b-0
        border-(--border) bg-(--bg) p-3
        ${className}
      `}
    >
      <ErrorButton />
    </footer>
  );
}

import { type ButtonHTMLAttributes, type ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {
  const { children, className = '', ...rest } = props;

  return (
    <button
      {...rest}
      className={`
        inline-flex w-fit rounded-lg border-2 border-transparent
        bg-(--accent-bg) px-2 py-1 text-base font-(--mono) text-(--accent)
        transition ease-in
        hover:scale-105 hover:border-(--accent-border) hover:text-(--text-h)
        focus-visible:outline-2 focus-visible:outline-offset-2
        focus-visible:outline-(--accent)
        active:scale-95 active:border-(--accent)
        disabled:scale-100 disabled:cursor-not-allowed
        disabled:border-(--border) disabled:bg-(--border) disabled:text-(--text)
        ${className}
      `}
    >
      {children}
    </button>
  );
}

import React, { type ButtonHTMLAttributes, type ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export class Button extends React.Component<ButtonProps> {
  render(): React.ReactNode {
    const { children, className = '', ...rest } = this.props;

    return (
      <button
        {...rest}
        className={`inline-flex w-fit rounded border-2 border-transparent bg-[var(--accent-bg)] px-3 py-1 text-base font-[var(--mono)] text-[var(--accent)] transition-colors hover:border-[var(--accent-border)] hover:text-[var(--text-h)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] ${className}`}
      >
        {children}
      </button>
    );
  }
}

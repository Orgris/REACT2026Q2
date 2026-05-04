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
        className={`inline-flex w-fit rounded-lg border-2 border-transparent bg-[var(--accent-bg)] p-1 text-base font-[var(--mono)] text-[var(--accent)] transition ease-in hover:scale-105 hover:border-[var(--accent-border)] hover:text-[var(--text-h)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)] active:scale-95 active:border-[var(--accent)] ${className}`}
      >
        {children}
      </button>
    );
  }
}

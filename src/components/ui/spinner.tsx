import React, { type ReactNode } from 'react';
import PokeballIcon from '../../assets/pokeball.svg?react';

type SpinnerProps = {
  className?: string;
};

export class Spinner extends React.Component<SpinnerProps> {
  render(): ReactNode {
    const { className = '' } = this.props;

    return (
      <div
        role="status"
        aria-label="loading spinner"
        className="flex w-full grow items-center justify-center"
      >
        <PokeballIcon
          data-testid="spinner"
          className={`absolute animate-spin text-[var(--border)] [animation-duration:5s] ${className}`}
        />
      </div>
    );
  }
}

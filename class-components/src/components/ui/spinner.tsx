import React, { type ReactNode } from 'react';
import PokeballIcon from '../../assets/pokeball.svg?react';

type SpinnerProps = {
  className: string;
};

export class Spinner extends React.Component<SpinnerProps> {
  handleRefresh = () => {
    window.location.reload();
  };

  render(): ReactNode {
    const { className = '' } = this.props;

    return (
      <div className="flex w-full grow items-center justify-center">
        <PokeballIcon
          className={`absolute animate-spin text-[var(--border)] [animation-duration:5s] ${className}`}
        />
      </div>
    );
  }
}

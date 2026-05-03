import React, { type ReactNode } from 'react';
import { Button } from './button';

type FallbackProps = {
  errorMessage: string;
};

export class Fallback extends React.Component<FallbackProps> {
  handleRefresh = () => {
    window.location.reload();
  };

  render(): ReactNode {
    return (
      <div className="flex grow flex-col items-center justify-center gap-1 bg-[var(--bg)] lg:gap-2 lg:p-8">
        <p>{this.props.errorMessage}</p>
        <p>Please try again later</p>
        <Button onClick={this.handleRefresh}>Refresh</Button>
      </div>
    );
  }
}

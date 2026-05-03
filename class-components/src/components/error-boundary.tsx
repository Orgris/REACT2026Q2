import React, { type ReactNode } from 'react';
import { Fallback } from './ui/fallback';

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasErrorOccured: boolean;
  errorMessage: string;
};

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = {
      hasErrorOccured: false,
      errorMessage: '',
    };
  }

  static getDerivedStateFromError() {
    return {
      hasErrorOccured: true,
      errorMessage: 'Oops! Something went wrong',
    };
  }

  componentDidCatch(error: Error): void {
    console.log(error);
  }

  render(): ReactNode {
    return this.state.hasErrorOccured ? (
      <Fallback errorMessage={this.state.errorMessage} />
    ) : (
      this.props.children
    );
  }
}

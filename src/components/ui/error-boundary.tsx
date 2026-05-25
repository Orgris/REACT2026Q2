import React, { type ReactNode } from 'react';
import { Fallback } from './fallback';

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasErrorOccurred: boolean;
  errorMessage: string;
};

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = {
      hasErrorOccurred: false,
      errorMessage: '',
    };
  }

  static getDerivedStateFromError(error: Error) {
    return {
      hasErrorOccurred: true,
      errorMessage: error.message || 'Something went wrong',
    };
  }

  componentDidCatch(error: Error): void {
    console.error('ErrorBoundary error:', error);
  }

  render(): ReactNode {
    return this.state.hasErrorOccurred ? (
      <Fallback errorMessage={this.state.errorMessage} />
    ) : (
      this.props.children
    );
  }
}

import React from 'react';
import { Button } from './button';

type ErrorButtonProps = Record<string, never>;

type ErrorButtonState = {
  hasErrorOccured: boolean;
};

export class ErrorButton extends React.Component<
  ErrorButtonProps,
  ErrorButtonState
> {
  constructor(props: ErrorButtonProps) {
    super(props);

    this.state = {
      hasErrorOccured: false,
    };
  }

  onClickButton = () => {
    this.setState({ hasErrorOccured: true });
  };

  render(): React.ReactNode {
    if (this.state.hasErrorOccured) {
      throw new Error('Test error');
    }
    return <Button onClick={this.onClickButton}>Click me!</Button>;
  }
}

import { useState } from 'react';
import { Button } from './button';

export function ErrorButton() {
  const [errorOccured, setErrorOccured] = useState(false);
  const onClickButton = () => {
    setErrorOccured(true);
  };

  if (errorOccured) {
    throw new Error('Test error');
  }
  return (
    <Button data-testid="error-btn" onClick={onClickButton}>
      Click me!
    </Button>
  );
}

'use client';

import { useState } from 'react';
import { Button } from './button';

export function ErrorButton() {
  const [shouldThrow, setShouldThrow] = useState(false);

  const onClickButton = () => {
    setShouldThrow(true);
  };

  if (shouldThrow) {
    throw new Error('Test error');
  }

  return (
    <Button data-testid="error-btn" onClick={onClickButton}>
      Click me!
    </Button>
  );
}

'use client';

import { useState } from 'react';
import { Button } from './button';
import { useTranslations } from 'next-intl';

export function ErrorButton() {
  const t = useTranslations('Footer');

  const [shouldThrow, setShouldThrow] = useState(false);

  const onClickButton = () => {
    setShouldThrow(true);
  };

  if (shouldThrow) {
    throw new Error('Test error');
  }

  return (
    <Button data-testid="error-btn" onClick={onClickButton}>
      {t('errorBtn')}
    </Button>
  );
}

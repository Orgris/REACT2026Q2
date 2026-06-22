'use client';

import { useEffect } from 'react';
import { Fallback } from '../components/ui/fallback';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Error:', error);
  }, [error]);

  return (
    <Fallback
      errorMessage={error.message || 'Something went wrong'}
      onReset={reset}
    />
  );
}

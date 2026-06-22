'use client';

import { useState, useTransition } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { selectSelectedPokemons } from '../../store/selectedPokemons/selectedPokemonsSelectors';
import { clearSelection } from '../../store/selectedPokemons/selectedPokemonsSlice';
import { Button } from '../ui/button/button';
import { Spinner } from '../ui/spinner';
import { useTranslations } from 'next-intl';

export function Flyout() {
  const t = useTranslations('Flyout');

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const selectedPokemons = useAppSelector(selectSelectedPokemons);
  const selectedCount = selectedPokemons.length;

  const handleUnselectClick = () => {
    dispatch(clearSelection());
  };

  const handleDownloadClick = () => {
    setError(null);

    startTransition(async () => {
      try {
        const response = await fetch('/api/export-csv', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ selectedPokemons }),
        });

        if (!response.ok) {
          setError('Failed to export CSV');
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${selectedCount}_items.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      } catch {
        setError('Failed to download CSV');
      }
    });
  };

  return (
    <div
      className={`
        fixed bottom-0 left-1/2 z-20 flex w-fit -translate-x-1/2 gap-5
        rounded-lg border-2 border-(--border) bg-(--bg) p-2.5 transition
        duration-300
        ${selectedCount ? `opacity-100` : `opacity-0`}
      `}
    >
      {error && <p className="text-red-500">{error}</p>}

      {isPending && <Spinner classNameBG="size-20!" />}

      {!error && !isPending && (
        <>
          <div className="flex items-center gap-2">
            <p>{t('select')}</p>
            <p>{selectedCount}</p>
          </div>
          <div className="flex gap-5">
            <Button onClick={handleUnselectClick}>{t('unselect')}</Button>
            <Button onClick={handleDownloadClick}>{t('download')}</Button>
          </div>
        </>
      )}
    </div>
  );
}

'use client';

import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Button } from '../ui/button/button';
import PokeballIcon from '../../assets/pokeball.svg';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useRouter, useSearchParams } from 'next/navigation';
import { Spinner } from '../ui/spinner';
import { useTranslations } from 'next-intl';

export function SearchForm() {
  const t = useTranslations('Search');

  const [storedQuery, setStoredQuery] = useLocalStorage('searchString');
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams?.get('search') ?? '';

  const [inputValue, setInputValue] = useState(() => query || storedQuery);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    setInputValue(query);
  }, [query]);

  useEffect(() => {
    if (query || !storedQuery) {
      return;
    }

    const params = new URLSearchParams(searchParams?.toString());
    params.set('search', storedQuery);
    params.set('page', '1');

    router.push(`?${params.toString()}`, { scroll: false });
  }, []);

  const handleSubmit = (event: React.SubmitEvent) => {
    event.preventDefault();

    if (inputValue === query) {
      return;
    }

    const trimmedSearch = inputValue.trim();
    const params = new URLSearchParams(searchParams?.toString());

    if (trimmedSearch) {
      params.set('search', trimmedSearch);
    } else {
      params.delete('search');
    }

    params.set('page', '1');

    router.push(`?${params.toString()}`, { scroll: false });

    setStoredQuery(trimmedSearch);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <form
      data-testid="search-form"
      className="flex gap-3"
      onSubmit={handleSubmit}
    >
      <Suspense
        fallback={
          <Spinner
            className="w-10 text-(--border)"
            classNameBG="bg-(--bg) border-2 rounded-lg border-(--border)"
          />
        }
      >
        <input
          data-testid="search-input"
          className="
            flex-1 rounded-lg border-2 border-(--border) bg-(--border) px-3 py-1
            transition-colors
            hover:border-(--accent-border)
            focus-visible:outline-2 focus-visible:outline-(--accent)
          "
          type="search"
          placeholder={t('placeholder')}
          value={inputValue}
          onChange={handleChange}
        />
      </Suspense>

      <Button
        className="
          bg-red-400
          hover:border-red-500 hover:bg-red-500
        "
        type="submit"
        data-testid="submit-button"
      >
        <PokeballIcon className="w-6 scale-130 text-[white]" />
      </Button>
    </form>
  );
}

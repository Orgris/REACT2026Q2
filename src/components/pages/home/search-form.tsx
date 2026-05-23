import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../../ui/button';
import PokeballIcon from '../../../assets/pokeball.svg?react';
import { useSearchParams } from 'react-router';
import { useLocalStorage } from '../../../hooks/useLocalStorage';

export function SearchForm() {
  const [storedQuery, setStoredQuery] = useLocalStorage('searchString');
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('search') ?? '';

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

    const params = new URLSearchParams(searchParams);

    params.set('search', storedQuery);
    params.set('page', '1');

    setSearchParams(params);
  }, []);

  const handleSubmit = (event: React.SubmitEvent) => {
    event.preventDefault();

    if (inputValue === query) {
      return;
    }

    const trimmedSearch = inputValue.trim();

    const params = new URLSearchParams(searchParams);

    if (trimmedSearch) {
      params.set('search', trimmedSearch);
    } else {
      params.delete('search');
    }

    params.set('page', '1');

    setSearchParams(params);
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
      <input
        data-testid="search-input"
        className="flex-1 rounded-lg border-2 border-[var(--border)] bg-[var(--border)] px-3 py-1 transition-colors hover:border-[var(--accent-border)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
        type="search"
        placeholder="Who's that Pokémon?"
        value={inputValue}
        onChange={handleChange}
      />
      <Button
        className="bg-red-400 hover:border-red-500 hover:bg-red-500"
        type="submit"
        data-testid="submit-button"
      >
        <PokeballIcon className="w-6 scale-130 text-[white]" />
      </Button>
    </form>
  );
}

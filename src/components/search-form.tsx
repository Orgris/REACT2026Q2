import React, { useState } from 'react';
import { Button } from './ui/button';
import PokeballIcon from '../assets/pokeball.svg?react';

type SearchFormProps = {
  query: string;
  onSearchChange: (value: string) => void;
};

export function SearchForm({ query, onSearchChange }: SearchFormProps) {
  const [inputValue, setInputValue] = useState(query);

  const handleSubmit = (event: React.SubmitEvent) => {
    event.preventDefault();

    if (inputValue === query) {
      return;
    }

    const trimmedSearch = inputValue.trim();

    localStorage.setItem('searchString', trimmedSearch);
    onSearchChange(trimmedSearch);
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

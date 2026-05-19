import { type ReactNode } from 'react';

type SearchProps = {
  children: ReactNode;
};

export function Search(props: SearchProps) {
  return (
    <div
      data-testid="search"
      className="flex flex-col gap-2 rounded-lg border border-[var(--border)] bg-[var(--bg)] p-6 text-left"
    >
      <div>
        <h2>Search your Pokémon!</h2>
        <p>Enter a Pokémon name or National Pokédex number.</p>
      </div>
      {props.children}
    </div>
  );
}

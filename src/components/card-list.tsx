import { useEffect, useState } from 'react';
import { Card } from './card';
import { fetchPokemonList } from '../api/search-api';
import type { Pokemon } from '../api/search-api-types';
import { Spinner } from './ui/spinner';

type CardListProps = {
  query: string;
};

export function CardList(props: CardListProps) {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getPokemons = async () => {
      setError(null);
      setLoading(true);

      try {
        const pokemons = await fetchPokemonList(props.query);
        setPokemons(pokemons);
        setLoading(false);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Unexpected error';
        setError(errorMessage);
        setLoading(false);
      }
    };

    getPokemons();
  }, [props.query]);

  return (
    <section
      data-testid="card-list"
      className="justify flex grow flex-wrap items-center justify-center gap-6 rounded-lg border border-[var(--border)] bg-[var(--bg)] p-6 lg:gap-8 lg:p-8"
    >
      {loading && <Spinner className="w-100" />}

      {error && <div>{error}</div>}

      {!loading && !error && (
        <>
          {pokemons.map((pokemon) => (
            <Card key={pokemon.id} pokemon={pokemon} />
          ))}
        </>
      )}
    </section>
  );
}

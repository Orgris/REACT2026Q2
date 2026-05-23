import { useEffect, useState } from 'react';
import { Card } from './card';
import { fetchPokemonList } from '../../../api/search-api';
import type { Pokemon } from '../../../api/search-api-types';
import { Spinner } from '../../ui/spinner';
import { Pagination } from '../../ui/pagination';
import { useSearchParams } from 'react-router';

const LIST_ITEM_LIMIT = 20;

export function CardList() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('search') ?? '';
  const page = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    let isCurrent = true;

    const getPokemons = async () => {
      setError(null);
      setLoading(true);

      const limit = LIST_ITEM_LIMIT;
      const offset = (page - 1) * limit;

      try {
        const data = await fetchPokemonList(query, offset, limit);

        if (!isCurrent) return;

        setPokemons(data);
      } catch (err) {
        if (!isCurrent) return;
        const errorMessage =
          err instanceof Error ? err.message : 'Unexpected error';
        setError(errorMessage);
      } finally {
        if (isCurrent) setLoading(false);
      }
    };

    getPokemons();

    return () => {
      isCurrent = false;
    };
  }, [query, page]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);

    params.set('page', String(newPage));

    setSearchParams(params);
  };

  return (
    <section
      data-testid="card-list"
      className="flex min-h-110 grow flex-col items-center justify-center gap-8 rounded-lg border border-[var(--border)] bg-[var(--bg)] p-8"
    >
      {loading && <Spinner className="w-100" />}

      {error && <div>{error}</div>}

      {!loading && !error && (
        <>
          <div className="flex grow flex-wrap items-center justify-center gap-6">
            {pokemons.map((pokemon) => (
              <Card key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>

          {!query && <Pagination page={page} onPageChange={handlePageChange} />}
        </>
      )}
    </section>
  );
}

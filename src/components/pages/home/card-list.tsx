import { useEffect } from 'react';
import { Card } from './card';
import { Spinner } from '../../ui/spinner';
import { Pagination } from '../../ui/pagination';
import { useSearchParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../../app/hooks/hooks';
import {
  selectError,
  selectLoading,
  selectPokemons,
} from '../../../app/selectors/pokemonListSelectors';
import { fetchPokemons } from '../../../app/pokemonListSlice';

export function CardList() {
  const dispatch = useAppDispatch();
  const pokemons = useAppSelector(selectPokemons);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('search') ?? '';
  const page = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    dispatch(
      fetchPokemons({
        query,
        page,
      })
    );
  }, [dispatch, query, page]);

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

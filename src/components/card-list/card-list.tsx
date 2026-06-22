'use client';

import { Card } from './card';
import { Spinner } from '../ui/spinner';
import { Pagination } from './pagination';
import { useGetPokemonsQuery } from '../../store/pokemonList/pokemonApi';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

export function CardList() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const query = searchParams?.get('search') ?? '';
  const page = Number(searchParams?.get('page')) || 1;

  const {
    data: pokemons,
    isFetching,
    isError,
    error,
  } = useGetPokemonsQuery({
    query,
    page,
  });

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams?.toString() ?? '');

    params.set('page', String(newPage));

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <Suspense
      fallback={
        <Spinner
          className="w-1/3 text-(--border)"
          classNameBG="bg-(--bg) border-1 rounded-lg border-(--border)"
        />
      }
    >
      <section
        data-testid="card-list"
        className="
          flex grow flex-col items-center justify-center gap-8 rounded-lg border
          border-(--border) bg-(--bg) p-8
        "
      >
        {isFetching && <Spinner className="w-100" />}

        {isError && <div>{getErrorMessage(error)}</div>}

        {!isFetching && !isError && (
          <>
            <div className="flex grow flex-wrap items-center justify-center gap-6">
              {pokemons?.map((pokemon) => (
                <Card key={pokemon.id} pokemon={pokemon} />
              ))}
            </div>

            {!query && (
              <Pagination page={page} onPageChange={handlePageChange} />
            )}
          </>
        )}
      </section>
    </Suspense>
  );
}

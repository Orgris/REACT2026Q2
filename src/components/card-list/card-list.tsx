import { Card } from './card';
import { Spinner } from '../ui/spinner';
import { useSearchParams } from 'react-router';
import { Pagination } from './pagination';
import { useGetPokemonsQuery } from '../../store/pokemonList/pokemonApi';
import { getErrorMessage } from '../../utils/getErrorMessage';

export function CardList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('search') ?? '';
  const page = Number(searchParams.get('page')) || 1;

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
    const params = new URLSearchParams(searchParams);

    params.set('page', String(newPage));

    setSearchParams(params);
  };

  return (
    <section
      data-testid="card-list"
      className="flex grow flex-col items-center justify-center gap-8 rounded-lg border border-[var(--border)] bg-[var(--bg)] p-8"
    >
      {isFetching && <Spinner className="w-100" />}

      {isError && <div className="error">{getErrorMessage(error)}</div>}

      {!isFetching && !isError && (
        <>
          <div className="flex grow flex-wrap items-center justify-center gap-6">
            {pokemons?.map((pokemon) => (
              <Card key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>

          {!query && <Pagination page={page} onPageChange={handlePageChange} />}
        </>
      )}
    </section>
  );
}

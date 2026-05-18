import { useState } from 'react';
import type { Pokemon } from '../api/search-api-types';
import { Spinner } from './ui/spinner';
import { useNavigate, useSearchParams } from 'react-router';
import { PokemonTypesList } from './pokemon-type-list';

type CardProps = {
  pokemon: Pokemon;
};

export function Card({ pokemon }: CardProps) {
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const handleOpenDetails = (pokemonId: number) => {
    const params = new URLSearchParams(searchParams);

    params.set('details', String(pokemonId));

    navigate({
      pathname: '/details',
      search: params.toString(),
    });
  };

  const handleImageLoad = () => {
    setLoading(false);
  };

  const src =
    pokemon.sprites.other?.showdown?.front_default ??
    pokemon.sprites.front_default ??
    undefined;

  return (
    <div
      onClick={() => handleOpenDetails(pokemon.id)}
      data-testid="card"
      className="relative z-10 h-76 w-60 rounded-lg"
      key={pokemon.id}
    >
      <div className="flex h-full w-full flex-col p-3">
        <div className="flex h-[140px] flex-shrink-0 items-center justify-center">
          {loading && (
            <div className="absolute">
              <Spinner className="w-35 text-[var(--text)]" />
            </div>
          )}

          <img
            src={src}
            alt={`${pokemon.name} image`}
            onLoad={handleImageLoad}
          />
        </div>
        <div className="flex flex-col gap-1">
          <p>№ {pokemon.id}</p>
          <p className="text-2xl font-bold text-[var(--text-h)]">
            {pokemon.name}
          </p>
          <p className="text-justify">{pokemon.description}</p>
        </div>
      </div>
      <div className="absolute bottom-0 -z-10 h-3/4 w-full rounded-3xl bg-[var(--border)] shadow-xl"></div>
    </div>
  );
}

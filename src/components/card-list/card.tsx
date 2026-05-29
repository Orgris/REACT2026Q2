import { useState } from 'react';
import type { Pokemon } from '../../types/pokemon';
import { Spinner } from '../ui/spinner';
import { useNavigate, useSearchParams } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { selectSelectedPokemonsById } from '../../store/selectedPokemons/selectedPokemonsSelectors';
import { togglePokemonSelection } from '../../store/selectedPokemons/selectedPokemonsSlice';
import { getPokemonImageSrc } from '../../utils/getPokemonImageSrc';
import { PokemonTypesList } from './pokemon-type-list';

type CardProps = {
  pokemon: Pokemon;
};

export function Card({ pokemon }: CardProps) {
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const selectedPokemonsById = useAppSelector(selectSelectedPokemonsById);
  const isSelected = !!selectedPokemonsById[pokemon.id];

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();

    dispatch(togglePokemonSelection(pokemon));
  };

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

  const src = getPokemonImageSrc(pokemon);

  return (
    <div
      onClick={() => handleOpenDetails(pokemon.id)}
      data-testid="card"
      className="group relative z-10 w-60 cursor-pointer rounded-lg"
      key={pokemon.id}
    >
      <input
        className="absolute top-5 right-5 cursor-pointer rounded-lg opacity-0 transition-all duration-500 ease-in-out group-hover:opacity-100"
        type="checkbox"
        checked={isSelected}
        onChange={handleCheckboxChange}
        onClick={(e) => e.stopPropagation()}
      />

      <div className="flex h-full w-full flex-col p-6">
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
        <div className="flex flex-col gap-2">
          <p className="text-sm opacity-70">
            #{pokemon.id.toString().padStart(3, '0')}
          </p>

          <p className="text-2xl font-bold text-[var(--text-h)] capitalize">
            {pokemon.name}
          </p>

          <PokemonTypesList types={pokemon.types} />
        </div>
      </div>
      <div
        className={`absolute bottom-0 -z-10 h-3/4 w-full rounded-3xl border-2 border-[var(--border)] bg-transparent shadow-xl transition-all duration-300 ease-in-out group-hover:h-full group-hover:bg-white/5 ${isSelected ? '!border-[var(--accent)]' : ''}`}
      ></div>
    </div>
  );
}

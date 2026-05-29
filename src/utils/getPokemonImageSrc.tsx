import type { Pokemon } from '../types/pokemon';

export const getPokemonImageSrc = (pokemon: Pokemon) => {
  return (
    pokemon.sprites.other?.showdown?.front_default ??
    pokemon.sprites.front_default ??
    undefined
  );
};

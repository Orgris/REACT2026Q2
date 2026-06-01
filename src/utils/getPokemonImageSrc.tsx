import type { Pokemon, PokemonDetailsData } from '../types/pokemon';

export const getPokemonImageSrc = (
  pokemon: Pokemon | PokemonDetailsData | undefined
) => {
  return pokemon
    ? (pokemon.sprites.other?.showdown?.front_default ??
        pokemon.sprites.front_default ??
        undefined)
    : '';
};

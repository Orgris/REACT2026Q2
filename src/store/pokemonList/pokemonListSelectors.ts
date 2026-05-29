import type { RootState } from '..';

export const selectPokemons = (state: RootState) => state.pokemonList.pokemons;

export const selectLoading = (state: RootState) => state.pokemonList.loading;

export const selectError = (state: RootState) => state.pokemonList.error;

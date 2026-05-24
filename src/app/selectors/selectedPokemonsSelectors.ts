import type { RootState } from '../store';

export const selectSelectedPokemonIds = (state: RootState) =>
  state.selectedPokemons.selectedPokemonIds;

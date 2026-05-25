import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export const selectSelectedPokemonsById = (state: RootState) =>
  state.selectedPokemons.selectedPokemonsById;

export const selectSelectedPokemons = createSelector(
  [selectSelectedPokemonsById],

  (selectedPokemonsById) => Object.values(selectedPokemonsById)
);

export const selectSelectedPokemonsCount = createSelector(
  [selectSelectedPokemonsById],

  (selectedPokemonsById) => Object.keys(selectedPokemonsById).length
);

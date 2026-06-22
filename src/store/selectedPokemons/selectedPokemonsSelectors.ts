import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '..';

export const selectSelectedPokemonsById = (state: RootState) =>
  state.selectedPokemons.selectedPokemonsById;

export const selectSelectedPokemons = createSelector(
  [selectSelectedPokemonsById],

  (selectedPokemonsById) => Object.values(selectedPokemonsById)
);

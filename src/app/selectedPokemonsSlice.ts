import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Pokemon } from '../api/search-api-types';

interface SelectedPokemonsState {
  selectedPokemonsById: Record<number, Pokemon>;
}

const initialState: SelectedPokemonsState = {
  selectedPokemonsById: {},
};

const selectedPokemonsSlice = createSlice({
  name: 'selectedPokemons',

  initialState,

  reducers: {
    togglePokemonSelection: (state, action: PayloadAction<Pokemon>) => {
      const pokemon = action.payload;

      const pokemonId = pokemon.id;

      const isSelected = !!state.selectedPokemonsById[pokemonId];

      if (isSelected) {
        delete state.selectedPokemonsById[pokemonId];
      } else {
        state.selectedPokemonsById[pokemonId] = pokemon;
      }
    },

    clearSelection: (state) => {
      state.selectedPokemonsById = {};
    },
  },
});

export const { togglePokemonSelection, clearSelection } =
  selectedPokemonsSlice.actions;

export default selectedPokemonsSlice.reducer;

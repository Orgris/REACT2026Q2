import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Pokemon } from '../../types/pokemon';

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
    selectPokemon: (state, action: PayloadAction<Pokemon>) => {
      const pokemon = action.payload;
      const pokemonId = pokemon.id;

      state.selectedPokemonsById[pokemonId] = pokemon;
    },

    deselectPokemon: (state, action: PayloadAction<number>) => {
      const pokemonId = action.payload;

      state.selectedPokemonsById = Object.fromEntries(
        Object.entries(state.selectedPokemonsById).filter(
          ([key]) => Number(key) !== pokemonId
        )
      );
    },

    clearSelection: (state) => {
      state.selectedPokemonsById = {};
    },
  },
});

export const { selectPokemon, deselectPokemon, clearSelection } =
  selectedPokemonsSlice.actions;

export default selectedPokemonsSlice.reducer;

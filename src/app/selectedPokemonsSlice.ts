import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface SelectedPokemonsState {
  selectedPokemonIds: number[];
}

const initialState: SelectedPokemonsState = {
  selectedPokemonIds: [],
};

const selectedPokemonsSlice = createSlice({
  name: 'selectedPokemons',

  initialState,

  reducers: {
    togglePokemonSelection: (state, action: PayloadAction<number>) => {
      const pokemonId = action.payload;

      const isSelected = state.selectedPokemonIds.includes(pokemonId);

      if (isSelected) {
        state.selectedPokemonIds = state.selectedPokemonIds.filter(
          (id) => id !== pokemonId
        );
      } else {
        state.selectedPokemonIds.push(pokemonId);
      }
    },

    clearSelection: (state) => {
      state.selectedPokemonIds = [];
    },
  },
});

export const { togglePokemonSelection, clearSelection } =
  selectedPokemonsSlice.actions;

export default selectedPokemonsSlice.reducer;

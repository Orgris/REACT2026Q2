import { createSlice } from '@reduxjs/toolkit';
import type { PokemonListState } from './types';
import { fetchPokemons } from './pokemonListThunk';

const initialState: PokemonListState = {
  pokemons: [],
  loading: false,
  error: null,

  currentRequestId: undefined,
};

const pokemonListSlice = createSlice({
  name: 'pokemonList',

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchPokemons.pending, (state, action) => {
        state.loading = true;
        state.error = null;

        state.currentRequestId = action.meta.requestId;
      })

      .addCase(fetchPokemons.fulfilled, (state, action) => {
        if (state.currentRequestId !== action.meta.requestId) {
          return;
        }

        state.loading = false;

        state.pokemons = action.payload;
      })

      .addCase(fetchPokemons.rejected, (state, action) => {
        if (state.currentRequestId !== action.meta.requestId) {
          return;
        }

        state.loading = false;

        state.error =
          typeof action.payload === 'string'
            ? action.payload
            : 'Unexpected error';
      });
  },
});

export default pokemonListSlice.reducer;

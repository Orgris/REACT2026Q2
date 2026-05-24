import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Pokemon } from '../api/search-api-types';
import { fetchPokemonList } from '../api/search-api';

type FetchPokemonsArgs = {
  query: string;
  page: number;
};

interface PokemonListState {
  pokemons: Pokemon[];
  loading: boolean;
  error: string | null;

  currentRequestId?: string;
}

const LIST_ITEM_LIMIT = 20;

const initialState: PokemonListState = {
  pokemons: [],
  loading: false,
  error: null,

  currentRequestId: undefined,
};

export const fetchPokemons = createAsyncThunk(
  'pokemonList/fetchPokemons',

  async ({ query, page }: FetchPokemonsArgs, thunkAPI) => {
    try {
      const offset = (page - 1) * LIST_ITEM_LIMIT;

      const pokemons = await fetchPokemonList(query, offset, LIST_ITEM_LIMIT);

      return pokemons;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error instanceof Error ? error.message : 'Unexpected error'
      );
    }
  }
);

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

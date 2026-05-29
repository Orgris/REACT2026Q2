import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPokemonList } from '../../services/search-api';
import type { FetchPokemonsArgs } from './types';

const LIST_ITEM_LIMIT = 20;

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

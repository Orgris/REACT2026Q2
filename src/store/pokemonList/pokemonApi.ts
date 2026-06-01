import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { FetchPokemonsArgs, Pokemon } from '../../types/pokemon';
import { fetchPokemonList } from '../../services/search-api';
import { LIST_ITEM_LIMIT } from '../../constants/api';

const CACHE_TTL = Number(import.meta.env.VITE_CACHE_TTL_SECONDS) || 30;

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  keepUnusedDataFor: CACHE_TTL,

  endpoints: (builder) => ({
    getPokemons: builder.query<Pokemon[], FetchPokemonsArgs>({
      queryFn: async ({ query, page }) => {
        try {
          const offset = (page - 1) * LIST_ITEM_LIMIT;
          const pokemons = await fetchPokemonList(
            query,
            offset,
            LIST_ITEM_LIMIT
          );
          return { data: pokemons };
        } catch (error) {
          return {
            error: {
              status: 'CUSTOM_ERROR',
              error:
                error instanceof Error ? error.message : 'Unexpected error',
            },
          };
        }
      },
    }),
  }),
});

export const { useGetPokemonsQuery } = pokemonApi;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { PokemonDetailsData } from '../../types/pokemon';
import { fetchPokemonDetails } from '../../services/search-api';

export const detailsApi = createApi({
  reducerPath: 'detailsApi',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  keepUnusedDataFor: 30,

  endpoints: (builder) => ({
    getPokemonDetails: builder.query<PokemonDetailsData, string>({
      queryFn: async (id: string) => {
        try {
          const details = await fetchPokemonDetails(id);
          return { data: details };
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

export const { useGetPokemonDetailsQuery } = detailsApi;

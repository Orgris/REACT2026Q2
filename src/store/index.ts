import { configureStore } from '@reduxjs/toolkit';
import errorButtonReducer from './errorButton/errorButtonSlice';
import selectedPokemonsReducer from './selectedPokemons/selectedPokemonsSlice';
import { pokemonApi } from './pokemonList/pokemonApi';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import { detailsApi } from './selectedPokemons/detailsApi';

export const store = configureStore({
  reducer: {
    errorButton: errorButtonReducer,
    selectedPokemons: selectedPokemonsReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    [detailsApi.reducerPath]: detailsApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware, detailsApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

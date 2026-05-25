import { configureStore } from '@reduxjs/toolkit';
import errorButtonReducer from './errorButtonSlice';
import pokemonListReducer from './pokemonListSlice';
import selectedPokemonsReducer from './selectedPokemonsSlice';

export const store = configureStore({
  reducer: {
    errorButton: errorButtonReducer,
    pokemonList: pokemonListReducer,
    selectedPokemons: selectedPokemonsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

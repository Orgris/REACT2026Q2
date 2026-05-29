import { configureStore } from '@reduxjs/toolkit';
import errorButtonReducer from './errorButton/errorButtonSlice';
import pokemonListReducer from './pokemonList/pokemonListSlice';
import selectedPokemonsReducer from './selectedPokemons/selectedPokemonsSlice';

export const store = configureStore({
  reducer: {
    errorButton: errorButtonReducer,
    pokemonList: pokemonListReducer,
    selectedPokemons: selectedPokemonsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

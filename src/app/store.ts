import { configureStore } from '@reduxjs/toolkit';
import errorButtonReducer from './errorButtonSlice';
import pokemonListReducer from './pokemonListSlice';

export const store = configureStore({
  reducer: {
    errorButton: errorButtonReducer,
    pokemonList: pokemonListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

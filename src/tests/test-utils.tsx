import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router';
import { pokemonApi } from '../store/pokemonList/pokemonApi';
import type { ReactElement } from 'react';
import { detailsApi } from '../store/selectedPokemons/detailsApi';

export const createTestStore = (preloadedState = {}) =>
  configureStore({
    reducer: {
      [pokemonApi.reducerPath]: pokemonApi.reducer,
      [detailsApi.reducerPath]: detailsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        pokemonApi.middleware,
        detailsApi.middleware
      ),
    preloadedState,
  });

export const renderWithProviders = (
  ui: ReactElement,
  options: {
    initialEntries?: string[];
    preloadedState?: Record<string, unknown>;
    store?: ReturnType<typeof createTestStore>;
  } = {}
) => {
  const { initialEntries = ['/'], preloadedState = {} } = options;
  const store = options.store || createTestStore(preloadedState);

  return {
    ...render(
      <Provider store={store}>
        <MemoryRouter initialEntries={initialEntries}>{ui}</MemoryRouter>
      </Provider>
    ),
    store,
  };
};

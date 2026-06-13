import { render, type RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import appReducer from '../store/user/appSlice';
import type { ReactElement } from 'react';
import type { RootState } from '../store';

// Начальное состояние для тестов
export const initialTestState: RootState['appData'] = {
  users: [],
  countries: ['USA', 'Canada', 'UK', 'Germany', 'France', 'Russia'],
  genders: ['male', 'female', 'other'],
};

export function createTestStore(preloadedState: Partial<RootState> = {}) {
  return configureStore({
    reducer: {
      appData: appReducer,
    },
    preloadedState: {
      appData: {
        ...initialTestState,
        ...preloadedState.appData,
      },
    },
  });
}

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  preloadedState?: Partial<RootState>;
  store?: ReturnType<typeof createTestStore>;
}

export function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState = {},
    store = createTestStore(preloadedState),
    ...renderOptions
  }: CustomRenderOptions = {}
) {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}

export const createMockState = (
  overrides: Partial<RootState> = {}
): RootState => ({
  appData: {
    users: [],
    countries: initialTestState.countries,
    genders: initialTestState.genders,
    ...overrides.appData,
  },
});

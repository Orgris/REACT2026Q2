import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Home from '../components/pages/home/home';
import { ThemeProvider } from '../providers/theme-provider';
import { store } from '../app/store';
import { Provider } from 'react-redux';

describe('Home', () => {
  it('should render main layout sections', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ThemeProvider>
            <Home />
          </ThemeProvider>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('RS School')).toBeInTheDocument();
    expect(screen.getByText('Search your Pokémon!')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Who's that Pokémon?")
    ).toBeInTheDocument();
    expect(screen.getByTestId('card-list')).toBeInTheDocument();
    expect(screen.getByText('Click me!')).toBeInTheDocument();
  });

  it('reads value from localStorage on mount', () => {
    localStorage.setItem('searchString', 'pikachu');

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ThemeProvider>
            <Home />
          </ThemeProvider>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('search-input')).toHaveValue('pikachu');
  });

  it('reads empty value from localStorage on mount', () => {
    localStorage.setItem('searchString', '');

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ThemeProvider>
            <Home />
          </ThemeProvider>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('search-input')).toHaveValue('');
  });
});

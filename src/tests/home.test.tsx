import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from '../components/pages/home';
import { MemoryRouter } from 'react-router';

describe('Home', () => {
  it('should render main layout sections', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
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
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByTestId('search-input')).toHaveValue('pikachu');
  });

  it('reads empty value from localStorage on mount', () => {
    localStorage.setItem('searchString', '');

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByTestId('search-input')).toHaveValue('');
  });
});

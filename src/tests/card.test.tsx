import { fireEvent, render, screen } from '@testing-library/react';
import type { Pokemon } from '../types/pokemon';
import { Card } from '../components/card-list/card';
import { mockPokemon } from './mocks';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { store } from '../store';

describe('Card', () => {
  test('renders pokemon info', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Card pokemon={mockPokemon} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/#001/i)).toBeInTheDocument();
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  });

  test('renders image with correct alt and src', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Card pokemon={mockPokemon} />
        </MemoryRouter>
      </Provider>
    );
    const image = screen.getByAltText('pikachu image') as HTMLImageElement;

    expect(image).toBeInTheDocument();
    expect(image.src).toContain('showdown.png');
  });

  test('shows spinner before image load', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Card pokemon={mockPokemon} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  test('hides spinner after image load', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Card pokemon={mockPokemon} />
        </MemoryRouter>
      </Provider>
    );

    const image = screen.getByAltText('pikachu image');

    expect(screen.getByTestId('spinner')).toBeInTheDocument();

    fireEvent.load(image);

    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
  });

  test('uses fallback image if showdown image does not exist', () => {
    const pokemonWithoutShowdown: Pokemon = {
      ...mockPokemon,
      sprites: {
        front_default: 'fallback.png',
      },
    };
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Card pokemon={pokemonWithoutShowdown} />
        </MemoryRouter>
      </Provider>
    );

    const image = screen.getByAltText('pikachu image') as HTMLImageElement;

    expect(image.src).toContain('fallback.png');
  });

  test('renders image without src if all images are missing', () => {
    const pokemonWithoutImages: Pokemon = {
      ...mockPokemon,
      sprites: {
        front_default: null,
      },
    };

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Card pokemon={pokemonWithoutImages} />
        </MemoryRouter>
      </Provider>
    );

    const image = screen.getByAltText('pikachu image');

    expect(image.getAttribute('src')).toBeNull();
  });
});

import { fireEvent, render, screen } from '@testing-library/react';
import type { Pokemon } from '../api/search-api-types';
import { Card } from '../components/pages/home/card';
import { mockPokemon } from './mocks';
import { MemoryRouter } from 'react-router';

describe('Card', () => {
  test('renders pokemon info', () => {
    render(
      <MemoryRouter>
        <Card pokemon={mockPokemon} />
      </MemoryRouter>
    );

    expect(screen.getByText(/#001/i)).toBeInTheDocument();
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  });

  test('renders image with correct alt and src', () => {
    render(
      <MemoryRouter>
        <Card pokemon={mockPokemon} />
      </MemoryRouter>
    );
    const image = screen.getByAltText('pikachu image') as HTMLImageElement;

    expect(image).toBeInTheDocument();
    expect(image.src).toContain('showdown.png');
  });

  test('shows spinner before image load', () => {
    render(
      <MemoryRouter>
        <Card pokemon={mockPokemon} />
      </MemoryRouter>
    );
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  test('hides spinner after image load', () => {
    render(
      <MemoryRouter>
        <Card pokemon={mockPokemon} />
      </MemoryRouter>
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
      <MemoryRouter>
        <Card pokemon={pokemonWithoutShowdown} />
      </MemoryRouter>
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
      <MemoryRouter>
        <Card pokemon={pokemonWithoutImages} />
      </MemoryRouter>
    );

    const image = screen.getByAltText('pikachu image');

    expect(image.getAttribute('src')).toBeNull();
  });
});

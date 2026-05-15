import { fireEvent, render, screen } from '@testing-library/react';
import type { Pokemon } from '../api/search-api-types';
import { Card } from '../components/card';
import { mockPokemon } from './mocks';

describe('Card', () => {
  test('renders pokemon info', () => {
    render(<Card pokemon={mockPokemon} />);

    expect(screen.getByText(/№ 1/i)).toBeInTheDocument();
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    expect(screen.getByText(/pokemon description/i)).toBeInTheDocument();
  });

  test('renders image with correct alt and src', () => {
    render(<Card pokemon={mockPokemon} />);

    const image = screen.getByAltText('pikachu image') as HTMLImageElement;

    expect(image).toBeInTheDocument();
    expect(image.src).toContain('showdown.png');
  });

  test('shows spinner before image load', () => {
    render(<Card pokemon={mockPokemon} />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  test('hides spinner after image load', () => {
    render(<Card pokemon={mockPokemon} />);

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

    render(<Card pokemon={pokemonWithoutShowdown} />);

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

    render(<Card pokemon={pokemonWithoutImages} />);

    const image = screen.getByAltText('pikachu image');

    expect(image.getAttribute('src')).toBeNull();
  });
});

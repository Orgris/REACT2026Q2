import { vi } from 'vitest';
import type { SVGProps } from 'react';
import type { Pokemon } from '../api/search-api-types';

vi.mock('../assets/pokeball.svg?react', () => ({
  default: ({ className, ...props }: SVGProps<SVGSVGElement>) => (
    <svg className={className} {...props} />
  ),
}));

export const mockPokemon: Pokemon = {
  id: 1,
  order: 1,
  name: 'pikachu',
  sprites: {
    front_default: 'front.png',
    other: {
      showdown: {
        front_default: 'showdown.png',
      },
    },
  },
  description: 'pokemon description',
};

export const mockPokemon2: Pokemon = {
  id: 2,
  order: 2,
  name: 'psyduck',
  sprites: {
    front_default: 'front.png',
    other: {
      showdown: {
        front_default: 'showdown.png',
      },
    },
  },
  description: 'psyduck description',
};

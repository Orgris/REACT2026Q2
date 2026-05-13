import { vi } from 'vitest';
import type { SVGProps } from 'react';
import type { Pokemon } from '../api/search-api-types';

vi.mock('../assets/pokeball.svg?react', () => ({
  default: ({ className, ...props }: SVGProps<SVGSVGElement>) => (
    <svg className={className} {...props} />
  ),
}));

const store: Record<string, string | null> = {};

export const localStorageMock = {
  getItem: vi.fn((key: string) => store[key] ?? null),
  setItem: vi.fn((key: string, value: string) => {
    store[key] = value;
  }),
  removeItem: vi.fn((key: string) => {
    delete store[key];
  }),
  clear: vi.fn(() => {
    Object.keys(store).forEach((key) => delete store[key]);
  }),
};

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

import { vi } from 'vitest';
import type { SVGProps } from 'react';
import type { Pokemon, PokemonDetailsData } from '../types/pokemon';

vi.mock('../assets/pokeball.svg?react', () => ({
  default: ({ className, ...props }: SVGProps<SVGSVGElement>) => (
    <svg className={className} {...props} />
  ),
}));

export const mockPokemon: Pokemon = {
  id: 1,
  order: 1,
  name: 'pikachu',
  base_experience: 112,
  height: 4,
  weight: 60,

  abilities: [
    {
      ability: { name: 'static' },
      is_hidden: false,
    },
    {
      ability: { name: 'lightning-rod' },
      is_hidden: true,
    },
  ],

  stats: [
    { base_stat: 35, stat: { name: 'hp' } },
    { base_stat: 55, stat: { name: 'attack' } },
    { base_stat: 40, stat: { name: 'defense' } },
    { base_stat: 50, stat: { name: 'special-attack' } },
    { base_stat: 50, stat: { name: 'special-defense' } },
    { base_stat: 90, stat: { name: 'speed' } },
  ],

  species: {
    name: 'pikachu',
    url: 'https://pokeapi.co/api/v2/pokemon-species/25/',
  },

  types: [
    {
      slot: 1,
      type: { name: 'electric', url: 'https://pokeapi.co/api/v2/type/13/' },
    },
  ],

  sprites: {
    front_default: 'front.png',
    other: {
      showdown: {
        front_default: 'showdown.png',
      },
    },
  },
};

export const mockPokemon2: Pokemon = {
  id: 2,
  order: 2,
  name: 'psyduck',
  base_experience: 112,
  height: 4,
  weight: 60,

  abilities: [
    {
      ability: { name: 'static' },
      is_hidden: false,
    },
    {
      ability: { name: 'lightning-rod' },
      is_hidden: true,
    },
  ],

  stats: [
    { base_stat: 35, stat: { name: 'hp' } },
    { base_stat: 55, stat: { name: 'attack' } },
    { base_stat: 40, stat: { name: 'defense' } },
    { base_stat: 50, stat: { name: 'special-attack' } },
    { base_stat: 50, stat: { name: 'special-defense' } },
    { base_stat: 90, stat: { name: 'speed' } },
  ],

  species: {
    name: 'pikachu',
    url: 'https://pokeapi.co/api/v2/pokemon-species/25/',
  },

  types: [
    {
      slot: 1,
      type: { name: 'electric', url: 'https://pokeapi.co/api/v2/type/13/' },
    },
  ],

  sprites: {
    front_default: 'front.png',
    other: {
      showdown: {
        front_default: 'showdown.png',
      },
    },
  },
};

export const mockDetails: PokemonDetailsData = {
  id: 1,
  order: 1,
  name: 'pikachu',
  base_experience: 112,
  height: 4,
  weight: 60,

  abilities: [
    {
      ability: { name: 'static' },
      is_hidden: false,
    },
    {
      ability: { name: 'lightning-rod' },
      is_hidden: true,
    },
  ],

  stats: [
    { base_stat: 35, stat: { name: 'hp' } },
    { base_stat: 55, stat: { name: 'attack' } },
    { base_stat: 40, stat: { name: 'defense' } },
    { base_stat: 50, stat: { name: 'special-attack' } },
    { base_stat: 50, stat: { name: 'special-defense' } },
    { base_stat: 90, stat: { name: 'speed' } },
  ],

  species: {
    name: 'pikachu',
    url: 'https://pokeapi.co/api/v2/pokemon-species/25/',
  },

  types: [
    {
      slot: 1,
      type: { name: 'electric', url: 'https://pokeapi.co/api/v2/type/13/' },
    },
  ],

  sprites: {
    front_default: 'front.png',
    other: {
      showdown: {
        front_default: 'showdown.png',
      },
    },
  },
  description: 'description',
};

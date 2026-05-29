import type { PokemonSpecies } from '../types/pokemon';

export const getEnglishDescription = (
  entries: PokemonSpecies['flavor_text_entries']
): string => {
  const entry = entries.find((e) => e.language.name === 'en');

  return entry ? entry.flavor_text.replace(/\f|\n/g, ' ') : '';
};

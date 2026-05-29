import { headers } from '../constants/csvHeaders';
import type { Pokemon } from '../types/pokemon';
import { getPokemonImageSrc } from './getPokemonImageSrc';

export const pokemonDownload = (
  selectedPokemons: Pokemon[],
  selectedCount: number
) => {
  const rows = selectedPokemons.map((pokemon) => {
    const image = getPokemonImageSrc(pokemon);

    const types = pokemon.types.map((type) => type.type.name).join(' | ');

    const abilities = pokemon.abilities
      .map((ability) => ability.ability.name)
      .join(' | ');

    const stats = pokemon.stats
      .map((stat) => `${stat.stat.name} = ${stat.base_stat}`)
      .join(' | ');

    const detailsUrl =
      `${window.location.origin}` +
      `${window.location.pathname}` +
      `#/details?details=${pokemon.id}`;

    return [
      pokemon.id,
      pokemon.name,
      pokemon.order,
      pokemon.base_experience,
      pokemon.height,
      pokemon.weight,

      abilities,
      stats,
      types,

      image,
      detailsUrl,
    ];
  });

  const csvContent = [
    headers.join(','),
    ...rows.map((row) => row.join(',')),
  ].join('\n');

  const blob = new Blob([csvContent], {
    type: 'text/csv;charset=utf-8;',
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');

  link.href = url;

  link.download = `${selectedCount}_items.csv`;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};

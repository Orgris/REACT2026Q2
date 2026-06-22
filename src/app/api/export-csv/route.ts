import { NextRequest } from 'next/server';
import { Pokemon } from '../../../types/pokemon';
import { getPokemonImageSrc } from '../../../utils/getPokemonImageSrc';
import { headers } from '../../../constants/csvHeaders';

export async function POST(request: NextRequest) {
  const { selectedPokemons } = (await request.json()) as {
    selectedPokemons: Pokemon[];
  };

  const rows = selectedPokemons.map((pokemon) => {
    const image = getPokemonImageSrc(pokemon);

    const types = pokemon.types.map((type) => type.type.name).join(' | ');

    const abilities = pokemon.abilities
      .map((ability) => ability.ability.name)
      .join(' | ');
    const stats = pokemon.stats
      .map((stat) => `${stat.stat.name} = ${stat.base_stat}`)
      .join(' | ');

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const detailsUrl = `${baseUrl}/en?details=${pokemon.id}`;

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

  return new Response(csvContent, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="pokemon-export.csv"',
    },
  });
}

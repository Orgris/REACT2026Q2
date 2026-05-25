import type { PokemonType } from '../../../api/search-api-types';

const TYPE_COLORS: Record<string, string> = {
  fire: 'border-orange-400/40 bg-orange-400/10 text-orange-400',
  water: 'border-blue-400/40 bg-blue-400/10 text-blue-400',
  ice: 'border-cyan-300/40 bg-cyan-300/10 text-cyan-300',
  grass: 'border-green-400/40 bg-green-400/10 text-green-400',
  bug: 'border-lime-400/40 bg-lime-400/10 text-lime-400',
  electric: 'text-black border-yellow-400/40 bg-yellow-400/10 text-yellow-400',
  psychic: 'border-pink-400/40 bg-pink-400/10 text-pink-400',
  ghost: 'border-violet-400/40 bg-violet-400/10 text-violet-400',
  fairy: 'border-rose-400/40 bg-rose-400/10 text-rose-400',
  dragon: 'border-indigo-600/40 bg-indigo-600/10 text-indigo-600',
  fighting: 'border-red-600/40 bg-red-600/10 text-red-600',
  poison: 'border-purple-400/40 bg-purple-400/10 text-purple-400',
  ground: 'border-amber-600/40 bg-amber-600/10 text-amber-600',
  flying: 'border-sky-400/40 bg-sky-400/10 text-sky-400',
  rock: 'border-stone-400/40 bg-stone-400/10 text-stone-400',
  steel: 'border-slate-400/40 bg-slate-400/10 text-slate-400',
  dark: 'border-gray-600/40 bg-gray-600/10 text-gray-600',
  normal: 'border-gray-400/40 bg-gray-400/10 text-gray-400',
};

interface PokemonTypesListProps {
  types: PokemonType[];
}

export function PokemonTypesList({ types }: PokemonTypesListProps) {
  const sortedTypes = [...types].sort((a, b) => a.slot - b.slot);

  const getTypeColor = (typeName: string): string => {
    return TYPE_COLORS[typeName] || '';
  };

  return (
    <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
      {sortedTypes.map(({ slot, type }) => (
        <p
          key={slot}
          className={`rounded-lg border-2 px-3 py-1 text-sm font-medium uppercase ${getTypeColor(type.name)}`}
        >
          {type.name}
        </p>
      ))}
    </div>
  );
}

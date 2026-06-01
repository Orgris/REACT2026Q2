import { TYPE_COLORS } from '../../constants/type-colors';
import type { PokemonType } from '../../types/pokemon';

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

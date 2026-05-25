import { useAppDispatch, useAppSelector } from '../../app/hooks/hooks';
import { clearSelection } from '../../app/selectedPokemonsSlice';
import {
  selectSelectedPokemons,
  selectSelectedPokemonsCount,
} from '../../app/selectors/selectedPokemonsSelectors';
import { Button } from './button';

export function Flyout() {
  const dispatch = useAppDispatch();
  const selectedCount = useAppSelector(selectSelectedPokemonsCount);
  const selectedPokemons = useAppSelector(selectSelectedPokemons);

  const handleUnselect = () => {
    dispatch(clearSelection());
  };

  const handleDownload = () => {
    const headers = [
      'id',
      'name',
      'order',
      'baseExperience',
      'height',
      'weight',

      'abilities',
      'stats',
      'types',

      'image',
      'detailsUrl',
    ];

    const rows = selectedPokemons.map((pokemon) => {
      const image =
        pokemon.sprites.other?.showdown?.front_default ??
        pokemon.sprites.front_default ??
        '';

      const types = pokemon.types.map((type) => type.type.name).join(' | ');

      const abilities = pokemon.abilities
        .map((ability) => ability.ability.name)
        .join(' | ');

      const stats = pokemon.stats
        .map((stat) => `${stat.stat.name} = ${stat.base_stat}`)
        .join(' | ');

      const detailsUrl =
        `${window.location.origin}` + `/#/details?details=${pokemon.id}`;

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

  return (
    <div
      className={`fixed right-1/5 bottom-0 z-20 flex -translate-x-1/2 flex-col gap-5 rounded-lg border border-[var(--border)] bg-[var(--bg)] p-6 transition duration-300 ${selectedCount ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="flex flex-col gap-2">
        <p>Selected pokemons</p>
        <p>{selectedCount}</p>
      </div>
      <div className="flex gap-5">
        <Button onClick={handleUnselect}>Unselect all</Button>
        <Button onClick={handleDownload}>Download</Button>
      </div>
    </div>
  );
}

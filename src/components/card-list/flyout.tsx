import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {
  selectSelectedPokemonsCount,
  selectSelectedPokemons,
} from '../../store/selectedPokemons/selectedPokemonsSelectors';
import { clearSelection } from '../../store/selectedPokemons/selectedPokemonsSlice';
import { pokemonDownload } from '../../utils/pokemonDownload';
import { Button } from '../ui/button/button';

export function Flyout() {
  const dispatch = useAppDispatch();
  const selectedCount = useAppSelector(selectSelectedPokemonsCount);
  const selectedPokemons = useAppSelector(selectSelectedPokemons);

  const handleUnselectClick = () => {
    dispatch(clearSelection());
  };

  const handleDownloadClick = () => {
    pokemonDownload(selectedPokemons, selectedCount);
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
        <Button onClick={handleUnselectClick}>Unselect all</Button>
        <Button onClick={handleDownloadClick}>Download</Button>
      </div>
    </div>
  );
}

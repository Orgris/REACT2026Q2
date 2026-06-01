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
      className={`fixed bottom-0 left-1/2 z-20 flex w-fit -translate-x-1/2 gap-5 rounded-lg border-2 border-[var(--border)] bg-[var(--bg)] p-2.5 transition duration-300 ${selectedCount ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="flex items-center gap-2">
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

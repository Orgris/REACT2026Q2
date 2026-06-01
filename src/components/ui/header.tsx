import { NavLink, useSearchParams } from 'react-router';
import { Button } from './button/button';
import { useTheme } from '../../hooks/useTheme';
import { pokemonApi } from '../../store/pokemonList/pokemonApi';
import { useAppDispatch } from '../../hooks/hooks';
import { detailsApi } from '../../store/selectedPokemons/detailsApi';

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  const detailsId = searchParams.get('details');

  const handleListInvalidation = () => {
    dispatch(pokemonApi.util.invalidateTags([{ type: 'Pokemon', id: 'LIST' }]));
  };

  const handleSelectedInvalidation = () => {
    if (detailsId) {
      dispatch(
        detailsApi.util.invalidateTags([
          { type: 'PokemonDetails', id: detailsId },
        ])
      );
    }
  };

  return (
    <header className="flex justify-between gap-3 rounded-b-lg border border-t-0 border-[var(--border)] bg-[var(--bg)] p-6">
      <div className="flex items-center justify-center gap-5">
        <div className="flex items-center justify-center">
          <h1 className="!m-0 my-5 flex items-center">
            <span className="bg-[var(--rss)] px-5 text-4xl leading-tight font-extrabold text-[var(--rss-text)]">
              RS School
            </span>
            <span
              className="-mt-5 block pl-5 text-4xl text-[var(--rss)] [-webkit-text-stroke:10px_var(--pokemon-blue)] [paint-order:stroke_fill] [text-stroke:10px_var(--pokemon-blue)]"
              style={{ fontFamily: 'Pokemon Solid' }}
            >
              Pokédex
            </span>
          </h1>
        </div>
      </div>
      <div className="flex items-center justify-center gap-10">
        <div className="flex items-center justify-center gap-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `font-[var(--mono)] transition ease-in focus-visible:outline focus-visible:outline-2 ${
                isActive
                  ? 'cursor-default text-[var(--accent)]'
                  : 'hover:scale-105 hover:text-[var(--text-h)] focus-visible:outline-[var(--text-h)] active:scale-95'
              }`
            }
          >
            Home
          </NavLink>

          <span>|</span>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `font-[var(--mono)] transition ease-in focus-visible:outline focus-visible:outline-2 ${
                isActive
                  ? 'cursor-default text-[var(--accent)]'
                  : 'hover:scale-105 hover:text-[var(--text-h)] focus-visible:outline-[var(--text-h)] active:scale-95'
              }`
            }
          >
            About
          </NavLink>
        </div>
        <div className="flex items-center justify-center gap-4">
          <Button className="capitalize" onClick={toggleTheme}>
            {theme}
          </Button>
          <Button onClick={handleListInvalidation}>Refresh list</Button>
          <Button onClick={handleSelectedInvalidation} disabled={!detailsId}>
            Refresh selected
          </Button>
        </div>
      </div>
    </header>
  );
}

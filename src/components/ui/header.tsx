import { NavLink } from 'react-router';
import { Button } from './button';
import { useTheme } from '../../hooks/useTheme';

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex justify-between gap-3 rounded-b-lg border border-t-0 border-[var(--border)] bg-[var(--bg)] p-6">
      <div className="flex">
        <div>
          <h1 className="my-5 block flex">
            <span className="block bg-[var(--rss)] px-5 font-extrabold text-[var(--rss-text)]">
              RS School
            </span>
            <span
              className="block pl-5 text-[var(--rss)] [-webkit-text-stroke:10px_var(--pokemon-blue)] [paint-order:stroke_fill] [text-stroke:10px_var(--pokemon-blue)]"
              style={{ fontFamily: 'Pokemon Solid' }}
            >
              Pokédex
            </span>
          </h1>
        </div>
        <p className="self-end text-start">Gotta Catch &apos;Em All!</p>
      </div>
      <div className="flex items-center justify-center gap-6">
        <Button className="capitalize" onClick={toggleTheme}>
          {theme}
        </Button>

        <div className="flex items-center justify-center gap-2">
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
      </div>
    </header>
  );
}

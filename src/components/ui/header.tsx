'use client';

import { Button } from './button/button';
import { useTheme } from '../../hooks/useTheme';
import { pokemonApi } from '../../store/pokemonList/pokemonApi';
import { useAppDispatch } from '../../hooks/hooks';
import { detailsApi } from '../../store/selectedPokemons/detailsApi';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Spinner } from './spinner';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './language-switcher';
import { Link } from '../../i18n/navigation';

export function Header() {
  const t = useTranslations('Header');

  const { theme, toggleTheme } = useTheme();
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const detailsId = searchParams?.get('details');

  const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '') || '/';

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

  const isActive = (path: string) => pathWithoutLocale === path;
  return (
    <header
      className="
        flex justify-between gap-3 rounded-b-lg border border-t-0
        border-(--border) bg-(--bg) p-6
      "
    >
      <div className="flex items-center justify-center gap-5">
        <div className="flex items-center justify-center">
          <h1 className="m-0! my-5 flex items-center">
            <span
              className="
                bg-(--rss) px-5 text-4xl/tight font-extrabold text-(--rss-text)
              "
            >
              RS School
            </span>
            <span
              className="
                -mt-5 block pl-5 text-4xl text-(--rss)
                [-webkit-text-stroke:10px_var(--pokemon-blue)]
                [paint-order:stroke_fill] [text-stroke:10px_var(--pokemon-blue)]
              "
              style={{ fontFamily: 'var(--font-pokemon)' }}
            >
              Pokédex
            </span>
          </h1>
        </div>
      </div>
      <div className="flex items-center justify-center gap-10">
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/about"
            className={`
              font-(--mono) transition ease-in
              focus-visible:outline-2
              ${
                isActive('/about')
                  ? 'cursor-default text-(--accent)'
                  : `
                    hover:scale-105 hover:text-(--text-h)
                    focus-visible:outline-(--text-h)
                    active:scale-95
                  `
              }
            `}
          >
            {t('about')}
          </Link>

          <span>|</span>

          <Link
            href="/"
            className={`
              font-(--mono) transition ease-in
              focus-visible:outline-2
              ${
                isActive('/')
                  ? 'cursor-default text-(--accent)'
                  : `
                    hover:scale-105 hover:text-(--text-h)
                    focus-visible:outline-(--text-h)
                    active:scale-95
                  `
              }
            `}
          >
            {t('home')}
          </Link>
        </div>

        <Suspense fallback={<Spinner className="w-1/15" classNameBG="mx-10" />}>
          <div className="flex items-center justify-center gap-4">
            <LanguageSwitcher />

            <Button className="capitalize" onClick={toggleTheme}>
              {theme === 'dark' ? '🔆' : '😎'}
            </Button>

            <Button onClick={handleListInvalidation}>
              {t('refresh list button')}
            </Button>

            <Button onClick={handleSelectedInvalidation} disabled={!detailsId}>
              {t('refresh selected button')}
            </Button>
          </div>
        </Suspense>
      </div>
    </header>
  );
}

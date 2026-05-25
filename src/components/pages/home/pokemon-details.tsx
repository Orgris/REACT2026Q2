import { useEffect, useState } from 'react';
import { Spinner } from '../../ui/spinner';
import { useNavigate, useSearchParams } from 'react-router';
import type { PokemonDetailsData } from '../../../api/search-api-types';
import { Button } from '../../ui/button';
import { PokemonTypesList } from './pokemon-type-list';
import { fetchDescription, fetchPokemon } from '../../../api/search-api';

const statLabels: Record<string, string> = {
  hp: 'HP',
  attack: 'ATK',
  defense: 'DEF',
  'special-attack': 'SpA',
  'special-defense': 'SpD',
  speed: 'SPD',
};

export function PokemonDetails() {
  const [details, setDetails] = useState<PokemonDetailsData | null>(null);

  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const detailsId = searchParams.get('details');

  const handleClose = () => {
    const params = new URLSearchParams(searchParams);

    params.delete('details');

    navigate({
      pathname: '/',
      search: params.toString(),
    });
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  useEffect(() => {
    if (!detailsId) return;

    const getDetails = async (detailsId: string) => {
      setError(null);
      setLoading(true);
      setImageLoading(true);

      try {
        const pokemonData = await fetchPokemon(
          `https://pokeapi.co/api/v2/pokemon/${detailsId}`
        );
        const description = await fetchDescription(pokemonData.species.url);

        const detailsData: PokemonDetailsData = {
          ...pokemonData,
          description,
        };

        setDetails(detailsData);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Unexpected error';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    getDetails(detailsId);
  }, [detailsId]);

  let src;
  if (details) {
    src =
      details.sprites.other?.showdown?.front_default ??
      details.sprites.front_default ??
      undefined;
  }

  return (
    <aside
      data-testid="aside"
      className="flex min-w-92 flex-col gap-3 rounded-lg border border-[var(--border)] bg-[var(--bg)] p-6"
    >
      <div className="relative sticky top-1/5 flex w-80 flex-col rounded-lg">
        {loading && (
          <div className="mt-80">
            <Spinner className="w-80" />
          </div>
        )}

        {error && <div>{error}</div>}

        {!loading && !error && details && (
          <>
            <Button
              className="absolute right-0 !px-3 !py-1"
              onClick={handleClose}
            >
              X
            </Button>

            <div className="flex h-full w-full flex-col gap-2">
              <div className="flex h-[140px] flex-shrink-0 items-center justify-center">
                {imageLoading && (
                  <div className="absolute">
                    <Spinner className="w-35 text-[var(--text)]" />
                  </div>
                )}

                <img
                  src={src}
                  alt={`${details.name} image`}
                  onLoad={handleImageLoad}
                />
              </div>
              <div className="flex flex-col gap-1">
                <p className="opacity-70">
                  #{details.id.toString().padStart(3, '0')}
                </p>

                <p className="text-2xl font-bold text-[var(--text-h)] capitalize">
                  {details.name}
                </p>
                <PokemonTypesList types={details.types} />
                <p className="text-justify">{details.description}</p>
              </div>

              <div className="flex justify-center gap-10">
                <div>
                  <p className="text-sm">Height</p>

                  <p>{details.height / 10} m</p>
                </div>

                <div>
                  <p className="text-sm">Weight</p>

                  <p>{details.weight / 10} kg</p>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center gap-1">
                <p className="text-sm text-[var(--text-h)]">Abilities</p>

                <div className="flex flex-wrap gap-1">
                  {details.abilities.map((ability) => (
                    <span
                      key={ability.ability.name}
                      className="rounded rounded-lg border-2 bg-[var(--bg-soft)] px-2 py-1 text-sm capitalize"
                    >
                      {ability.ability.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-sm text-[var(--text-h)]">Stats</p>

                <div className="flex items-center justify-center gap-3">
                  {details.stats.map((stat) => (
                    <div key={stat.stat.name} className="text-sm">
                      <p className="capitalize">
                        {statLabels[stat.stat.name] ?? stat.stat.name}
                      </p>

                      <p className="font-medium">{stat.base_stat}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm text-[var(--text-h)]">Base experience</p>

                <p>{details.base_experience}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}

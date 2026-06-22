'use client';

import { Suspense, useState } from 'react';
import { statLabels } from '../../constants/pokemon-stats';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { getPokemonImageSrc } from '../../utils/getPokemonImageSrc';
import { useGetPokemonDetailsQuery } from '../../store/selectedPokemons/detailsApi';
import { Spinner } from '../../components/ui/spinner';
import { PokemonTypesList } from '../../components/card-list/pokemon-type-list';
import { Button } from '../../components/ui/button/button';
import { useRouter, useSearchParams } from 'next/navigation';

export default function PokemonDetails() {
  const [imageLoading, setImageLoading] = useState(true);

  const router = useRouter();
  const searchParams = useSearchParams();
  const detailsId = searchParams?.get('details');

  const {
    data: details,
    isFetching,
    isError,
    error,
  } = useGetPokemonDetailsQuery(detailsId!, {
    skip: !detailsId,
  });

  const src = getPokemonImageSrc(details);

  const handleClose = () => {
    const params = new URLSearchParams(searchParams?.toString());
    params.delete('details');
    router.push(`/?${params.toString()}`);

    router.refresh();
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  if (!detailsId) return null;

  return (
    <Suspense fallback={<Spinner />}>
      <aside
        data-testid="aside"
        className="
          flex min-w-92 flex-col gap-3 rounded-lg border border-(--border)
          bg-(--bg) p-6
        "
      >
        <div className="sticky top-1/5 flex w-80 flex-col rounded-lg">
          {isFetching && (
            <div className="mt-80">
              <Spinner className="w-80" />
            </div>
          )}

          {isError && <div>{getErrorMessage(error)}</div>}

          {!isFetching && !isError && details && (
            <>
              <Button
                className="absolute right-0 px-3! py-1!"
                onClick={handleClose}
              >
                X
              </Button>

              <div className="flex size-full flex-col gap-2">
                <div
                  className="
                    flex h-[140px] shrink-0 items-center justify-center
                  "
                >
                  {imageLoading && (
                    <div className="absolute">
                      <Spinner className="w-35 text-(--text)" />
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

                  <p className="text-2xl font-bold text-(--text-h) capitalize">
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
                  <p className="text-sm text-(--text-h)">Abilities</p>

                  <div className="flex flex-wrap gap-1">
                    {details.abilities.map((ability) => (
                      <span
                        key={ability.ability.name}
                        className="
                          rounded-lg border-2 bg-(--bg-soft) px-2 py-1 text-sm
                          capitalize
                        "
                      >
                        {ability.ability.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <p className="text-sm text-(--text-h)">Stats</p>

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
                  <p className="text-sm text-(--text-h)">Base experience</p>

                  <p>{details.base_experience}</p>
                </div>
              </div>
            </>
          )}
        </div>
      </aside>
    </Suspense>
  );
}

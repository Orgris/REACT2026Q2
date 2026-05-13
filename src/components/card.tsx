import React from 'react';
import type { Pokemon } from '../api/search-api-types';
import { Spinner } from './ui/spinner';

type CardProps = {
  pokemon: Pokemon;
};

type CardListState = {
  loading: boolean;
  error: string | null;
};

export class Card extends React.Component<CardProps, CardListState> {
  constructor(props: CardProps) {
    super(props);

    this.state = {
      loading: true,
      error: null,
    };
  }

  handleImageLoad = () => {
    this.setState({ loading: false });
  };

  render(): React.ReactNode {
    const { pokemon } = this.props;
    const { loading } = this.state;

    const src =
      pokemon.sprites.other?.showdown?.front_default ??
      pokemon.sprites.front_default ??
      '';

    return (
      <div
        data-testid="card"
        className="relative z-10 h-76 w-60 rounded-lg"
        key={pokemon.id}
      >
        <div className="flex h-full w-full flex-col p-3">
          <div className="flex h-[140px] flex-shrink-0 items-center justify-center">
            {loading && (
              <div className="absolute">
                <Spinner className="w-35 text-[var(--text)]" />
              </div>
            )}

            <img
              src={src}
              alt={`${pokemon.name} image`}
              onLoad={this.handleImageLoad}
            />
          </div>
          <div className="flex flex-col gap-1">
            <p>№ {pokemon.id}</p>
            <p className="text-2xl font-bold text-[var(--text-h)]">
              {pokemon.name}
            </p>
            <p className="text-justify">{pokemon.description}</p>
          </div>
        </div>
        <div className="absolute bottom-0 -z-10 h-3/4 w-full rounded-3xl bg-[var(--border)] shadow-xl"></div>
      </div>
    );
  }
}

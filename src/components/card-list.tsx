import React from 'react';
import { Card } from './card';
import { fetchPokemonList } from '../api/search-api';
import type { Pokemon } from '../api/search-api-types';
import { Spinner } from './ui/spinner';

type CardListProps = {
  query: string;
};

type CardListState = {
  pokemons: Pokemon[];
  loading: boolean;
  error: string | null;
};

export class CardList extends React.Component<CardListProps, CardListState> {
  constructor(props: CardListProps) {
    super(props);

    this.state = {
      pokemons: [],
      loading: false,
      error: null,
    };
  }

  async componentDidMount() {
    this.getPokemons();
  }

  componentDidUpdate(prevProps: CardListProps) {
    if (prevProps.query !== this.props.query) {
      this.getPokemons();
    }
  }

  getPokemons = async () => {
    this.setState({ loading: true, error: null });

    try {
      const pokemons = await fetchPokemonList(this.props.query);
      this.setState({
        pokemons: pokemons,
        loading: false,
      });
    } catch (error) {
      this.setState({
        error: error instanceof Error ? error.message : 'Unexpected error',
        loading: false,
      });
    }
  };

  render(): React.ReactNode {
    const { pokemons, loading, error } = this.state;

    return (
      <section
        data-testid="card-list"
        className="justify flex grow flex-wrap items-center justify-center gap-6 rounded-lg border border-[var(--border)] bg-[var(--bg)] p-6 lg:gap-8 lg:p-8"
      >
        {loading && <Spinner className="w-100" />}

        {error && <div>{error}</div>}

        {!loading && !error && (
          <>
            {pokemons.map((pokemon) => (
              <Card key={pokemon.id} pokemon={pokemon} />
            ))}
          </>
        )}
      </section>
    );
  }
}

import React from 'react';
import { Button } from './ui/button';
import PokeballIcon from '../assets/pokeball.svg?react';

type SearchFormProps = {
  onSearchChange: (value: string) => void;
};

type SearchFormState = {
  query: string;
  lastQuery: string;
};

export class SearchForm extends React.Component<
  SearchFormProps,
  SearchFormState
> {
  constructor(props: SearchFormProps) {
    super(props);

    this.state = {
      query: localStorage.getItem('searchString') ?? '',
      lastQuery: localStorage.getItem('searchString') ?? '',
    };
  }

  handleSubmit = (event: React.SubmitEvent) => {
    event.preventDefault();

    if (this.state.query === this.state.lastQuery) {
      return;
    }

    const trimmedSearch = this.state.query.trim();
    this.setState({ query: trimmedSearch, lastQuery: trimmedSearch });
    localStorage.setItem('searchString', trimmedSearch);

    this.props.onSearchChange(trimmedSearch);
  };

  render(): React.ReactNode {
    return (
      <form className="flex gap-3" onSubmit={this.handleSubmit}>
        <input
          className="flex-1 rounded-lg border-2 border-[var(--border)] bg-[var(--border)] px-3 py-1 transition-colors hover:border-[var(--accent-border)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
          type="search"
          placeholder="Who's that Pokémon?"
          value={this.state.query}
          onChange={(e) => this.setState({ query: e.target.value })}
        />
        <Button
          className="bg-red-400 hover:border-red-500 hover:bg-red-500"
          type="submit"
        >
          <PokeballIcon className="w-6 scale-130 text-[white]" />
        </Button>
      </form>
    );
  }
}

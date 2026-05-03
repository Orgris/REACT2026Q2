import React from 'react';
import { Button } from './ui/button';
import PokeballIcon from '../assets/pokeball.svg?react';

type SearchFormProps = Record<string, never>;

type SearchFormState = {
  searchString: string;
};

export class SearchForm extends React.Component<
  SearchFormProps,
  SearchFormState
> {
  constructor(props: SearchFormProps) {
    super(props);

    this.state = {
      searchString: '',
    };
  }

  handleSubmit = (event: React.SubmitEvent) => {
    event.preventDefault();
    this.setState({ searchString: this.state.searchString.trim() });
    localStorage.setItem('searchString', this.state.searchString);
  };

  componentDidMount(): void {
    const savedSearch = localStorage.getItem('searchString') ?? '';
    this.setState({ searchString: savedSearch });
  }

  render(): React.ReactNode {
    return (
      <form className="flex gap-3" onSubmit={this.handleSubmit}>
        <input
          className="flex-1 rounded-lg border-2 border-[var(--border)] px-3 py-1 transition-colors hover:border-[var(--accent-border)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--accent)]"
          type="search"
          placeholder="Search Input Field"
          value={this.state.searchString}
          onChange={(e) => this.setState({ searchString: e.target.value })}
        />
        <Button
          className="bg-red-400 hover:border-red-500 hover:bg-red-500"
          type="submit"
        >
          <PokeballIcon className="w-6 scale-130" />
        </Button>
      </form>
    );
  }
}

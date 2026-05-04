import React from 'react';
import { ErrorBoundary } from './components/error-boundary';
import { Hero } from './components/hero';
import { SearchForm } from './components/search-form';
import { ErrorButton } from './components/ui/error-button';
import { Search } from './components/search';
import { CardList } from './components/card-list';

type AppProps = Record<string, never>;

type AppState = {
  query: string;
};

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      query: localStorage.getItem('searchString') ?? '',
    };
  }

  handleSearchChange = (query: string) => {
    this.setState({ query });
  };

  render(): React.ReactNode {
    return (
      <ErrorBoundary>
        <Hero />

        <Search>
          <SearchForm onSearchChange={this.handleSearchChange} />
        </Search>

        <ErrorBoundary>
          <CardList query={this.state.query} />
        </ErrorBoundary>

        <footer className="rounded-t-lg border border-b-0 border-[var(--border)] bg-[var(--bg)] p-3">
          <ErrorButton />
        </footer>
      </ErrorBoundary>
    );
  }
}

export default App;

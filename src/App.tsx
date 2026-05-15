import { useState } from 'react';
import { ErrorBoundary } from './components/error-boundary';
import { Hero } from './components/hero';
import { SearchForm } from './components/search-form';
import { ErrorButton } from './components/ui/error-button';
import { Search } from './components/search';
import { CardList } from './components/card-list';

export function App() {
  const [query, setQuery] = useState(
    () => localStorage.getItem('searchString') ?? ''
  );

  const handleSearchChange = (query: string) => {
    setQuery(query);
  };

  return (
    <ErrorBoundary>
      <Hero />

      <Search>
        <SearchForm query={query} onSearchChange={handleSearchChange} />
      </Search>

      <ErrorBoundary>
        <CardList query={query} />
      </ErrorBoundary>

      <footer className="rounded-t-lg border border-b-0 border-[var(--border)] bg-[var(--bg)] p-3">
        <ErrorButton />
      </footer>
    </ErrorBoundary>
  );
}

export default App;

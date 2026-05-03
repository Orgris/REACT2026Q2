import './App.css';
import { ErrorBoundary } from './components/error-boundary';
import { Hero } from './components/hero';
import { SearchForm } from './components/search-form';
import { ErrorButton } from './components/ui/error-button';
import { Search } from './components/search';
import React from 'react';

class App extends React.Component {
  render(): React.ReactNode {
    return (
      <ErrorBoundary>
        <Hero />

        <Search>
          <SearchForm />
        </Search>

        <footer className="rounded-t-lg border border-b-0 border-[var(--border)] bg-[var(--bg)] p-3">
          <ErrorButton />
        </footer>
      </ErrorBoundary>
    );
  }
}

export default App;

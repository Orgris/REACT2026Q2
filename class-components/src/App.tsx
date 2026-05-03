import './App.css';
import { ErrorBoundary } from './components/error-boundary';
import { Hero } from './components/hero';
import React from 'react';

class App extends React.Component {
  render(): React.ReactNode {
    return (
      <ErrorBoundary>
        <Hero />

        <footer className="rounded-t-lg border border-b-0 border-[var(--border)] bg-[var(--bg)] p-3"></footer>
      </ErrorBoundary>
    );
  }
}

export default App;

import './App.css';
import { ErrorBoundary } from './components/error-boundary';

import { ErrorButton } from './components/ui/error-button';
import React from 'react';

class App extends React.Component {
  render(): React.ReactNode {
    return (
      <ErrorBoundary>
        <ErrorButton />
        <footer />
      </ErrorBoundary>
    );
  }
}

export default App;

import './App.css';
import { ErrorBoundary } from './components/error-boundary';
import React from 'react';

class App extends React.Component {
  render(): React.ReactNode {
    return (
      <ErrorBoundary>
        <footer />
      </ErrorBoundary>
    );
  }
}

export default App;

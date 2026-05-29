import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { ThemeProvider } from '../app/providers/theme-provider/theme-provider';
import About from '../pages/about/about';

describe('About', () => {
  it('renders page sections', () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <About />
        </ThemeProvider>
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', {
        name: 'About',
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        name: 'Technologies',
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', {
        name: 'Links',
      })
    ).toBeInTheDocument();
  });

  it('renders technology stack items', () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <About />
        </ThemeProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('React')).toBeInTheDocument();

    expect(screen.getByText('TypeScript')).toBeInTheDocument();

    expect(screen.getByText('React Router')).toBeInTheDocument();

    expect(screen.getByText('Tailwind CSS')).toBeInTheDocument();

    expect(screen.getByText('Vitest')).toBeInTheDocument();
  });

  it('renders developer card', () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <About />
        </ThemeProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('Orgris')).toBeInTheDocument();

    expect(screen.getByText('Developed by')).toBeInTheDocument();
  });
});

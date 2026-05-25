import { render, screen } from '@testing-library/react';
import { Header } from '../components/ui/header';
import { MemoryRouter } from 'react-router';
import { ThemeProvider } from '../providers/theme-provider';

describe('Button', () => {
  it('renders header text', () => {
    render(
      <MemoryRouter>
        <ThemeProvider>
          <Header />
        </ThemeProvider>
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /rs school.*pokédex/i
    );
  });
});

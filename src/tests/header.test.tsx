import { render, screen } from '@testing-library/react';
import { Header } from '../components/header';
import { MemoryRouter } from 'react-router';

describe('Button', () => {
  it('renders header text', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /rs school.*pokédex/i
    );
  });

  it('renders subtitle text', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText(/gotta catch 'em all!/i)).toBeInTheDocument();
  });
});

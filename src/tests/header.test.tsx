import { render, screen } from '@testing-library/react';
import { Header } from '../components/header';

describe('Button', () => {
  it('renders header text', () => {
    render(<Header />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /rs school.*pokédex/i
    );
  });

  it('renders subtitle text', () => {
    render(<Header />);

    expect(screen.getByText(/gotta catch 'em all!/i)).toBeInTheDocument();
  });
});

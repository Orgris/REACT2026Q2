import { render, screen } from '@testing-library/react';
import { Hero } from '../components/hero';

describe('Button', () => {
  it('renders header text', () => {
    render(<Hero />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      /rs school.*pokédex/i
    );
  });

  it('renders subtitle text', () => {
    render(<Hero />);

    expect(screen.getByText(/gotta catch 'em all!/i)).toBeInTheDocument();
  });
});

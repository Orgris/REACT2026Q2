import { render, screen } from '@testing-library/react';
import { Spinner } from '../components/ui/spinner';

describe('Spinner', () => {
  it('renders itself', () => {
    render(<Spinner />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Spinner className="custom-class" />);

    expect(screen.getByTestId('spinner')).toHaveClass('custom-class');
  });
});

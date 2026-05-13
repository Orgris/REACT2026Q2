import { render, screen } from '@testing-library/react';
import { Search } from '../components/search';

describe('Search', () => {
  it('renders children component', () => {
    const testComponent = <div data-testid="children-component"></div>;

    render(<Search>{testComponent}</Search>);

    expect(screen.getByTestId('children-component')).toBeInTheDocument();
  });

  it('renders text', () => {
    const testComponent = <div data-testid="children-component"></div>;

    render(<Search>{testComponent}</Search>);

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      /search your pokémon!/i
    );
    expect(
      screen.getByText(/enter a pokémon name or national pokédex number./i)
    ).toBeInTheDocument();
  });
});

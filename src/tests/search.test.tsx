import { render, screen } from '@testing-library/react';
import { Search } from '../components/search/search';

describe('Search', () => {
  it('renders children component', () => {
    render(
      <Search>
        <p>children-component</p>
      </Search>
    );

    expect(screen.getByText('children-component')).toBeInTheDocument();
  });

  it('renders text', () => {
    render(
      <Search>
        <p>children-component</p>
      </Search>
    );

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      /search your pokémon!/i
    );
    expect(
      screen.getByText(/enter a pokémon name or national pokédex number./i)
    ).toBeInTheDocument();
  });
});

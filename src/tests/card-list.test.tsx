import { vi } from 'vitest';
import { screen, render, waitFor } from '@testing-library/react';
import { CardList } from '../components/pages/home/card-list';
import { fetchPokemonList } from '../api/search-api';
import { mockPokemon, mockPokemon2 } from './mocks';
import { MemoryRouter } from 'react-router';

vi.mock('../api/search-api', () => ({
  fetchPokemonList: vi.fn(),
}));

const mockedFetchPokemonList = vi.mocked(fetchPokemonList);

describe('CardList', () => {
  it('renders', async () => {
    mockedFetchPokemonList.mockResolvedValue([]);

    render(
      <MemoryRouter>
        <CardList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('card-list')).toBeInTheDocument();
    });
  });

  it('calls fetch on mount', async () => {
    mockedFetchPokemonList.mockResolvedValue([mockPokemon]);
    const query = '';
    const offset = 0;
    const limit = 20;

    render(
      <MemoryRouter>
        <CardList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(mockedFetchPokemonList).toHaveBeenCalledWith(query, offset, limit);
    });
  });

  it('renders error', async () => {
    mockedFetchPokemonList.mockRejectedValue(new Error('Test error'));
    const query = '';
    const offset = 0;
    const limit = 20;

    render(
      <MemoryRouter>
        <CardList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(mockedFetchPokemonList).toHaveBeenCalledWith(query, offset, limit);
    });

    expect(await screen.findByText(/Test error/i)).toBeInTheDocument();
  });

  it('Shows loading state while fetching data', async () => {
    mockedFetchPokemonList.mockImplementation(() => new Promise(() => {}));

    render(
      <MemoryRouter>
        <CardList />
      </MemoryRouter>
    );

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('renders correct number of cards', async () => {
    mockedFetchPokemonList.mockResolvedValue([mockPokemon, mockPokemon2]);

    render(
      <MemoryRouter>
        <CardList />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('pikachu')).toBeInTheDocument();
      expect(screen.getByText('psyduck')).toBeInTheDocument();
    });
  });

  it('Correctly displays item names', async () => {
    mockedFetchPokemonList.mockResolvedValue([mockPokemon]);

    render(
      <MemoryRouter>
        <CardList />
      </MemoryRouter>
    );

    expect(await screen.findByText(/Pikachu/i)).toBeInTheDocument();
  });
});

import { vi } from 'vitest';
import { screen, render, waitFor } from '@testing-library/react';
import { CardList } from '../components/card-list';
import { fetchPokemonList } from '../api/search-api';
import { mockPokemon } from './mocks';

vi.mock('../api/search-api', () => ({
  fetchPokemonList: vi.fn(),
}));

const mockedFetchPokemonList = vi.mocked(fetchPokemonList);

describe('CardList', () => {
  it('renders', async () => {
    render(<CardList query="pikachu" />);

    expect(screen.getByTestId('card-list')).toBeInTheDocument();
  });

  it('calls fetch on mount', async () => {
    mockedFetchPokemonList.mockResolvedValue([mockPokemon]);

    render(<CardList query="pikachu" />);

    await waitFor(() => {
      expect(mockedFetchPokemonList).toHaveBeenCalledWith('pikachu');
    });
  });

  it('renders error', async () => {
    mockedFetchPokemonList.mockRejectedValue(new Error('Test error'));

    render(<CardList query="pikachu" />);

    await waitFor(() => {
      expect(mockedFetchPokemonList).toHaveBeenCalledWith('pikachu');
    });

    expect(await screen.findByText(/Test error/i)).toBeInTheDocument();
  });

  it('Shows loading state while fetching data', async () => {
    mockedFetchPokemonList.mockImplementation(() => new Promise(() => {}));

    render(<CardList query="pikachu" />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('renders correct number of cards', async () => {
    mockedFetchPokemonList.mockResolvedValue([mockPokemon, mockPokemon]);

    render(<CardList query="test" />);

    await waitFor(() => {
      expect(screen.getAllByTestId('card')).toHaveLength(2);
    });
  });

  it('Correctly displays item names and descriptions', async () => {
    mockedFetchPokemonList.mockResolvedValue([mockPokemon]);

    render(<CardList query="pikachu" />);

    expect(await screen.findByText(/pikachu/i)).toBeInTheDocument();
    expect(screen.getByText(/pokemon description/i)).toBeInTheDocument();
  });
});

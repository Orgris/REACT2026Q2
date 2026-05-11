import { vi } from 'vitest';
import type { Pokemon } from '../api/search-api-types';
import { screen, render, waitFor } from '@testing-library/react';
import { CardList } from '../components/card-list';
import { fetchPokemonList } from '../api/search-api';

const mockPokemon: Pokemon = {
  id: 1,
  order: 1,
  name: 'pikachu',
  sprites: {
    front_default: 'front.png',
    other: {
      showdown: {
        front_default: 'showdown.png',
      },
    },
  },
  description: 'pokemon description',
};

vi.mock('../api/search-api', () => ({
  fetchPokemonList: vi.fn(),
}));

const mockedFetchPokemonList = vi.mocked(fetchPokemonList);

describe('CardList', () => {
  it('renders', async () => {
    render(<CardList query="pikachu" />);

    expect(screen.getByTestId('card-list')).toBeInTheDocument();
  });

  it('renders pokemon card on mount', async () => {
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

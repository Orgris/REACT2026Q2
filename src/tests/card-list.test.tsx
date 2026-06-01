import { vi, describe, it, expect, beforeEach } from 'vitest';
import { screen, render, waitFor, fireEvent } from '@testing-library/react';
import { CardList } from '../components/card-list/card-list';
import { mockPokemon, mockPokemon2 } from './mocks';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { fetchPokemonList } from '../services/search-api';
import { store } from '../store';
import { pokemonApi } from '../store/pokemonList/pokemonApi'; // Импортируем API для сброса кэша
import { LIST_ITEM_LIMIT } from '../constants/api';

vi.mock('../services/search-api', () => ({
  fetchPokemonList: vi.fn(),
}));

const mockedFetchPokemonList = vi.mocked(fetchPokemonList);

const renderCardList = (initialEntries: string[] = ['/']) => {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={initialEntries}>
        <CardList />
      </MemoryRouter>
    </Provider>
  );
};

describe('CardList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    store.dispatch(pokemonApi.util.resetApiState());
  });

  describe('Loading and Error states', () => {
    it('shows loading state while fetching data', async () => {
      mockedFetchPokemonList.mockImplementation(() => new Promise(() => {}));

      renderCardList();

      expect(screen.getByTestId('spinner')).toBeInTheDocument();
    });

    it('renders error message on fetch failure', async () => {
      mockedFetchPokemonList.mockRejectedValue(new Error('Network error'));

      renderCardList();

      expect(await screen.findByText(/Network error/i)).toBeInTheDocument();
      expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
    });
  });

  describe('Data fetching and Rendering', () => {
    it('fetches data with default parameters on mount and renders cards', async () => {
      mockedFetchPokemonList.mockResolvedValue([mockPokemon, mockPokemon2]);

      renderCardList();

      await waitFor(() => {
        expect(mockedFetchPokemonList).toHaveBeenCalledWith(
          '',
          0,
          LIST_ITEM_LIMIT
        );
      });

      await waitFor(() => {
        expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
        expect(screen.getByText(/psyduck/i)).toBeInTheDocument();
      });
    });

    it('renders pagination when there is no search query', async () => {
      mockedFetchPokemonList.mockResolvedValue([mockPokemon]);

      renderCardList();

      await waitFor(() => {
        expect(screen.getByText('Prev')).toBeInTheDocument();
        expect(screen.getByText('Next')).toBeInTheDocument();
      });
    });

    it('hides pagination when search query is present', async () => {
      mockedFetchPokemonList.mockResolvedValue([mockPokemon]);

      renderCardList(['/?search=pikachu']);

      await waitFor(() => {
        expect(mockedFetchPokemonList).toHaveBeenCalledWith(
          'pikachu',
          0,
          LIST_ITEM_LIMIT
        );
      });

      await waitFor(() => {
        expect(screen.queryByText('Next')).not.toBeInTheDocument();
        expect(screen.queryByText('Prev')).not.toBeInTheDocument();
        expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
      });
    });
  });

  describe('Pagination and URL handling', () => {
    it('updates URL and fetches new page when pagination changes', async () => {
      mockedFetchPokemonList.mockResolvedValue([mockPokemon]);

      renderCardList();

      await waitFor(() => {
        expect(screen.getByTestId('pagination')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByText('Next'));

      await waitFor(() => {
        expect(mockedFetchPokemonList).toHaveBeenCalledWith(
          '',
          20,
          LIST_ITEM_LIMIT
        );
      });

      await waitFor(() => {
        expect(screen.getByTestId('current-page')).toHaveTextContent('2');
      });
    });
  });

  describe('Caching behavior', () => {
    it('uses cached data and does NOT refetch on remount if data is fresh', async () => {
      mockedFetchPokemonList.mockResolvedValue([mockPokemon]);

      const { unmount } = renderCardList();

      await waitFor(() => {
        expect(mockedFetchPokemonList).toHaveBeenCalledTimes(1);
        expect(mockedFetchPokemonList).toHaveBeenCalledWith(
          '',
          0,
          LIST_ITEM_LIMIT
        );
      });

      mockedFetchPokemonList.mockClear();

      unmount();
      renderCardList();

      await new Promise((resolve) => setTimeout(resolve, 15));

      expect(mockedFetchPokemonList).not.toHaveBeenCalled();

      expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    });
  });
});

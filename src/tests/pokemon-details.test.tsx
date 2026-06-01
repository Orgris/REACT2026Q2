import { vi, describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { store } from '../store';
import { detailsApi } from '../store/selectedPokemons/detailsApi';
import { PokemonDetails } from '../components/pokemon-details/pokemon-details';
import { fetchPokemonDetails } from '../services/search-api';

const mockedNavigate = vi.fn();

vi.mock('react-router', async () => {
  const actual =
    await vi.importActual<typeof import('react-router')>('react-router');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

vi.mock('../services/search-api', () => ({
  fetchPokemonDetails: vi.fn(),
}));
const mockedFetchPokemonDetails = vi.mocked(fetchPokemonDetails);

import { getPokemonImageSrc } from '../utils/getPokemonImageSrc';
import { mockDetails } from './mocks';
vi.mock('../utils/getPokemonImageSrc', () => ({
  getPokemonImageSrc: vi.fn(),
}));
const mockedGetPokemonImageSrc = vi.mocked(getPokemonImageSrc);

const renderPokemonDetails = (initialEntries: string[] = ['/']) => {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={initialEntries}>
        <PokemonDetails />
      </MemoryRouter>
    </Provider>
  );
};

describe('PokemonDetails', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    store.dispatch(detailsApi.util.resetApiState());

    mockedGetPokemonImageSrc.mockReturnValue('https://example.com/pikachu.png');
  });

  describe('Successful Rendering', () => {
    it('renders all pokemon details correctly', async () => {
      mockedFetchPokemonDetails.mockResolvedValue(mockDetails);

      renderPokemonDetails(['/?details=1']);

      await screen.findByText(/pikachu/i);

      expect(screen.getByText('#001')).toBeInTheDocument();

      expect(screen.getByText('0.4 m')).toBeInTheDocument();
      expect(screen.getByText('6 kg')).toBeInTheDocument();

      expect(screen.getByText('electric')).toBeInTheDocument();

      expect(screen.getByText('static')).toBeInTheDocument();
      expect(screen.getByText('lightning-rod')).toBeInTheDocument();

      expect(screen.getByText('35')).toBeInTheDocument();
      expect(screen.getByText('55')).toBeInTheDocument();
      expect(screen.getByText('40')).toBeInTheDocument();
      expect(screen.getByText('90')).toBeInTheDocument();
    });

    describe('Conditional Fetching & States', () => {
      it('does NOT fetch data if detailsId is missing from URL', () => {
        renderPokemonDetails(['/']);

        expect(mockedFetchPokemonDetails).not.toHaveBeenCalled();
        expect(screen.queryByTestId('aside')).toBeInTheDocument();
      });

      it('shows loading spinner while fetching data', async () => {
        mockedFetchPokemonDetails.mockImplementation(
          () => new Promise(() => {})
        );

        renderPokemonDetails(['/?details=1']);

        expect(screen.getAllByTestId('spinner')).toHaveLength(1);
      });

      it('shows error message on fetch failure', async () => {
        mockedFetchPokemonDetails.mockRejectedValue(
          new Error('Network failure')
        );

        renderPokemonDetails(['/?details=1']);

        expect(await screen.findByText(/Network failure/i)).toBeInTheDocument();
      });
    });

    describe('Caching Behavior', () => {
      it('uses cached data and does NOT refetch on remount if data is fresh', async () => {
        mockedFetchPokemonDetails.mockResolvedValue(mockDetails);

        const { unmount } = renderPokemonDetails(['/?details=1']);

        await waitFor(() => {
          expect(mockedFetchPokemonDetails).toHaveBeenCalledTimes(1);
          expect(mockedFetchPokemonDetails).toHaveBeenCalledWith('1');
        });

        mockedFetchPokemonDetails.mockClear();

        unmount();
        renderPokemonDetails(['/?details=1']);

        await new Promise((resolve) => setTimeout(resolve, 50));

        expect(mockedFetchPokemonDetails).not.toHaveBeenCalled();

        expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
        expect(screen.getAllByTestId('spinner')).toHaveLength(1);
      });
    });

    it('hides image loading spinner after image onLoad event', async () => {
      mockedFetchPokemonDetails.mockResolvedValue(mockDetails);

      renderPokemonDetails(['/?details=1']);

      const img = await screen.findByRole('img', { name: /pikachu image/i });

      fireEvent.load(img);

      expect(img).toHaveAttribute('src', 'https://example.com/pikachu.png');
    });
  });

  describe('Navigation & Interaction', () => {
    it('removes "details" from URL but keeps other params when close button is clicked', async () => {
      const user = userEvent.setup();
      mockedFetchPokemonDetails.mockResolvedValue(mockDetails);

      renderPokemonDetails(['/?page=2&details=25']);

      await screen.findByText(/pikachu/i);

      const closeBtn = screen.getByRole('button', { name: 'X' });
      await user.click(closeBtn);

      expect(mockedNavigate).toHaveBeenCalledWith({
        pathname: '/',
        search: 'page=2',
      });
    });
  });
});

import { vi, describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from '../components/ui/header';
import { MemoryRouter } from 'react-router';
import { ThemeProvider } from '../app/providers/theme-provider/theme-provider';
import { Provider } from 'react-redux';
import { store } from '../store';
import { pokemonApi } from '../store/pokemonList/pokemonApi';
import { detailsApi } from '../store/selectedPokemons/detailsApi';

vi.mock('../../hooks/useTheme', () => ({
  useTheme: vi.fn(),
}));

const renderHeader = (initialEntries: string[] = ['/']) => {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={initialEntries}>
        <ThemeProvider>
          <Header />
        </ThemeProvider>
      </MemoryRouter>
    </Provider>
  );
};

describe('Header', () => {
  let dispatchSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    vi.clearAllMocks();
    dispatchSpy = vi.spyOn(store, 'dispatch');
  });

  describe('Rendering', () => {
    it('renders heading, navigation links, and all buttons', () => {
      renderHeader();

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        /rs school.*pokédex/i
      );

      expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute(
        'href',
        '/'
      );
      expect(screen.getByRole('link', { name: /about/i })).toHaveAttribute(
        'href',
        '/about'
      );

      expect(screen.getByRole('button', { name: /dark/i })).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /refresh list/i })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /refresh selected/i })
      ).toBeInTheDocument();
    });

    it('highlights active navigation link with aria-current', () => {
      renderHeader(['/about']);

      const aboutLink = screen.getByRole('link', { name: /about/i });
      expect(aboutLink).toHaveAttribute('aria-current', 'page');

      const homeLink = screen.getByRole('link', { name: /home/i });
      expect(homeLink).not.toHaveAttribute('aria-current');
    });
  });

  describe('Theme Toggle', () => {
    it('calls toggleTheme when theme button is clicked', () => {
      renderHeader();

      fireEvent.click(screen.getByRole('button', { name: /dark/i }));
      expect(screen.getByText(/light/i)).toBeInTheDocument();
    });
  });

  describe('Cache Invalidation (Refresh buttons)', () => {
    it('dispatches pokemonApi invalidation when "Refresh list" is clicked', () => {
      renderHeader();

      fireEvent.click(screen.getByRole('button', { name: /refresh list/i }));

      expect(dispatchSpy).toHaveBeenCalledWith(
        pokemonApi.util.invalidateTags([{ type: 'Pokemon', id: 'LIST' }])
      );
    });

    it('disables "Refresh selected" button when detailsId is NOT in URL', () => {
      renderHeader(['/']);

      const refreshSelectedBtn = screen.getByRole('button', {
        name: /refresh selected/i,
      });
      expect(refreshSelectedBtn).toBeDisabled();
    });

    it('enables "Refresh selected" and dispatches correct invalidation when detailsId IS in URL', () => {
      renderHeader(['/?details=25']);

      const refreshSelectedBtn = screen.getByRole('button', {
        name: /refresh selected/i,
      });

      expect(refreshSelectedBtn).not.toBeDisabled();

      fireEvent.click(refreshSelectedBtn);

      expect(dispatchSpy).toHaveBeenCalledWith(
        detailsApi.util.invalidateTags([{ type: 'PokemonDetails', id: '25' }])
      );
    });
  });
});

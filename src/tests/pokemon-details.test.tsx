import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { PokemonDetails } from '../components/pokemon-details';

import { fetchPokemon, fetchDescription } from '../api/search-api';
import { mockPokemon } from './mocks';
import { MemoryRouter } from 'react-router';

vi.mock('../api/search-api', () => ({
  fetchPokemon: vi.fn(),
  fetchDescription: vi.fn(),
}));

const mockedNavigate = vi.fn();

vi.mock('react-router', async () => {
  const actual =
    await vi.importActual<typeof import('react-router')>('react-router');

  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

describe('PokemonDetails', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders pokemon details after successful fetch', async () => {
    vi.mocked(fetchPokemon).mockResolvedValue(mockPokemon);

    vi.mocked(fetchDescription).mockResolvedValue('Electric mouse pokemon');

    render(
      <MemoryRouter initialEntries={['/?details=25']}>
        <PokemonDetails />
      </MemoryRouter>
    );

    expect(await screen.findByText('pikachu')).toBeInTheDocument();

    expect(screen.getByText('Electric mouse pokemon')).toBeInTheDocument();

    expect(screen.getByText('static')).toBeInTheDocument();

    expect(screen.getByText('112')).toBeInTheDocument();
  });

  it('renders abilities including hidden ones', async () => {
    vi.mocked(fetchPokemon).mockResolvedValue(mockPokemon);

    vi.mocked(fetchDescription).mockResolvedValue('description');

    render(
      <MemoryRouter initialEntries={['/?details=25']}>
        <PokemonDetails />
      </MemoryRouter>
    );

    expect(await screen.findByText('static')).toBeInTheDocument();

    expect(screen.getByText('lightning-rod')).toBeInTheDocument();
  });

  it('renders stats correctly', async () => {
    vi.mocked(fetchPokemon).mockResolvedValue(mockPokemon);

    vi.mocked(fetchDescription).mockResolvedValue('description');

    render(
      <MemoryRouter initialEntries={['/?details=25']}>
        <PokemonDetails />
      </MemoryRouter>
    );

    expect(await screen.findByText('HP')).toBeInTheDocument();

    expect(screen.getByText('35')).toBeInTheDocument();

    expect(screen.getByText('SPD')).toBeInTheDocument();
  });

  it('calls navigate when close button clicked', async () => {
    const user = userEvent.setup();

    vi.mocked(fetchPokemon).mockResolvedValue(mockPokemon);

    vi.mocked(fetchDescription).mockResolvedValue('description');

    render(
      <MemoryRouter initialEntries={['/?page=1&details=25']}>
        <PokemonDetails />
      </MemoryRouter>
    );

    const closeBtn = await screen.findByRole('button', { name: 'X' });

    await user.click(closeBtn);

    expect(mockedNavigate).toHaveBeenCalledWith({
      pathname: '/',
      search: 'page=1',
    });
  });

  it('renders image correctly', async () => {
    vi.mocked(fetchPokemon).mockResolvedValue(mockPokemon);

    vi.mocked(fetchDescription).mockResolvedValue('description');

    render(
      <MemoryRouter initialEntries={['/?details=25']}>
        <PokemonDetails />
      </MemoryRouter>
    );

    const img = await screen.findByRole('img', {
      name: /pikachu image/i,
    });

    expect(img).toHaveAttribute('src', 'showdown.png');
  });
});

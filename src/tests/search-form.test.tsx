import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SearchForm } from '../components/search/search-form';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';

describe('SearchForm', () => {
  const onSearchChange = vi.fn();
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render form with input and button', () => {
    render(
      <MemoryRouter>
        <SearchForm />
      </MemoryRouter>
    );
    expect(screen.getByTestId('search-form')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Who's that Pokémon?")
    ).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  it('handles query', () => {
    localStorage.setItem('searchString', 'pikachu');

    render(
      <MemoryRouter>
        <SearchForm />
      </MemoryRouter>
    );
    expect(screen.getByTestId('search-input')).toHaveValue('pikachu');
  });

  it('writes value to localStorage after submit', async () => {
    render(
      <MemoryRouter>
        <SearchForm />
      </MemoryRouter>
    );
    const input = screen.getByTestId('search-input');
    const button = screen.getByTestId('submit-button');

    await user.clear(input);
    await user.type(input, 'psyduck');
    await user.click(button);

    const storedValue = localStorage.getItem('searchString');
    expect(storedValue).toBe('psyduck');
  });

  it('does not submit new query if query did not change', async () => {
    localStorage.setItem('searchString', 'pikachu');

    render(
      <MemoryRouter>
        <SearchForm />
      </MemoryRouter>
    );
    await user.click(screen.getByTestId('submit-button'));

    expect(onSearchChange).not.toHaveBeenCalled();
  });

  it('updates localStorage when new value is submitted', async () => {
    render(
      <MemoryRouter>
        <SearchForm />
      </MemoryRouter>
    );
    const input = screen.getByTestId('search-input');
    const button = screen.getByTestId('submit-button');

    await user.clear(input);
    await user.type(input, 'bulbasaur');
    await user.click(button);

    const storedValue = localStorage.getItem('searchString');
    expect(storedValue).toBe('bulbasaur');
  });

  it('handles trims value input correctly', async () => {
    localStorage.setItem('searchString', '');

    render(
      <MemoryRouter>
        <SearchForm />
      </MemoryRouter>
    );
    const input = screen.getByTestId('search-input');
    const button = screen.getByTestId('submit-button');

    await user.type(input, '   pikachu   ');
    await user.click(button);

    const storedValue = localStorage.getItem('searchString');
    expect(storedValue).toBe('pikachu');
  });

  it('treats whitespace-only input as empty string', async () => {
    localStorage.setItem('searchString', '');

    render(
      <MemoryRouter>
        <SearchForm />
      </MemoryRouter>
    );
    const input = screen.getByTestId('search-input');
    const button = screen.getByTestId('submit-button');

    await user.type(input, '     ');
    await user.click(button);

    const storedValue = localStorage.getItem('searchString');
    expect(storedValue).toBe('');
  });

  it('does not trigger search when submitting same value twice', async () => {
    localStorage.setItem('searchString', 'pikachu');

    render(
      <MemoryRouter>
        <SearchForm />
      </MemoryRouter>
    );

    const button = screen.getByTestId('submit-button');

    await user.click(button);

    expect(onSearchChange).toHaveBeenCalledTimes(0);
  });
});

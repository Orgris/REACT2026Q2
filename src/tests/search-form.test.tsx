import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SearchForm } from '../components/search-form';
import userEvent from '@testing-library/user-event';

describe('SearchForm', () => {
  const onSearchChange = vi.fn();
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render form with input and button', () => {
    render(<SearchForm onSearchChange={onSearchChange} query={''} />);

    expect(screen.getByTestId('search-form')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Who's that Pokémon?")
    ).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  it('handles query', () => {
    localStorage.setItem('searchString', 'pikachu');

    render(<SearchForm onSearchChange={onSearchChange} query={'pikachu'} />);

    expect(screen.getByTestId('search-input')).toHaveValue('pikachu');
  });

  it('writes value to localStorage after submit', async () => {
    render(<SearchForm onSearchChange={onSearchChange} query={'pikachu'} />);

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

    render(<SearchForm onSearchChange={onSearchChange} query={'pikachu'} />);

    await user.click(screen.getByTestId('submit-button'));

    expect(onSearchChange).not.toHaveBeenCalled();
  });

  it('updates localStorage when new value is submitted', async () => {
    render(<SearchForm onSearchChange={onSearchChange} query={'pikachu'} />);

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

    render(<SearchForm onSearchChange={onSearchChange} query={''} />);

    const input = screen.getByTestId('search-input');
    const button = screen.getByTestId('submit-button');

    await user.type(input, '   pikachu   ');
    await user.click(button);

    const storedValue = localStorage.getItem('searchString');
    expect(storedValue).toBe('pikachu');

    expect(onSearchChange).toHaveBeenCalledWith('pikachu');
  });

  it('treats whitespace-only input as empty string', async () => {
    localStorage.setItem('searchString', '');

    render(<SearchForm onSearchChange={onSearchChange} query={''} />);

    const input = screen.getByTestId('search-input');
    const button = screen.getByTestId('submit-button');

    await user.type(input, '     ');
    await user.click(button);

    const storedValue = localStorage.getItem('searchString');
    expect(storedValue).toBe('');

    expect(onSearchChange).toHaveBeenCalledWith('');
  });

  it('does not trigger search when submitting same value twice', async () => {
    render(<SearchForm onSearchChange={onSearchChange} query={'pikachu'} />);

    const button = screen.getByTestId('submit-button');

    await user.click(button);

    expect(onSearchChange).toHaveBeenCalledTimes(0);
  });
});

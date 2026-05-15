import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SearchForm } from '../components/search-form';
import userEvent from '@testing-library/user-event';

describe('SearchForm', () => {
  it('should render form with input and button', () => {
    const onSearchChange = vi.fn();

    render(<SearchForm onSearchChange={onSearchChange} />);

    expect(screen.getByTestId('search-form')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Who's that Pokémon?")
    ).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  it('reads value from localStorage on mount', () => {
    const onSearchChange = vi.fn();
    localStorage.setItem('searchString', 'pikachu');

    render(<SearchForm onSearchChange={onSearchChange} />);

    expect(screen.getByTestId('search-input')).toHaveValue('pikachu');
  });

  it('handles empty localStorage', () => {
    const onSearchChange = vi.fn();
    localStorage.setItem('searchString', '');

    render(<SearchForm onSearchChange={onSearchChange} />);

    expect(screen.getByTestId('search-input')).toHaveValue('');
  });

  it('writes value to localStorage after submit', async () => {
    const onSearchChange = vi.fn();
    const user = userEvent.setup();

    render(<SearchForm onSearchChange={onSearchChange} />);

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

    const onSearchChange = vi.fn();
    const user = userEvent.setup();

    render(<SearchForm onSearchChange={onSearchChange} />);

    await user.click(screen.getByTestId('submit-button'));

    expect(onSearchChange).not.toHaveBeenCalled();
  });

  it('updates localStorage when new value is submitted', async () => {
    localStorage.setItem('searchString', 'pikachu');

    const onSearchChange = vi.fn();
    const user = userEvent.setup();

    render(<SearchForm onSearchChange={onSearchChange} />);

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

    const onSearchChange = vi.fn();
    const user = userEvent.setup();

    render(<SearchForm onSearchChange={onSearchChange} />);

    const input = screen.getByTestId('search-input');
    const button = screen.getByTestId('submit-button');

    await user.type(input, '   pikachu   ');
    await user.click(button);

    const storedValue = localStorage.getItem('searchString');
    expect(storedValue).toBe('pikachu');

    expect(onSearchChange).toHaveBeenCalledWith('pikachu');
    expect(input).toHaveValue('pikachu');
  });

  it('treats whitespace-only input as empty string', async () => {
    localStorage.setItem('searchString', '');

    const user = userEvent.setup();
    const onSearchChange = vi.fn();

    render(<SearchForm onSearchChange={onSearchChange} />);

    const input = screen.getByTestId('search-input');
    const button = screen.getByTestId('submit-button');

    await user.type(input, '     ');
    await user.click(button);

    const storedValue = localStorage.getItem('searchString');
    expect(storedValue).toBe('');

    expect(onSearchChange).toHaveBeenCalledWith('');
    expect(input).toHaveValue('');
  });

  it('does not trigger search when submitting same value twice', async () => {
    localStorage.setItem('searchString', 'pikachu');

    const user = userEvent.setup();
    const onSearchChange = vi.fn();

    render(<SearchForm onSearchChange={onSearchChange} />);

    const button = screen.getByTestId('submit-button');

    await user.click(button);

    expect(onSearchChange).toHaveBeenCalledTimes(0);
  });
});

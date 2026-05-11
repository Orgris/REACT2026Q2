import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SearchForm } from '../components/search-form';
import userEvent from '@testing-library/user-event';

const store: Record<string, string | null> = {};

export const localStorageMock = {
  getItem: vi.fn((key: string) => store[key] ?? null),
  setItem: vi.fn((key: string, value: string) => {
    store[key] = value;
  }),
  removeItem: vi.fn((key: string) => {
    delete store[key];
  }),
  clear: vi.fn(() => {
    Object.keys(store).forEach((key) => delete store[key]);
  }),
};

describe('SearchForm', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });

    vi.clearAllMocks();
    localStorageMock.clear();
  });

  it('should render form with input and button', () => {
    const onSearchChange = vi.fn();

    render(<SearchForm onSearchChange={onSearchChange} />);

    expect(screen.getByTestId('search-form')).toBeInTheDocument();
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  it('reads value from localStorage on mount', () => {
    const onSearchChange = vi.fn();
    localStorageMock.getItem.mockReturnValue('pikachu');

    render(<SearchForm onSearchChange={onSearchChange} />);

    expect(screen.getByTestId('search-input')).toHaveValue('pikachu');
  });

  it('handles empty localStorage', () => {
    const onSearchChange = vi.fn();
    localStorageMock.getItem.mockReturnValue(null);

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
    await user.type(input, 'psuduck');
    await user.click(button);

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'searchString',
      'psuduck'
    );
  });

  it('does not submit new query if query did not change', async () => {
    localStorageMock.getItem.mockReturnValue('pikachu');

    const onSearchChange = vi.fn();
    const user = userEvent.setup();

    render(<SearchForm onSearchChange={onSearchChange} />);

    await user.click(screen.getByTestId('submit-button'));

    expect(localStorageMock.setItem).not.toHaveBeenCalled();
    expect(onSearchChange).not.toHaveBeenCalled();
  });

  it('updates localStorage when new value is submitted', async () => {
    localStorageMock.getItem.mockReturnValue('pikachu');

    const onSearchChange = vi.fn();
    const user = userEvent.setup();

    render(<SearchForm onSearchChange={onSearchChange} />);

    const input = screen.getByTestId('search-input');
    const button = screen.getByTestId('submit-button');

    await user.clear(input);
    await user.type(input, 'bulbasaur');
    await user.click(button);

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'searchString',
      'bulbasaur'
    );
  });

  it('handles trims value input correctly', async () => {
    localStorageMock.getItem.mockReturnValue('');

    const onSearchChange = vi.fn();
    const user = userEvent.setup();

    render(<SearchForm onSearchChange={onSearchChange} />);

    const input = screen.getByTestId('search-input');
    const button = screen.getByTestId('submit-button');

    await user.type(input, '   pikachu   ');
    await user.click(button);

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'searchString',
      'pikachu'
    );

    expect(onSearchChange).toHaveBeenCalledWith('pikachu');
    expect(input).toHaveValue('pikachu');
  });

  it('treats whitespace-only input as empty string', async () => {
    localStorageMock.getItem.mockReturnValue('');

    const user = userEvent.setup();
    const onSearchChange = vi.fn();

    render(<SearchForm onSearchChange={onSearchChange} />);

    const input = screen.getByTestId('search-input');
    const button = screen.getByTestId('submit-button');

    await user.type(input, '     ');
    await user.click(button);

    expect(localStorageMock.setItem).toHaveBeenCalledWith('searchString', '');
    expect(onSearchChange).toHaveBeenCalledWith('');
    expect(input).toHaveValue('');
  });

  it('does not trigger search when submitting same value twice', async () => {
    localStorageMock.getItem.mockReturnValue('pikachu');

    const user = userEvent.setup();
    const onSearchChange = vi.fn();

    render(<SearchForm onSearchChange={onSearchChange} />);

    const button = screen.getByTestId('submit-button');

    await user.click(button);

    expect(onSearchChange).toHaveBeenCalledTimes(0);
    expect(localStorageMock.setItem).toHaveBeenCalledTimes(0);
  });
});

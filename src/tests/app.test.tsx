import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

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

describe('App', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });

    vi.clearAllMocks();
    localStorageMock.clear();
  });

  it('should render main layout sections', () => {
    render(<App />);

    expect(screen.getByTestId('hero')).toBeInTheDocument();
    expect(screen.getByTestId('search')).toBeInTheDocument();
    expect(screen.getByTestId('search-form')).toBeInTheDocument();
    expect(screen.getByTestId('card-list')).toBeInTheDocument();
    expect(screen.getByTestId('error-btn')).toBeInTheDocument();
  });

  it('should initialize query from localStorage', () => {
    render(<App />);

    expect(localStorageMock.getItem).toHaveBeenCalledWith('searchString');
  });

  it('reads value from localStorage on mount', () => {
    localStorageMock.getItem.mockReturnValue('pikachu');

    render(<App />);

    expect(screen.getByTestId('search-input')).toHaveValue('pikachu');
  });

  it('reads empty value from localStorage on mount', () => {
    localStorageMock.getItem.mockReturnValue('');

    render(<App />);

    expect(screen.getByTestId('search-input')).toHaveValue('');
  });
});

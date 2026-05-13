import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { localStorageMock } from './mocks';

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

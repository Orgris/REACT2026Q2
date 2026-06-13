import { describe, it, expect, beforeEach, vi } from 'vitest';
import { screen } from '@testing-library/react';
import Home from '../pages/home/home';
import { renderWithProviders } from './test-utils';

beforeEach(() => {
  HTMLDialogElement.prototype.showModal = vi.fn();
  HTMLDialogElement.prototype.close = vi.fn();
});

describe('Home Component', () => {
  it('should render registration section with title', () => {
    renderWithProviders(<Home />);

    expect(screen.getByText('Registration')).toBeInTheDocument();
  });

  it('should render both modal buttons', () => {
    renderWithProviders(<Home />);

    expect(screen.getByText('Controlled form')).toBeInTheDocument();
    expect(screen.getByText('Uncontrolled form')).toBeInTheDocument();
  });

  it('should render history section with title', () => {
    renderWithProviders(<Home />);

    expect(screen.getByText('History')).toBeInTheDocument();
  });

  it('should display empty history when no users', () => {
    renderWithProviders(<Home />);

    const historySection = screen.getByText('History');
    expect(historySection).toBeInTheDocument();

    const userCards = screen.queryAllByText(/years old/);
    expect(userCards).toHaveLength(0);
  });

  it('should display users from store', () => {
    const mockUser = {
      id: 0,
      name: 'John Doe',
      email: 'john@example.com',
      password: 'pass123',
      age: 25,
      gender: 'male',
      country: 'Russia',
      terms: true,
      avatar: 'base64string',
    };

    const preloadedState = {
      appData: {
        users: [mockUser],
        countries: ['Russia'],
        genders: ['male', 'female'],
      },
    };

    renderWithProviders(<Home />, { preloadedState });

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });

  it('should display multiple users', () => {
    const mockUser1 = {
      id: 0,
      name: 'John Doe',
      email: 'john@example.com',
      password: 'pass123',
      age: 25,
      gender: 'male',
      country: 'Russia',
      terms: true,
      avatar: 'base64string',
    };

    const mockUser2 = {
      id: 1,
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: 'pass123',
      age: 30,
      gender: 'female',
      country: 'Canada',
      terms: true,
      avatar: 'base64string',
    };

    const preloadedState = {
      appData: {
        users: [mockUser1, mockUser2],
        countries: ['Russia', 'Canada'],
        genders: ['male', 'female'],
      },
    };

    renderWithProviders(<Home />, { preloadedState });

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('should have correct layout structure', () => {
    renderWithProviders(<Home />);

    const main = document.querySelector('main');
    const sections = document.querySelectorAll('section');

    expect(main).toBeInTheDocument();
    expect(sections).toHaveLength(2);
  });
});

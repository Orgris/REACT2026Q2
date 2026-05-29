import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import NotFound from '../pages/not-found/not-found';
import { MemoryRouter } from 'react-router';

describe('NotFound', () => {
  it('renders 404 page content', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', {
        name: '404',
      })
    ).toBeInTheDocument();

    expect(screen.getByText('Sorry we somehow lost you.')).toBeInTheDocument();
  });

  it('renders link to home page', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>
    );

    const homeLink = screen.getByRole('link', {
      name: /let's go home/i,
    });

    expect(homeLink).toBeInTheDocument();

    expect(homeLink).toHaveAttribute('href', '/');
  });
});

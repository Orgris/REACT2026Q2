import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Pagination } from '../components/ui/pagination';

describe('Pagination', () => {
  it('renders current page', () => {
    render(<Pagination page={5} onPageChange={vi.fn()} />);

    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('calls onPageChange with previous page', async () => {
    const user = userEvent.setup();

    const onPageChange = vi.fn();

    render(<Pagination page={3} onPageChange={onPageChange} />);

    await user.click(
      screen.getByRole('button', {
        name: /prev/i,
      })
    );

    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('calls onPageChange with next page', async () => {
    const user = userEvent.setup();

    const onPageChange = vi.fn();

    render(<Pagination page={3} onPageChange={onPageChange} />);

    await user.click(
      screen.getByRole('button', {
        name: /next/i,
      })
    );

    expect(onPageChange).toHaveBeenCalledWith(4);
  });

  it('disables previous button on first page', () => {
    render(<Pagination page={1} onPageChange={vi.fn()} />);

    expect(
      screen.getByRole('button', {
        name: /prev/i,
      })
    ).toBeDisabled();
  });

  it('enables previous button after first page', () => {
    render(<Pagination page={2} onPageChange={vi.fn()} />);

    expect(
      screen.getByRole('button', {
        name: /prev/i,
      })
    ).not.toBeDisabled();
  });
});

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Fallback } from '../components/ui/fallback';

describe('Fallback', () => {
  const reloadMock = vi.fn();

  beforeEach(() => {
    reloadMock.mockReset();

    Object.defineProperty(window, 'location', {
      configurable: true,
      value: {
        ...window.location,
        reload: reloadMock,
      },
    });
  });

  it('renders error message, helper text and refresh button', () => {
    render(<Fallback errorMessage="Test error" />);

    expect(screen.getByText(/test error/i)).toBeInTheDocument();
    expect(
      screen.getByText(/please try again later or refresh the page/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /refresh/i })
    ).toBeInTheDocument();
  });

  it('calls reload on refresh button click', async () => {
    const user = userEvent.setup();

    render(<Fallback errorMessage="Test error" />);

    await user.click(
      screen.getByRole('button', {
        name: /refresh/i,
      })
    );

    expect(reloadMock).toHaveBeenCalledOnce();
  });
});

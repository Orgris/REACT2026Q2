import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorBoundary } from '../components/error-boundary';
import { ErrorButton } from '../components/ui/error-button';

const errorBoundary = (
  <ErrorBoundary>
    <ErrorButton />
  </ErrorBoundary>
);

describe('ErrorBoundary', () => {
  it('catches and handles JavaScript errors in child components', async () => {
    const user = userEvent.setup();

    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(errorBoundary);

    await user.click(screen.getByRole('button'));

    expect(
      screen.getByText('Please try again later or refresh the page')
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /refresh/i })
    ).toBeInTheDocument();

    consoleErrorSpy.mockRestore();
  });

  it('logs error to console', async () => {
    const user = userEvent.setup();

    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(errorBoundary);

    await user.click(screen.getByRole('button'));

    expect(consoleErrorSpy).toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });
});

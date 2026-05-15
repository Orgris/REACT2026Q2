import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorButton } from '../components/ui/error-button';

describe('ErrorButton', () => {
  it('renders button', () => {
    render(<ErrorButton />);

    expect(screen.getByText('Click me!')).toBeInTheDocument();
  });

  it('throws error after click', async () => {
    const user = userEvent.setup();

    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(<ErrorButton />);

    const button = screen.getByTestId('error-btn');

    await expect(user.click(button)).rejects.toThrow('Test error');

    consoleErrorSpy.mockRestore();
  });
});

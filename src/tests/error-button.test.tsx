import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorButton } from '../components/ui/button/error-button';
import { Provider } from 'react-redux';
import { store } from '../store';

describe('ErrorButton', () => {
  it('renders button', () => {
    render(
      <Provider store={store}>
        <ErrorButton />
      </Provider>
    );

    expect(screen.getByText('Click me!')).toBeInTheDocument();
  });

  it('throws error after click', async () => {
    const user = userEvent.setup();

    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(
      <Provider store={store}>
        <ErrorButton />
      </Provider>
    );

    const button = screen.getByTestId('error-btn');

    await expect(user.click(button)).rejects.toThrow('Test error');

    consoleErrorSpy.mockRestore();
  });
});

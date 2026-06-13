import { describe, it, expect, beforeEach, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from './test-utils';
import { ControlledForm } from '../components/forms/controlledFrom';
import { ModalContext } from '../hooks/useModalContext';

vi.mock('../../utils/fileToBase64', () => ({
  fileToBase64: vi.fn(() => Promise.resolve('base64mockstring')),
}));

describe('ControlledForm - Behavior Tests', () => {
  const mockHandleModalClose = vi.fn();

  beforeEach(() => {
    HTMLDialogElement.prototype.showModal = vi.fn();
    HTMLDialogElement.prototype.close = vi.fn();
  });

  const renderForm = () => {
    return renderWithProviders(
      <ModalContext.Provider value={{ handleModalClose: mockHandleModalClose }}>
        <ControlledForm />
      </ModalContext.Provider>
    );
  };

  it('should render all form fields', () => {
    renderForm();

    expect(screen.getByLabelText(/name:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/gender:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/age:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password:$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/avatar:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/country:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/terms & conditions:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create/i })).toBeInTheDocument();
  });

  it('should disable submit button initially', () => {
    renderForm();

    const submitButton = screen.getByRole('button', { name: /create/i });
    expect(submitButton).toBeDisabled();
  });

  it('should show validation error for required fields', async () => {
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByLabelText(/name:/i), 'John');
    await user.clear(screen.getByLabelText(/name:/i));
    await user.tab();

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
    });
  });

  it('should enable submit button when form is valid', async () => {
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByLabelText(/name:/i), 'John Doe');
    await user.type(screen.getByLabelText(/email:/i), 'john@example.com');
    await user.selectOptions(screen.getByLabelText(/gender:/i), 'male');
    await user.type(screen.getByLabelText(/age:/i), '25');
    await user.type(screen.getByLabelText(/^password:$/i), 'StrongP@ss123');
    await user.type(
      screen.getByLabelText(/confirm password:/i),
      'StrongP@ss123'
    );
    await user.type(screen.getByLabelText(/country:/i), 'Russia');
    await user.click(screen.getByLabelText(/terms & conditions:/i));

    const file = new File(['dummy'], 'avatar.png', { type: 'image/png' });
    await user.upload(screen.getByLabelText(/avatar:/i), file);

    await waitFor(() => {
      const submitButton = screen.getByRole('button', { name: /create/i });
      expect(submitButton).not.toBeDisabled();
    });
  });

  it('should submit form and add user to store', async () => {
    const user = userEvent.setup();
    const { store } = renderForm();

    await user.type(screen.getByLabelText(/name:/i), 'John Doe');
    await user.type(screen.getByLabelText(/email:/i), 'john@example.com');
    await user.selectOptions(screen.getByLabelText(/gender:/i), 'male');
    await user.type(screen.getByLabelText(/age:/i), '25');
    await user.type(screen.getByLabelText(/^password:$/i), 'StrongP@ss123');
    await user.type(
      screen.getByLabelText(/confirm password:/i),
      'StrongP@ss123'
    );
    await user.type(screen.getByLabelText(/country:/i), 'Russia');
    await user.click(screen.getByLabelText(/terms & conditions:/i));

    const file = new File(['dummy'], 'avatar.png', { type: 'image/png' });
    await user.upload(screen.getByLabelText(/avatar:/i), file);

    await user.click(screen.getByRole('button', { name: /create/i }));

    await waitFor(() => {
      const state = store.getState();
      expect(state.appData.users).toHaveLength(1);
      expect(state.appData.users[0].name).toBe('John Doe');
    });
  });

  it('should update password strength indicator on password change', async () => {
    const user = userEvent.setup();
    renderForm();

    const passwordInput = screen.getByLabelText(/^password:$/i);
    await user.type(passwordInput, 'StrongP@ss123');

    await waitFor(() => {
      const strengthIndicator = document.querySelector('.bg-green-500');
      expect(strengthIndicator).toBeInTheDocument();
    });
  });
});

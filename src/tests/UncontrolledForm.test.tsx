import { describe, it, expect, beforeEach, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UncontrolledFrom } from '../components/forms/uncontrolledFrom';
import { renderWithProviders } from './test-utils';
import { ModalContext } from '../hooks/useModalContext';

vi.mock('../../utils/fileToBase64', () => ({
  fileToBase64: vi.fn(() => Promise.resolve('base64mockstring')),
}));

describe('UncontrolledForm - Behavior Tests', () => {
  const mockHandleModalClose = vi.fn();

  beforeEach(() => {
    HTMLDialogElement.prototype.showModal = vi.fn();
    HTMLDialogElement.prototype.close = vi.fn();
  });

  const FormWithProvider = () => (
    <ModalContext.Provider value={{ handleModalClose: mockHandleModalClose }}>
      <UncontrolledFrom />
    </ModalContext.Provider>
  );

  const renderForm = () => {
    return renderWithProviders(<FormWithProvider />);
  };

  it('should render all form fields', () => {
    renderForm();

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/gender/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/age/i)).toBeInTheDocument();
    expect(document.getElementById('password')).toBeInTheDocument();
    expect(document.getElementById('confirmPassword')).toBeInTheDocument();
    expect(screen.getByLabelText(/avatar/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/terms & conditions/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create/i })).toBeInTheDocument();
  });

  it('should show validation errors for invalid form submission', async () => {
    const user = userEvent.setup();
    renderForm();

    const submitButton = screen.getByRole('button', { name: /create/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Age is required')).toBeInTheDocument();

      expect(
        screen.getByText('Confirm password is required')
      ).toBeInTheDocument();
    });
  });

  it('should update password strength indicator on password change', async () => {
    const user = userEvent.setup();
    renderForm();

    const passwordInput = document.getElementById(
      'password'
    ) as HTMLInputElement;
    await user.type(passwordInput, 'StrongP@ss123');

    await waitFor(() => {
      const strengthIndicator = document.querySelector('.bg-green-500');
      expect(strengthIndicator).toBeInTheDocument();
    });
  });
});

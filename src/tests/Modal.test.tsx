import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from '../components/ui/modal';

vi.mock('react-dom', async () => {
  const actual = await vi.importActual('react-dom');
  return {
    ...actual,
    createPortal: (node: React.ReactNode) => node,
  };
});

describe('Modal - Behavior Tests', () => {
  const modalTitle = 'Test Modal';
  const buttonText = 'Open Modal';
  const childrenContent = 'Modal content';

  describe('Opening and Closing', () => {
    it('should render button with buttonContent', () => {
      render(
        <Modal title={modalTitle} buttonContent={buttonText}>
          <div>{childrenContent}</div>
        </Modal>
      );

      expect(screen.getByText(buttonText)).toBeInTheDocument();
    });

    it('should open modal when button is clicked', async () => {
      const user = userEvent.setup();

      render(
        <Modal title={modalTitle} buttonContent={buttonText}>
          <div>{childrenContent}</div>
        </Modal>
      );

      await user.click(screen.getByText(buttonText));

      expect(screen.getByText(modalTitle)).toBeInTheDocument();
      expect(screen.getByText(childrenContent)).toBeInTheDocument();
    });

    it('should close modal when close button is clicked', async () => {
      const user = userEvent.setup();

      render(
        <Modal title={modalTitle} buttonContent={buttonText}>
          <div>{childrenContent}</div>
        </Modal>
      );

      await user.click(screen.getByText(buttonText));
      expect(screen.getByText(modalTitle)).toBeInTheDocument();

      await user.click(screen.getByLabelText('Close modal'));

      expect(HTMLDialogElement.prototype.close).toHaveBeenCalled();
    });

    it('should close modal when pressing Escape key', async () => {
      const user = userEvent.setup();

      render(
        <Modal title={modalTitle} buttonContent={buttonText}>
          <div>{childrenContent}</div>
        </Modal>
      );

      await user.click(screen.getByText(buttonText));
      expect(screen.getByText(modalTitle)).toBeInTheDocument();

      await user.keyboard('{Escape}');

      expect(HTMLDialogElement.prototype.close).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should have aria-label on close button', () => {
      render(
        <Modal title={modalTitle} buttonContent={buttonText}>
          <div>{childrenContent}</div>
        </Modal>
      );

      const closeButton = screen.getByLabelText('Close modal');
      expect(closeButton).toBeInTheDocument();
    });

    it('should have proper heading level', async () => {
      const user = userEvent.setup();

      render(
        <Modal title={modalTitle} buttonContent={buttonText}>
          <div>{childrenContent}</div>
        </Modal>
      );

      await user.click(screen.getByText(buttonText));

      const heading = screen.getByRole('heading', { name: modalTitle });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe('H3');
    });
  });

  describe('Portal rendering', () => {
    it('should render modal content when open', async () => {
      const user = userEvent.setup();

      render(
        <Modal title={modalTitle} buttonContent={buttonText}>
          <div>{childrenContent}</div>
        </Modal>
      );

      await user.click(screen.getByText(buttonText));

      expect(screen.getByText(modalTitle)).toBeInTheDocument();
      expect(screen.getByText(childrenContent)).toBeInTheDocument();
    });
  });
});

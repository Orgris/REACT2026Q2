import { useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Button } from './button';
import { ModalContext } from '../../hooks/useModalContext';

type ModalProps = {
  title: string;
  buttonContent: ReactNode;
  children: ReactNode;
};

export function Modal({ title, buttonContent, children }: ModalProps) {
  const [showModal, setShowModal] = useState(true);
  const backDropRef = useRef<HTMLDivElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showModal || !modalRef.current) {
      return;
    }

    const focusableElements = modalRef.current.querySelectorAll(
      'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    firstElement.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        handleModalClose();
      }
      if (event.key === 'Tab') {
        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            event.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            event.preventDefault();
          }
        }
      }
    };

    document.body.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.removeEventListener('keydown', handleKeyDown);
    };
  }, [showModal]);

  function handleModalOpen() {
    setShowModal(true);
  }

  function handleModalClose() {
    setShowModal(false);
    openButtonRef.current?.focus();
  }

  function handleBackdropClick(event: React.MouseEvent) {
    if (backDropRef.current && event.target === backDropRef.current) {
      handleModalClose();
    }
  }

  return (
    <>
      <Button ref={openButtonRef} onClick={handleModalOpen}>
        {buttonContent}
      </Button>

      {showModal &&
        createPortal(
          <div
            ref={backDropRef}
            onClick={handleBackdropClick}
            className="
              absolute top-1/2 left-1/2 z-100 flex size-full -translate-1/2
              flex-col items-center justify-center bg-(--bg)/50
            "
          >
            <div
              ref={modalRef}
              aria-modal="true"
              role="dialog"
              className="
                flex flex-col gap-6 rounded-lg border-3 border-(--border)
                bg-(--bg) p-6
              "
            >
              <div className="flex items-center justify-between">
                <p className="text-xl">{title}</p>
                <Button
                  aria-label="Close modal"
                  className="self-end"
                  onClick={handleModalClose}
                >
                  X
                </Button>
              </div>

              <div className="h-px w-full rounded-lg border-2 border-(--border)"></div>

              <ModalContext.Provider
                value={{ handleModalClose: handleModalClose }}
              >
                {children}
              </ModalContext.Provider>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

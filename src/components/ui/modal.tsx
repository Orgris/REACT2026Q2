import { useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Button } from './button';
import { ModalContext } from '../../hooks/useModalContext';
import CloseSvg from '../../assets/close-x.svg?react';

type ModalProps = {
  title: string;
  buttonContent: ReactNode;
  children: ReactNode;
};

export function Modal({ title, buttonContent, children }: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [modalKey, setModalKey] = useState(0);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  function handleOpen() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
    setModalKey((prev) => prev + 1);
  }

  function handleBackdropClick(event: React.MouseEvent) {
    if (event.target === dialogRef.current) {
      handleClose();
    }
  }

  return (
    <>
      <Button ref={openButtonRef} onClick={handleOpen}>
        {buttonContent}
      </Button>

      {createPortal(
        <dialog
          ref={dialogRef}
          onClose={handleClose}
          onClick={handleBackdropClick}
          className="
            m-auto rounded-lg border-3 border-(--border) bg-(--bg) p-6
            backdrop:bg-(--bg)/50
          "
        >
          <div key={modalKey} className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl">{title}</h3>
              <Button
                aria-label="Close modal"
                autoFocus
                className="
                  self-end border-(--border) bg-red-500 p-1! text-(--bg)
                  hover:border-red-600 hover:bg-red-600
                  active:border-(--text-h)
                "
                onClick={handleClose}
              >
                <CloseSvg className="size-4" />
              </Button>
            </div>

            <div className="h-px w-full rounded-lg border-2 border-(--border)"></div>

            <ModalContext.Provider value={{ handleModalClose: handleClose }}>
              {children}
            </ModalContext.Provider>
          </div>
        </dialog>,
        document.body
      )}
    </>
  );
}

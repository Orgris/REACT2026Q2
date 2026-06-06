import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { Button } from './button';

type ModalProps = {
  title: string;
  children: ReactNode;
  onClose: () => void;
};

export function Modal({ title, children, onClose }: ModalProps) {
  const handleClose = () => {
    onClose();
  };

  return createPortal(
    <div
      className="
        absolute top-1/2 left-1/2 z-100 flex -translate-1/2 flex-col gap-6
        rounded-lg border-3 border-(--border) bg-(--bg) p-6
      "
    >
      <div className="flex items-center justify-between">
        <p className="text-xl">{title}</p>
        <Button className="self-end" onClick={handleClose}>
          X
        </Button>
      </div>
      <div className="h-px w-full rounded-lg border-2 border-(--border)"></div>

      {children}
    </div>,

    document.body
  );
}

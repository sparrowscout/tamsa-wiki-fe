import useModalStore, { Modal } from '@/store/useModalStore';
import { ReactNode, useCallback, useId } from 'react';

const isModalEmpty = (arr: Modal[]) => arr.length === 0;

const useModal = () => {
  const { modal, addModal, removeModal } = useModalStore();
  const id = useId();

  const openModal = useCallback(
    (element: ReactNode) => {
      addModal({ id, element });
      document.body.style.overflow = 'hidden';
    },
    [id, addModal]
  );

  const closeModal = useCallback(() => {
    removeModal(id);
    if (isModalEmpty(modal)) document.body.style.overflow = 'unset';
  }, [modal, id, removeModal]);

  return { openModal, closeModal };
};

export default useModal;

import { ReactNode } from 'react';
import { create } from 'zustand';

export type Modal = {
  id: string;
  element: ReactNode;
};

type ModalState = {
  modal: Modal[];
};

type ModalAction = {
  addModal: (element: Modal) => void;
  removeModal: (id: Modal['id']) => void;
};

const useModalStore = create<ModalState & ModalAction>()((set) => ({
  modal: [],
  addModal: (element: Modal) => set((state) => ({ modal: [...state.modal, element] })),
  removeModal: (id: Modal['id']) =>
    set((state) => ({ modal: state.modal.filter((item) => item.id !== id) })),
}));

export default useModalStore;

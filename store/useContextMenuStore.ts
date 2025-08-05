import { ReactNode } from 'react';
import { create } from 'zustand';

export type ContextMenu = {
  id: string;
  element: ReactNode;
};

type ContextMenuState = {
  menu: ContextMenu | null;
};

type ContextMenuAction = {
  addMenu: (menu: ContextMenu) => void;
  removeMenu: () => void;
};

const useContextMenuStore = create<ContextMenuState & ContextMenuAction>()((set) => ({
  menu: null,
  addMenu: (menu: ContextMenu) => set({ menu: menu }),
  removeMenu: () => set({ menu: null }),
}));

export default useContextMenuStore;

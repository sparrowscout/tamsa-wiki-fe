import useContextMenuStore from '@/store/useContextMenuStore';
import { ReactNode, useCallback, useId } from 'react';

const useContextMenu = () => {
  const { addMenu, removeMenu } = useContextMenuStore();
  const id = useId();

  const openMenu = useCallback(
    (element: ReactNode) => {
      addMenu({ id, element });
    },
    [id, addMenu]
  );

  const closeMenu = useCallback(() => {
    removeMenu();
  }, [removeMenu]);

  return { openMenu, closeMenu };
};

export default useContextMenu;

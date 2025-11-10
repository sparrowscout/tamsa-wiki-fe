'use client';
import useContextMenu from '@/hooks/useContextMenu';
import useContextMenuStore from '@/store/useContextMenuStore';

export default function MenuProvider() {
  const { menu } = useContextMenuStore();
  const { closeMenu } = useContextMenu();

  if (menu)
    return (
      <>
        <div
          className="w-dvw h-dvh fixed bg-transparent z-[98]"
          onClick={closeMenu}
          onContextMenu={closeMenu}
        />
        <div className="[&>div]:z-[99]" id="modal">
          {menu?.element}
        </div>
      </>
    );
  else return null;
}

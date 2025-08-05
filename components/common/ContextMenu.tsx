import useContextMenu from '@/hooks/useContextMenu';
import styled, { css } from 'styled-components';

interface ContextMenuProps {
  options: Menu[];
  pageX: number;
  pageY: number;
}

interface Menu {
  text: string;
  action: () => void;
}

export default function ContextMenu({ options, pageX, pageY }: ContextMenuProps) {
  const { closeMenu } = useContextMenu();

  const onClickContext = (action: () => void) => {
    closeMenu();
    action();
  };

  return (
    <ContextMenuContainer $x={pageX} $y={pageY} className="bg-white shadow-lg p-1 rounded-md">
      {options.map((item, index) => {
        return (
          <div
            key={index}
            onClick={() => onClickContext(item.action)}
            className="cursor-pointer hover:bg-[#393939] hover:text-[#ffffff] active:bg-[#181818] p-4 rounded-md"
          >
            {item.text}
          </div>
        );
      })}
    </ContextMenuContainer>
  );
}

const ContextMenuContainer = styled.div<{ $x: number; $y: number }>(
  ({ $x, $y }) => css`
    left: ${$x}px;
    top: ${$y}px;
    position: fixed;
  `
);

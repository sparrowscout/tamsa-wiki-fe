import { type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  id: string;
}

function DefaultModal({ children }: Props) {
  return (
    <>
      <div className="fixed left-0 top-0 z-[98] h-full w-full bg-dim-60" />
      <div
        className="fixed left-1/2 top-1/2 z-[99] -translate-x-1/2 -translate-y-1/2 bg-white p-6 shadow-md"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </>
  );
}

export default DefaultModal;

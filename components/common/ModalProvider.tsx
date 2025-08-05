'use client';
import useModalStore from '@/store/useModalStore';
import DefaultModal from './DefaultModal';

export default function ModalProvider() {
  const { modal } = useModalStore();
  return (
    <>
      {modal.map(({ id, element }) => (
        <DefaultModal key={id} id={id}>
          {element}
        </DefaultModal>
      ))}
    </>
  );
}

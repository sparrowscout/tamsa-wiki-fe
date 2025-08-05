import DownWardIcon from '@/asset/icons/arrow_downward.svg';
import { usePostCorrectionsMutation } from '@/hooks/query/ocr/corrections/useCorrections.mutate';
import useOCRTextStore from '@/store/useOCRTextStore';
import Image from 'next/image';
import { useRef } from 'react';

interface FixWordProps {
  original: string;
  closeModal: () => void;
  indexStart: number;
  indexEnd: number;
}

export default function FixWord({ closeModal, original, indexStart, indexEnd }: FixWordProps) {
  const { fixTypo } = useOCRTextStore();
  const FixedWordRef = useRef<HTMLTextAreaElement>(null);
  const { mutateAsync: mutateCorrections } = usePostCorrectionsMutation();

  const onClose = () => {
    closeModal();
  };

  const onClickModify = async () => {
    if (!FixedWordRef.current) return;

    const output = FixedWordRef.current.value;
    const input = original;
    const instruction = '다음 문장에서 오타를 수정하고, 띄어쓰기와 문장부호를 자연스럽게 정리해줘.';

    await mutateCorrections(
      { instruction, input, output },
      {
        onSuccess: () => {
          // todo 1. 오타 전부 교체하는 옵션 넣기
          fixTypo(output, indexStart, indexEnd);
          // todo 2. 완료됐다는 alert

          onClose();
        },
      }
    );
  };

  return (
    <div className="flex flex-col min-w-[300px] gap-2">
      <span className="font-semibold text-sm">기존 문장:</span>
      <div className="bg-gray-50 text-zinc-500 p-4 rounded-md my-1">{original}</div>
      <div className="relative size-6 w-full">
        <Image src={DownWardIcon} fill alt="downward arrow" />
      </div>
      <textarea
        ref={FixedWordRef}
        className="focus:outline-none p-4 rounded-md border-blue-200 border-2 bg-blue-50 resize-none"
        autoFocus
      />
      <div className="flex gap-2 mt-4">
        <button className="bg-gray-200 rounded-md w-full p-2 cursor-pointer" onClick={onClose}>
          취소
        </button>
        <button
          className="bg-gray-700 rounded-md text-white w-full p-2 cursor-pointer"
          onClick={onClickModify}
        >
          수정
        </button>
      </div>
    </div>
  );
}

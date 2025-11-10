'use client';
import useContextMenu from '@/hooks/useContextMenu';
import { useEffect, useRef, useState } from 'react';
import ContextMenu from './common/ContextMenu';
import styled from 'styled-components';
import useModal from '@/hooks/useModal';
import FixWord from './FixWordModal';
import { QuoteSource } from '@/store/useOCRTextStore';

interface OCRQuotesProps {
  body: string;
  source?: QuoteSource;
}

export default function OCRQuotes({ body, source }: OCRQuotesProps) {
  const quotesRef = useRef<HTMLTextAreaElement | null>(null);
  const [height, setHeight] = useState<number>(0);

  const { openMenu } = useContextMenu();
  const { openModal, closeModal } = useModal();

  useEffect(() => {
    if (!quotesRef.current) return;
    setHeight(quotesRef.current.scrollHeight);

    quotesRef.current.oncontextmenu = (event) => {
      event.preventDefault();
      onContextMenu(event);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onContextMenu = (event: MouseEvent) => {
    event.preventDefault();

    const textarea = quotesRef.current;
    if (!textarea) return;

    const indexStart = textarea.selectionStart;
    const indexEnd = textarea.selectionEnd;
    const selection = textarea.value.substring(indexStart, indexEnd);

    if (!selection) return;

    const { pageX, pageY } = event;

    openMenu(
      <ContextMenu
        options={[
          {
            text: '선택한 문장 수정하기',
            action: () => {
              onClickFix(selection, indexStart, indexEnd);
            },
          },
        ]}
        pageX={pageX}
        pageY={pageY}
      />
    );
  };

  // 아직 여기 있어도 될 것 같음 하나 더 늘면 컴포넌트화 하자
  const onClickFix = (original: string, indexStart: number, indexEnd: number) => {
    openModal(
      <FixWord
        closeModal={closeModal}
        original={original}
        indexStart={indexStart}
        indexEnd={indexEnd}
      />
    );
  };

  return (
    <div>
      <OCRTextArea ref={quotesRef} value={body} readOnly $boxHeight={height} />
      {source ? (
        <span>
          - {source.title} {source.episode}화 | {source.author}
        </span>
      ) : null}
    </div>
  );
}

const OCRTextArea = styled.textarea<{ $boxHeight: number }>`
  margin-top: 16px;
  width: 100%;
  overflow: hidden;
  height: ${({ $boxHeight }) => `${$boxHeight}px`};
  box-sizing: border-box;
  border: 2px solid #bedbff;
  border-radius: 8px;
  background: repeating-linear-gradient(to bottom, #ffffff, #ffffff 25px, #bedbff 27px);
  line-height: 1.725rem;
  font-size: 1rem;
  padding: 20px;
  padding-top: 26px;
  outline: none !important;
  resize: none;

  :active {
    outline: none !important;
  }

  :focus {
    outline: none !important;
  }
`;

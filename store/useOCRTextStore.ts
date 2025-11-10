import { create } from 'zustand';
import useCurrentIndexStore from './useCurrentIndexStore';

export type QuoteSource = {
  title: string;
  author: string;
  episode: string;
};

type OCRData = { id: string; content: { body: string; source?: QuoteSource } };

type OCRTextState = {
  textMap: Map<number, OCRData>;
};

type OCRTextAction = {
  setTextMap: (index: number, data: OCRData) => void;
  fixTypo: (typo: string, indexStart: number, indexEnd: number) => void;
  fixTypoAll: (typo: string, fixed: string) => void;
};

function replaceWordsByRange(
  sentence: string | undefined,
  start: number,
  end: number,
  newWords: string | string[]
): string {
  if (!sentence) throw new Error('There is no sentence');

  const 문장 = sentence[0];

  if (start < 0 || end > 문장.length || start > end) {
    throw new Error('Invalid start or end index.');
  }

  const updatedWords = [문장.slice(0, start), newWords, 문장.slice(end)];
  return updatedWords.join('');
}

const useOCRTextStore = create<OCRTextState & OCRTextAction>()((set) => ({
  textMap: new Map(),
  setTextMap: (index: number, data: OCRData) =>
    set((state) => {
      const newMap = new Map(state.textMap);
      newMap.set(index, data);
      return { textMap: newMap };
    }),
  fixTypo: (word: string, indexStart: number, indexEnd: number) =>
    set((state) => {
      const currentIndex = useCurrentIndexStore.getState().currentIndex;
      const oldValue = state.textMap.get(currentIndex);

      if (!oldValue) throw new Error();

      const newSentence = replaceWordsByRange(oldValue.content.body, indexStart, indexEnd, word);
      const newMap = new Map(state.textMap).set(currentIndex, {
        ...oldValue,
        content: { ...oldValue.content, body: newSentence },
      });

      return { textMap: newMap };
    }),
  fixTypoAll: (typo: string, fixed: string) =>
    set((state) => {
      const currentIndex = useCurrentIndexStore.getState().currentIndex;
      const oldValue = state.textMap.get(currentIndex);

      if (!oldValue) throw new Error();

      const newSentence = oldValue.content.body.replaceAll(typo, fixed);
      const newMap = new Map(state.textMap).set(currentIndex, {
        ...oldValue,
        content: { ...oldValue.content, body: newSentence },
      });

      return { textMap: newMap };
    }),
}));

export default useOCRTextStore;

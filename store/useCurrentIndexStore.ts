import { create } from 'zustand';

type CurrentIndexState = {
  currentIndex: number;
};

type CurrentIndexAction = {
  setCurrentIndex: (index: number) => void;
};

const useCurrentIndexStore = create<CurrentIndexState & CurrentIndexAction>()((set) => ({
  currentIndex: 0,
  setCurrentIndex: (index: number) => set({ currentIndex: index }),
}));

export default useCurrentIndexStore;

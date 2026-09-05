import { INITIAL_Z_INDEX, WINDOW_CONFIG } from '@constants';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

const useWindowStore = create(
  immer((set) => ({
    windows: WINDOW_CONFIG,
    nextZIndex: INITIAL_Z_INDEX + 1,

    openWindow: (windowKey, data = null) =>
      set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.isOpen = true;
        win.zIndex = state.nextZIndex;
        win.data = data ?? win.data;
        state.nextZIndex++; // increase the nextZIndex, so when somebody else opens a new window, it appears on top of the existing one.
      }),

    closeWindow: (windowKey) => set((state) => {
      const win = state.windows[windowKey];
      // Defensive: if windowKey is invalid, do nothing
      if (!win) return;
      win.isOpen = false;
      win.zIndex = INITIAL_Z_INDEX;
      win.data = null;
    }),

    focusWindow: (windowKey) => set((state) => {
      const win = state.windows[windowKey];
      win.zIndex = state.nextZIndex++;
    })
  }))
);

export default useWindowStore;
import { create } from 'zustand'

export const useEventStore = create(set => ({
  clickEvent: null,
  setClickEvent: clickEvent => set({ clickEvent }),

  hoverEvent: null,
  setHoverEvent: hoverEvent => set({ hoverEvent }),
}))

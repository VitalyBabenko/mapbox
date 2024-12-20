import { create } from 'zustand'
import { DEFAULT_PAINT } from '../constants'

export const usePaintStore = create(set => ({
  activePaint: DEFAULT_PAINT,
  setActivePaint: paint => set({ activePaint: paint }),

  opacity: [0, 40],
  setOpacity: opacity => set({ opacity }),
}))

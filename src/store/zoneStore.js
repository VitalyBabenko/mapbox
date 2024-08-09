import { create } from 'zustand'

export const useZoneStore = create(set => ({
  isActive: false,
  toggleActive: () => set(state => ({ isActive: !state.isActive })),

  isTipsActive: false,
  toggleTipsActive: () => set(state => ({ isTipsActive: !state.isTipsActive })),

  isScaleActive: false,
  toggleScaleActive: value => {
    if (value) {
      set({ isTipsActive: value })
      return
    }
    set(state => ({ isScaleActive: !state.isScaleActive }))
  },

  zoneOpacity: [0, 30],
  setZoneOpacity: zoneOpacity => set({ zoneOpacity }),
}))

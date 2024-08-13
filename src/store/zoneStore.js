import { create } from 'zustand'

export const useZoneStore = create(set => ({
  isActive: false,
  toggleActive: () => set(state => ({ isActive: !state.isActive })),

  isPrimary: true,
  togglePrimary: value => {
    value !== 'undefined'
      ? set({ isPrimary: value })
      : set(state => ({ isPrimary: !state.isBackground }))
  },

  zoneOpacity: [0, 30],
  setZoneOpacity: zoneOpacity => set({ zoneOpacity }),

  resetZones: () =>
    set({ zoneOpacity: [0, 30], isPrimary: true, isActive: false }),
}))

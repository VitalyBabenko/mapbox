import { create } from 'zustand'
import { MAP_STYLES, MODES } from '../constants'

const getInitialIsPublicPlots = () => {
  try {
    const stored = localStorage.getItem('isPublicPlots')
    return stored !== null ? JSON.parse(stored) : true
  } catch {
    return true
  }
}

export const useModeStore = create(set => ({
  county: null,
  mode: MODES.COUNTIES,
  switcher: MODES.PLOTS,

  toggleSwitcher: value => {
    if (typeof value === 'string') {
      set({ switcher: value })
    } else {
      set(state => ({
        switcher:
          state.switcher === MODES.PLOTS ? MODES.BUILDINGS : MODES.PLOTS,
      }))
    }
  },

  switchToCountiesMode: () => set({ mode: MODES.COUNTIES, county: null }),
  switchToPlotsMode: county =>
    set({ mode: MODES.PLOTS, county, switcher: MODES.PLOTS }),
  switchToBuildingsMode: county =>
    set({ mode: MODES.BUILDINGS, county, switcher: MODES.BUILDINGS }),

  switchToProtectedBuildingsMode: () =>
    set({ mode: MODES.PROTECTED, switcher: MODES.BUILDINGS }),

  switchToProtectedPlotsMode: () =>
    set({ mode: MODES.PROTECTED, switcher: MODES.PLOTS }),

  switchToTagsMode: () => set({ mode: MODES.TAGS, switcher: MODES.PLOTS }),
  switchToBookmarksMode: () =>
    set({ mode: MODES.BOOKMARKS, switcher: MODES.PLOTS }),

  mapStyle: MAP_STYLES[0],
  setMapStyle: mapStyle => set({ mapStyle }),

  isPublicPlots: getInitialIsPublicPlots(),
  togglePublicPlots: () =>
    set(state => {
      const newValue = !state.isPublicPlots
      localStorage.setItem('isPublicPlots', JSON.stringify(newValue))
      return { isPublicPlots: newValue }
    }),
}))

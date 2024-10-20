import { create } from 'zustand'
import { MAP_STYLES, MODES } from '../constants'

export const useModeStore = create(set => ({
  locale: 'en',
  setLocale: locale => set({ locale }),

  county: null,
  mode: MODES.COUNTIES,
  switcher: MODES.PLOTS,
  toggleSwitcher: value => {
    value === 'undefined'
      ? set({ switcher: value })
      : set(state => ({
          switcher:
            state.switcher === MODES.PLOTS ? MODES.BUILDINGS : MODES.PLOTS,
        }))
  },

  switchToCountiesMode: () => set({ mode: MODES.COUNTIES, county: null }),
  switchToPlotsMode: county =>
    set({ mode: MODES.PLOTS, county, switcher: MODES.PLOTS }),
  switchToBuildingsMode: county =>
    set({ mode: MODES.BUILDINGS, county, switcher: MODES.BUILDINGS }),
  switchToFilterMode: () => set({ mode: MODES.FILTER }),

  switchToProtectedBuildingsMode: () =>
    set({ mode: MODES.PROTECTED, switcher: MODES.BUILDINGS }),

  switchToProtectedPlotsMode: () =>
    set({ mode: MODES.PROTECTED, switcher: MODES.PLOTS }),

  mapStyle: MAP_STYLES[0],
  setMapStyle: mapStyle => set({ mapStyle }),
}))

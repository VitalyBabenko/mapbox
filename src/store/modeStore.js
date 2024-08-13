import { create } from 'zustand'
import { MODES } from '../constants'

export const useModeStore = create(set => ({
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

  switchToProtectedBuildingsMode: () =>
    set({ mode: MODES.PROTECTED, switcher: MODES.BUILDINGS }),

  switchToProtectedPlotsMode: () =>
    set({ mode: MODES.PROTECTED, switcher: MODES.PLOTS }),
}))

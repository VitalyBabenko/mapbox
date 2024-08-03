import { create } from 'zustand'
import { MODES } from '../constants'

export const useModeStore = create(set => ({
  county: null,
  mode: MODES.COUNTIES,

  switcher: MODES.PLOTS,
  toggleSwitcher: () =>
    set(state => ({
      switcher: state.switcher === 'plots' ? 'buildings' : 'plots',
    })),

  switchToCountiesMode: () => set({ mode: MODES.COUNTIES, county: null }),
  switchToPlotsMode: county => set({ mode: MODES.PLOTS, county }),
  switchToBuildingsMode: county => set({ mode: MODES.BUILDINGS, county }),
}))

import { create } from 'zustand'

export const useAlertsStore = create(set => ({
  plotsWithAlerts: {},
  setPlotsWithAlerts: plotsWithAlerts => set({ plotsWithAlerts }),
}))

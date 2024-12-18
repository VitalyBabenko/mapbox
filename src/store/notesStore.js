import { create } from 'zustand'

export const useNotesStore = create(set => ({
  plotsWithNotes: {},
  setPlotsWithNotes: plotsWithNotes => set({ plotsWithNotes }),
}))

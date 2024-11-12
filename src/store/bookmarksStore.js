import { create } from 'zustand'

export const useBookmarksStore = create(set => ({
  plotsWithBookmarks: {},
  setPlotsWithBookmarks: plotsWithBookmarks => set({ plotsWithBookmarks }),
}))

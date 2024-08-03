import { create } from 'zustand'

export const useFilterStore = create(set => ({
  allCountiesFeatures: [],
  setAllCountiesFeatures: allCountiesFeatures => set({ allCountiesFeatures }),

  filteredPlotsIds: [],
  setFilteredPlotsIds: filteredPlotsIds => set({ filteredPlotsIds }),
}))

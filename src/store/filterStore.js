import { create } from 'zustand'

export const useFilterStore = create(set => ({
  filters: [],
  setFilters: filters => set({ filters }),

  setFilterValue: (filterId, newValue) => {
    set(prev => ({
      ...prev,
      filters: prev.filters.map(filter =>
        filter.id === filterId ? { ...filter, value: newValue } : filter,
      ),
    }))
  },

  filtersResult: [],
  setFiltersResult: filtersResult => set({ filtersResult }),
}))

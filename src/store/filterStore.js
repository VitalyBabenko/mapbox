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

  // ----------------------

  allFilters: [],
  setAllFilters: newFilters => set({ allFilters: newFilters }),

  checkboxes: [],
  setCheckboxes: checkboxes => set({ checkboxes }),

  accordions: [],
  setAccordions: accordions => set({ accordions }),

  fromValues: {},
  setFormValues: formValues => set({ formValues }),
  setInputValue: (input, value) =>
    set(prev => ({
      ...prev,
      formValues: {
        ...prev.formValues,
        [input]: value,
      },
    })),

  filteredPlotsFeatures: [],
  setFilteredPlotsFeatures: filteredPlotsFeatures =>
    set({ filteredPlotsFeatures }),

  filteredBuildingsFeatures: [],
  setFilteredBuildingsFeatures: filteredBuildingsFeatures =>
    set({ filteredBuildingsFeatures }),
}))

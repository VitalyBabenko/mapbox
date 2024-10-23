import { create } from 'zustand'

export const useFilterStore = create(set => ({
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

  filteredPlotsIds: [],
  setFilteredPlotsIds: filteredPlotsIds => set({ filteredPlotsIds }),

  filteredBuildingsIds: [],
  setFilteredBuildingsIds: filteredBuildingsIds =>
    set({ filteredBuildingsIds }),

  filteredPlotsFeatures: [],
  setFilteredPlotsFeatures: filteredPlotsFeatures =>
    set({ filteredPlotsFeatures }),
}))

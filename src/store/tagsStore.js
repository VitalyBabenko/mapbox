import { create } from 'zustand'

export const useTagsStore = create(set => ({
  isTagModalOpen: false,
  openTagsModal: () => set({ isTagModalOpen: true }),
  closeTagsModal: () => set({ isTagModalOpen: false }),

  isPlotsWithTagsShowed: false,
  setIsPlotsWithTagsShowed: isPlotsWithTagsShowed =>
    set({ isPlotsWithTagsShowed }),

  plotsWithTags: [],
  setPlotsWithTags: plotsWithTags => set({ plotsWithTags }),

  isPlotsWithBookmarksShowed: false,
  setIsPlotsWithBookmarksShowed: isPlotsWithBookmarksShowed =>
    set({ isPlotsWithBookmarksShowed }),

  plotsWithBookmarks: [],
  setPlotsWithBookmarks: plotsWithBookmarks => set({ plotsWithBookmarks }),
}))

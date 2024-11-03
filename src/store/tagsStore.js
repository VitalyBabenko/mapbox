import { create } from 'zustand'

export const useTagsStore = create(set => ({
  isTagModalOpen: false,
  openTagsModal: () => set({ isTagModalOpen: true }),
  closeTagsModal: () => set({ isTagModalOpen: false }),
}))

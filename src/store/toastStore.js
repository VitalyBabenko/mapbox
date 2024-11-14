import { create } from 'zustand'

export const useToastStore = create(set => ({
  open: false,
  message: '',
  status: '',

  success: message => {
    set({ open: true, message, status: 'success' })
    setTimeout(() => {
      set({ open: false })
    }, 9000)
  },

  error: message => {
    set({ open: true, message, status: 'error' })
    setTimeout(() => {
      set({ open: false })
    }, 5000)
  },

  text: message => {
    set({ open: true, message, status: '' })
    setTimeout(() => {
      set({ open: false })
    }, 9000)
  },
}))

import { create } from 'zustand'

export const useDrawerStore = create(set => ({
  isOpen: false,
  contentComponent: null,
  props: {},

  openDrawer: (component, props = {}) =>
    set({
      isOpen: true,
      contentComponent: component,
      props: props,
    }),

  closeDrawer: () =>
    set({
      isOpen: false,
      contentComponent: null,
      props: {},
    }),
}))

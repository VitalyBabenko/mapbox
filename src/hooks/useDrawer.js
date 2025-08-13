import { useDrawerStore } from '../store'

export function useDrawer() {
  const openDrawer = useDrawerStore(state => state.openDrawer)
  const closeDrawer = useDrawerStore(state => state.closeDrawer)

  return {
    openDrawer,
    closeDrawer,
  }
}

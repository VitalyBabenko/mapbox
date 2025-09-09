import { useEffect } from 'react'
import { useDrawerStore, useEventStore } from '../store'
import DrawerPlotContent from '../components/Drawer/DrawerPlotContent/DrawerPlotContent'
import DrawerBuildingContent from '../components/Drawer/DrawerBuildingContent/DrawerBuildingContent'

export function useDrawer() {
  const openDrawer = useDrawerStore(state => state.openDrawer)
  const closeDrawer = useDrawerStore(state => state.closeDrawer)
  const { clickedFeature } = useEventStore()

  useEffect(() => {
    const properties = clickedFeature?.properties

    if (!properties) {
      closeDrawer()
      return
    }

    const egrid = properties.EGRID
    const egid = properties.EGID

    if (egrid) {
      openDrawer(DrawerPlotContent, { activePlotId: egrid })
      return
    }

    if (egid) {
      openDrawer(DrawerBuildingContent, { activeBuildingId: egid })
      return
    }

    closeDrawer()
  }, [clickedFeature, openDrawer, closeDrawer])

  return {
    openDrawer,
    closeDrawer,
  }
}

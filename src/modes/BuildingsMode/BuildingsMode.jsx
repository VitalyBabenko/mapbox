import { useEffect } from 'react'
import {
  useEventStore,
  useFilterStore,
  useModeStore,
  usePaintStore,
} from '@store'
import { BuildingsPopup } from '@modes/BuildingsMode/components/BuildingsPopup'
import Default from '@modes/BuildingsMode/layers/Default'
import FilteredWithCounty from '@modes/BuildingsMode/layers/FilteredWithCounty'
import FilteredWithoutCounty from '@modes/BuildingsMode/layers/FilteredWithoutCounty'
import DrawerBuildingContent from '@components/Drawer/DrawerBuildingContent/DrawerBuildingContent'
import { useDrawer } from '@hooks'

/**
 * BuildingsMode
 *
 * This component manages the rendering of building layers on the map based on three distinct scenarios:
 *
 * 1. **Default Mode (No Search Active)**
 *    Renders all buildings filtered by the selected county (commune).
 *    This is the standard view when there is no active search query.
 *
 * 2. **Search Mode (Search Active without County Selected)**
 *    Renders only the buildings that match the current search results, regardless of county.
 *    This mode highlights filtered buildings across all counties.
 *
 * 3. **Search Mode with County Selected (Search Active with County Selected)**
 *    Renders buildings filtered by both the search results and the selected county.
 *    This mode restricts the search results to those buildings within the currently selected county.
 *
 * Additionally, when a building is hovered, a popup with detailed information is displayed.
 * The component only renders when the map mode is set to "buildings".
 */
const BuildingsMode = () => {
  const { county, switcher } = useModeStore()
  const { activePaint } = usePaintStore()
  const { filtersResult } = useFilterStore()
  const { hoveredFeature, clickedFeature } = useEventStore()
  const { openDrawer, closeDrawer } = useDrawer()

  const isActive = switcher === 'buildings'

  useEffect(() => {
    const handlePlotClick = () => {
      const egid = clickedFeature?.properties?.EGID

      if (egid) {
        openDrawer(DrawerBuildingContent, { activeBuildingId: egid })
      }
    }

    handlePlotClick()
  }, [clickedFeature])

  if (!isActive) return null

  const isSearch = Boolean(filtersResult?.length)
  const hasCounty = Boolean(county)

  let layer = null

  switch (true) {
    case isSearch && hasCounty:
      layer = (
        <FilteredWithCounty filtersResult={filtersResult} county={county} />
      )
      break

    case isSearch && !hasCounty:
      layer = <FilteredWithoutCounty filtersResult={filtersResult} />
      break

    default:
      layer = <Default county={county} />
  }

  return (
    <>
      {layer}

      {hoveredFeature?.properties && (
        <BuildingsPopup
          hoveredFeature={hoveredFeature}
          isActive={isActive}
          activePaint={activePaint}
        />
      )}
    </>
  )
}

export default BuildingsMode

import { useEffect } from 'react'
import { Popup } from 'react-map-gl'
import { useModeStore, useEventStore, useFilterStore } from '@store'
import { PlotsPopup } from '@modes/PlotsMode/components/PlotsPopup'
import Default from '@modes/PlotsMode/layers/Default'
import FilteredWithoutCounty from '@modes/PlotsMode/layers/FilteredWithoutCounty'
import FilteredWithCounty from '@modes/PlotsMode/layers/FilteredWithCounty'
import PublicPlotsSwitcher from './components/PublicPlotsSwitcher/PublicPlotsSwitcher'
import { useDrawer } from '@hooks'
import DrawerPlotContent from '@components/Drawer/DrawerPlotContent/DrawerPlotContent'

/**
 * PlotsMode — land plots display mode.
 *
 * It has three scenarios:
 * 1. Default — displays all plots for the selected county without search.
 * 2. Search without county — search is active, but no county is selected.
 * 3. Search with county — search is active and a county is selected; only plots within this county are displayed.
 *
 * Also displays hover popups for plots and a special popup for "Pool".
 */
const PlotsMode = () => {
  const { county, switcher } = useModeStore()
  const { clickedFeature, hoveredFeature, hoverEvent } = useEventStore()
  const { filtersResult } = useFilterStore()
  const { openDrawer, closeDrawer } = useDrawer()
  const isActive = switcher === 'plots'
  const isSearch = Boolean(filtersResult?.length && isActive)
  const hasCounty = Boolean(county)

  useEffect(() => {
    const handlePlotClick = () => {
      const egrid = clickedFeature?.properties?.EGRID

      if (egrid) {
        openDrawer(DrawerPlotContent, { activePlotId: egrid })
      }

      if (clickedFeature === null) {
        closeDrawer()
      }
    }

    handlePlotClick()
  }, [clickedFeature])

  if (!isActive) return null

  let layer = null
  switch (true) {
    case isSearch && hasCounty:
      layer = (
        <FilteredWithCounty county={county} filtersResult={filtersResult} />
      )
      break
    case isSearch && !hasCounty:
      layer = <FilteredWithoutCounty filtersResult={filtersResult} />
      break
    default:
      layer = <Default county={county} />
      break
  }

  return (
    <>
      {layer}

      <PlotsPopup
        hoveredFeature={hoveredFeature}
        hoverEvent={hoverEvent}
        isActive={isActive}
      />

      {hoveredFeature?.properties?.MUTCOM && (
        <Popup
          longitude={hoverEvent.lngLat.lng}
          latitude={hoverEvent.lngLat.lat}
          offset={[0, -5]}
          closeButton={false}
          className='hover-popup'
        >
          Pool
        </Popup>
      )}

      <PublicPlotsSwitcher />
    </>
  )
}

export default PlotsMode

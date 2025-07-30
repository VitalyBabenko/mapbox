import { memo } from 'react'
import { Popup } from 'react-map-gl'
import { useModeStore, useEventStore, useFilterStore } from '../../store'
import { PlotsPopup } from './components/PlotsPopup'
import Default from './layers/Default'
import FilteredWithoutCounty from './layers/FilteredWithoutCounty'
import FilteredWithCounty from './layers/FilteredWithCounty'

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
  const { hoveredFeature, hoverEvent } = useEventStore()
  const { filtersResult } = useFilterStore()

  const isActive = switcher === 'plots'
  const isSearch = Boolean(filtersResult?.length && isActive)
  const hasCounty = Boolean(county)

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
    </>
  )
}

export default memo(PlotsMode)

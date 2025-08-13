import {
  BookmarksMode,
  BuildingsMode,
  CountiesMode,
  PlotsMode,
  ProtectedMode,
  TagsMode,
  ZonesMode,
} from '../../modes'
import { ModeSwitcher, PoolsLayer } from '../../components'
import {
  BuildingsPanel,
  FiltersPanel,
  MapDataPanel,
  ScalePanel,
} from '../../panels'
import { MODES } from '../../constants'
import { useEventStore, useModeStore, useZoneStore } from '../../store'
import { useRef } from 'react'

const MainPage = () => {
  const resetViewButtonRef = useRef(null)
  const { clickedFeature } = useEventStore()
  const { isZonesActive, isZonesPrimary } = useZoneStore()
  const { mode, switcher } = useModeStore()

  const getIsModeActive = currentMode => {
    if (isZonesPrimary && isZonesActive) return false
    return mode === currentMode
  }

  return (
    <>
      <CountiesMode isActive={getIsModeActive(MODES.COUNTIES)} />
      <PlotsMode isActive={getIsModeActive(MODES.PLOTS)} />
      <BuildingsMode isActive={getIsModeActive(MODES.BUILDINGS)} />
      <ProtectedMode isActive={getIsModeActive(MODES.PROTECTED)} />
      <TagsMode isActive={getIsModeActive(MODES.TAGS)} />
      <BookmarksMode isActive={getIsModeActive(MODES.BOOKMARKS)} />
      <ZonesMode />
      <PoolsLayer />
      <ModeSwitcher resetViewButtonRef={resetViewButtonRef} />
      <FiltersPanel
        filtersFor={switcher === MODES.PLOTS ? 'plots' : 'buildings'}
        resetViewButtonRef={resetViewButtonRef}
      />
      <MapDataPanel />
      <ScalePanel />

      <BuildingsPanel activeBuildingId={clickedFeature?.properties?.EGID} />
    </>
  )
}

export default MainPage

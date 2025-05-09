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
  PlotsPanel,
  ScalePanel,
} from '../../panels'
import { MODES } from '../../constants'
import { useEventStore, useModeStore, useZoneStore } from '../../store'

const MainPage = () => {
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
      <ModeSwitcher />
      <FiltersPanel
        filtersFor={switcher === MODES.PLOTS ? 'plots' : 'buildings'}
      />
      <MapDataPanel />
      <ScalePanel />
      <PlotsPanel activePlotId={clickedFeature?.properties?.EGRID} />
      <BuildingsPanel activeBuildingId={clickedFeature?.properties?.EGID} />
    </>
  )
}

export default MainPage

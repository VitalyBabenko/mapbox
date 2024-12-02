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
import { FiltersPanel, MapDataPanel } from '../../panels'
import { MODES } from '../../constants'

const MainPage = ({ isMapLoading, isZonesActive, isZonesPrimary, mode }) => {
  const getIsModeActive = currentMode => {
    if (isMapLoading) return false
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
      <FiltersPanel />
      <MapDataPanel />
    </>
  )
}

export default MainPage

import { useEffect } from 'react'
import { ProtectedMode, TagsMode, ZonesMode } from '../../modes'
import { PlotsPanel } from '../../panels'
import SettingsPanel from '../../panels/SettingsPanel/SettingsPanel'
import { useEventStore } from '../../store'
import { MODES } from '../../constants'

const TagsPage = ({ isMapLoading, isZonesPrimary, isZonesActive, mode }) => {
  const { clickedFeature } = useEventStore()

  useEffect(() => {}, [])

  const getIsModeActive = currentMode => {
    if (isMapLoading) return false
    if (isZonesPrimary && isZonesActive) return false
    return mode === currentMode
  }

  return (
    <>
      <SettingsPanel />
      <TagsMode isActive={true} />
      <ZonesMode />
      <PlotsPanel activePlotId={clickedFeature?.properties?.EGRID} />
      <ProtectedMode isActive={getIsModeActive(MODES.PROTECTED)} />
    </>
  )
}

export default TagsPage

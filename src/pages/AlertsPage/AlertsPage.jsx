import { MODES } from '../../constants'
import { BookmarksMode, ProtectedMode, ZonesMode } from '../../modes'
import AlertsMode from '../../modes/AlertsMode/AlertsMode'
import { PlotsPanel } from '../../panels'
import FeaturesPanel from '../../panels/FeaturesPanel/FeaturesPanel'
import SettingsPanel from '../../panels/SettingsPanel/SettingsPanel'
import { useAlertsStore, useEventStore } from '../../store'
import { FaRegBell as BellIcon, FaBell as BellIconSolid } from 'react-icons/fa'

const AlertsPage = ({ isMapLoading, isZonesPrimary, isZonesActive, mode }) => {
  const { clickedFeature } = useEventStore()
  const { plotsWithAlerts } = useAlertsStore()

  const getIsModeActive = currentMode => {
    if (isMapLoading) return false
    if (isZonesPrimary && isZonesActive) return false
    return mode === currentMode
  }

  console.log(plotsWithAlerts)

  return (
    <>
      <SettingsPanel />
      <AlertsMode isActive={true} />
      <ZonesMode />
      <PlotsPanel activePlotId={clickedFeature?.properties?.EGRID} />
      <ProtectedMode isActive={getIsModeActive(MODES.PROTECTED)} />
      <FeaturesPanel
        icon={<BellIconSolid />}
        title='Alerts'
        buttonIcon={<BellIcon size={16} />}
        buttonText='Alerts'
        features={plotsWithAlerts.features}
        emptyTitle='Alerts Empty'
      />
    </>
  )
}

export default AlertsPage

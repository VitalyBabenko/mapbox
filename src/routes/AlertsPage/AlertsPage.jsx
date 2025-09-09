import { useEffect, useState } from 'react'
import { FeaturesPanel, SettingsPanel } from '../../panels'
import { FaRegBell as BellIcon, FaBell as BellIconSolid } from 'react-icons/fa'
import { plotService } from '../../service/plotService'
import GeojsonRenderer from '../../components/GeojsonRenderer/GeojsonRenderer'

const AlertsPage = () => {
  const [plotsWithAlerts, setPlotsWithAlerts] = useState([])

  useEffect(() => {
    const getPlotsWithAlerts = async () => {
      const resp = await plotService.getAllPlotsFeaturesWithAlerts()
      setPlotsWithAlerts(resp)
    }
    getPlotsWithAlerts()
  }, [])

  return (
    <>
      <SettingsPanel />

      <GeojsonRenderer
        sourceId='alertsSource'
        layerId='alertsLayer'
        isActive={true}
        geojson={plotsWithAlerts}
      />

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

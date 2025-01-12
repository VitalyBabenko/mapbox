import { MODES } from '../../constants'
import { CountiesMode, PlotsMode } from '../../modes'
import { MapDataPanel, PlotsEnergyPanel } from '../../panels'
import { useEventStore, useModeStore } from '../../store'

const EnergyPage = () => {
  const { clickedFeature } = useEventStore()
  const { mode } = useModeStore()

  return (
    <>
      <PlotsEnergyPanel activePlotId={clickedFeature?.properties?.EGRID} />

      <CountiesMode isActive={mode === MODES.COUNTIES} />
      <PlotsMode isActive={mode === MODES.PLOTS} />

      <MapDataPanel />
    </>
  )
}

export default EnergyPage

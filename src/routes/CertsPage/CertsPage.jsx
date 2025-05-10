import { ResetViewButton } from '../../components'
import { MODES } from '../../constants'
import { BuildingsMode, CountiesMode, PlotsMode } from '../../modes'
import { BuildingsPanel, PlotsPanel, SettingsPanel } from '../../panels'
import { useEventStore, useModeStore } from '../../store'

const CertsPage = () => {
  const { mode } = useModeStore()
  const { clickedFeature } = useEventStore()

  return (
    <>
      <CountiesMode
        isActive={mode === MODES.COUNTIES}
        modeOnCountyClick={MODES.PLOTS}
      />

      <PlotsMode isActive={mode === MODES.PLOTS} />
      <BuildingsMode isActive={mode === MODES.BUILDINGS} />

      <PlotsPanel activePlotId={clickedFeature?.properties?.EGRID} />
      <BuildingsPanel activeBuildingId={clickedFeature?.properties?.EGID} />
      <SettingsPanel />

      <ResetViewButton top={10} right={175} isVisible={mode === MODES.PLOTS} />
    </>
  )
}

export default CertsPage

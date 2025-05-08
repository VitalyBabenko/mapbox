import { ResetViewButton } from '../../components'
import { MODES } from '../../constants'
import { CountiesMode, PlotsMode } from '../../modes'
import { CertsPanel, SettingsPanel } from '../../panels'
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

      <CertsPanel activePlotId={clickedFeature?.properties?.EGRID} />

      <SettingsPanel />

      <ResetViewButton top={10} right={175} isVisible={mode === MODES.PLOTS} />
    </>
  )
}

export default CertsPage

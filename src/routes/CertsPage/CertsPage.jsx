import { ModeSwitcher, ResetViewButton } from '../../components'
import { MODES } from '../../constants'
import { BuildingsMode, CountiesMode, PlotsMode } from '../../modes'
import { SettingsPanel } from '../../panels'
import { useFilterStore, useModeStore } from '../../store'

const CertsPage = () => {
  const { mode } = useModeStore()
  const { filtersResult } = useFilterStore()

  const isFilter = !!filtersResult.length

  const isResetButtonVisible = mode !== 'counties' || isFilter

  return (
    <>
      <CountiesMode
        isActive={mode === MODES.COUNTIES}
        modeOnCountyClick={MODES.PLOTS}
      />

      <ModeSwitcher isResetButtonNeeded={false} />

      <PlotsMode isActive={mode === MODES.PLOTS} />
      <BuildingsMode isActive={mode === MODES.BUILDINGS} />
      <SettingsPanel />

      <ResetViewButton top={10} right={175} isVisible={isResetButtonVisible} />
    </>
  )
}

export default CertsPage

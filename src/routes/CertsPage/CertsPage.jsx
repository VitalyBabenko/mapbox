import { ModeSwitcher, ResetViewButton } from '../../components'
import { MODES } from '../../constants'
import { BuildingsMode, CountiesMode, PlotsMode } from '../../modes'
import {
  BuildingsPanel,
  FiltersContainer,
  PlotsPanel,
  SettingsPanel,
} from '../../panels'
import { useEventStore, useFilterStore, useModeStore } from '../../store'

const CertsPage = () => {
  const { mode } = useModeStore()
  const { clickedFeature } = useEventStore()
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

      <PlotsPanel activePlotId={clickedFeature?.properties?.EGRID} />
      <BuildingsPanel activeBuildingId={clickedFeature?.properties?.EGID} />
      <SettingsPanel />
      <FiltersContainer filtersFor='construction-certs' />

      <ResetViewButton top={10} right={175} isVisible={isResetButtonVisible} />
    </>
  )
}

export default CertsPage

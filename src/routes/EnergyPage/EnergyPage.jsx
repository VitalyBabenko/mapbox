import { MODES } from '../../constants'
import { BuildingsMode, CountiesMode } from '../../modes'
import {
  BuildingsPanel,
  FiltersPanel,
  PlotsPanel,
  ScalePanel,
  SettingsPanel,
} from '../../panels'
import { useModeStore, useEventStore } from '../../store'
import EnergySwitcher from '../../components/EnergySwitcher/EnergySwitcher'

const EnergyPage = () => {
  const { mode } = useModeStore()
  const { clickedFeature } = useEventStore()

  return (
    <>
      <EnergySwitcher />

      <CountiesMode
        isActive={mode === MODES.COUNTIES}
        modeOnCountyClick={MODES.BUILDINGS}
      />
      <BuildingsMode isActive={mode === MODES.BUILDINGS} />

      <PlotsPanel activePlotId={clickedFeature?.properties?.EGRID} />
      <BuildingsPanel activeBuildingId={clickedFeature?.properties?.EGID} />

      {/* TODO: change filtersFor = 'energies', when backend is ready */}
      <FiltersPanel filtersFor='plots' />
      <SettingsPanel />
      <ScalePanel initialPosition={{ x: 10, y: 88 }} side='left' />
    </>
  )
}

export default EnergyPage

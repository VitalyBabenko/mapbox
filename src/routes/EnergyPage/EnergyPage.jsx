import { MODES } from '../../constants'
import { BuildingsMode, CountiesMode } from '../../modes'
import { FiltersPanel, ScalePanel, SettingsPanel } from '../../panels'
import { useModeStore } from '../../store'
import EnergySwitcher from '../../components/EnergySwitcher/EnergySwitcher'

const EnergyPage = () => {
  const { mode } = useModeStore()

  return (
    <>
      <EnergySwitcher />

      <CountiesMode
        isActive={mode === MODES.COUNTIES}
        modeOnCountyClick={MODES.BUILDINGS}
      />

      <BuildingsMode isActive={mode === MODES.BUILDINGS} />

      <ScalePanel initialPosition={{ x: -10, y: 50 }} side='left' />

      <FiltersPanel />

      <SettingsPanel />
    </>
  )
}

export default EnergyPage

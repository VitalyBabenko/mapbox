import { MODES } from '../../constants'
import { BuildingsMode, CountiesMode } from '../../modes'
import { ScalePanel, SettingsPanel } from '../../panels'
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

      <SettingsPanel />
      <ScalePanel initialPosition={{ x: 10, y: 88 }} side='left' />
    </>
  )
}

export default EnergyPage

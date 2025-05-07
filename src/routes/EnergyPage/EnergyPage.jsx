import { MODES } from '../../constants'
import { BuildingsMode, CountiesMode } from '../../modes'
import { SettingsPanel } from '../../panels'
import { useModeStore } from '../../store'
import { BiBuildings as BuildingIcon } from 'react-icons/bi'
import style from './EnergyPage.module.scss'

const EnergyPage = () => {
  const { mode } = useModeStore()

  return (
    <>
      <button className={style.buildingButton}>
        <BuildingIcon size={20} />
        Buildings
      </button>

      <CountiesMode
        isActive={mode === MODES.COUNTIES}
        modeOnCountyClick={MODES.BUILDINGS}
      />

      <BuildingsMode isActive={mode === MODES.BUILDINGS} />

      <SettingsPanel />
    </>
  )
}

export default EnergyPage

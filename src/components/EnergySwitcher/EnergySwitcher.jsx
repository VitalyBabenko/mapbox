import { BiBuildings as BuildingIcon } from 'react-icons/bi'
import style from './EnergySwitcher.module.scss'
import { useModeStore, usePaintStore } from '../../store'
import { MODES, DEFAULT_PAINT, PAINT_BY_ENERGY } from '../../constants'
import { SlEnergy as EnergyIcon } from 'react-icons/sl'
import ResetViewButton from '../ResetViewButton/ResetViewButton'

const EnergySwitcher = () => {
  const { mode } = useModeStore()
  const { activePaint, setActivePaint } = usePaintStore()

  const handleSwitch = paint => {
    setActivePaint(paint)
  }

  return (
    <>
      <div className={style.wrapper}>
        <div className={style.modeSwitcher}>
          <button
            onClick={() => handleSwitch(DEFAULT_PAINT)}
            className={activePaint !== PAINT_BY_ENERGY ? style.active : ''}
          >
            <BuildingIcon size={20} />
            Buildings
          </button>

          <button
            onClick={() => handleSwitch(PAINT_BY_ENERGY)}
            className={activePaint === PAINT_BY_ENERGY ? style.active : ''}
          >
            <EnergyIcon size={18} strokeWidth={3} />
            Energy
          </button>

          <span
            className={
              activePaint === PAINT_BY_ENERGY ? style.right : style.left
            }
          ></span>
        </div>
      </div>

      <ResetViewButton
        top={10}
        right={170}
        isVisible={mode === MODES.BUILDINGS}
      />
    </>
  )
}

export default EnergySwitcher

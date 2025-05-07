import { BiBuildings as BuildingIcon } from 'react-icons/bi'
import { GrPowerReset as ResetIcon } from 'react-icons/gr'
import style from './EnergySwitcher.module.scss'
import {
  useEventStore,
  useFilterStore,
  useModeStore,
  usePaintStore,
} from '../../store'
import {
  MODES,
  INITIAL_VIEW,
  DEFAULT_PAINT,
  PAINT_BY_ENERGY,
} from '../../constants'
import { SlEnergy as EnergyIcon } from 'react-icons/sl'
import { useMap } from 'react-map-gl'

const EnergySwitcher = () => {
  const { mode } = useModeStore()
  const { current: map } = useMap()
  const { activePaint, setActivePaint } = usePaintStore()
  const { setFilteredPlotsFeatures, setFilteredBuildingsFeatures } =
    useFilterStore()
  const { switchToCountiesMode } = useModeStore()
  const { setClickedFeature } = useEventStore()

  const resetView = () => {
    map.flyTo({
      center: [INITIAL_VIEW.LONGITUDE, INITIAL_VIEW.LATITUDE],
      zoom: INITIAL_VIEW.ZOOM,
      essential: true,
    })

    setActivePaint(DEFAULT_PAINT)
    setFilteredPlotsFeatures([])
    setFilteredBuildingsFeatures([])
    switchToCountiesMode()
    setClickedFeature(null)
  }

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

      {mode === MODES.BUILDINGS && (
        <button onClick={resetView} className={style.resetButton}>
          <ResetIcon />
          Reset view
        </button>
      )}
    </>
  )
}

export default EnergySwitcher

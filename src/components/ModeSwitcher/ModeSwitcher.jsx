import { useMap } from 'react-map-gl'
import { INITIAL_VIEW } from '../../constants'
import style from './ModeSwitcher.module.scss'
import { BiBuildings as BuildingIcon } from 'react-icons/bi'
import { BiArea as PlotIcon } from 'react-icons/bi'
import { useModeStore } from '../../store'

const ModeSwitcher = () => {
  const { current: map } = useMap()
  const {
    mode,
    county,
    switchToPlotsMode,
    switchToCountiesMode,
    switchToBuildingsMode,
  } = useModeStore(state => state)

  const resetView = () => {
    map.flyTo({
      center: [INITIAL_VIEW.LONGITUDE, INITIAL_VIEW.LATITUDE],
      zoom: INITIAL_VIEW.ZOOM,
      essential: true,
    })

    switchToCountiesMode()
  }

  if (mode === 'counties') return null
  return (
    <>
      <div className={style.wrapper}>
        <div className={style.modeSwitcher}>
          <button
            onClick={() => switchToPlotsMode(county)}
            className={mode === 'plots' ? style.active : ''}
          >
            <PlotIcon size={20} />
            Plots
          </button>

          <button
            onClick={() => switchToBuildingsMode(county)}
            className={mode === 'buildings' ? style.active : ''}
          >
            <BuildingIcon size={20} />
            Buildings
          </button>
          <span className={mode === 'plots' ? style.left : style.right}></span>
        </div>
      </div>

      <button onClick={resetView} className={style.resetButton}>
        Reset view
      </button>
    </>
  )
}

export default ModeSwitcher

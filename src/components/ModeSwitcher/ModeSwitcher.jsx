import { useMap } from 'react-map-gl'
import { INITIAL_VIEW } from '../../constants'
import style from './ModeSwitcher.module.scss'
import { BiBuildings as BuildingIcon } from 'react-icons/bi'
import { BiArea as PlotIcon } from 'react-icons/bi'
import { useModeStore } from '../../store'

const ModeSwitcher = () => {
  const { current: map } = useMap()
  const {
    county,
    mode,
    switcher,
    toggleSwitcher,
    switchToCountiesMode,
    switchToPlotsMode,
    switchToBuildingsMode,
  } = useModeStore(state => state)

  const handleSwitch = clickedMode => {
    if (clickedMode === switcher) return
    if (mode === 'counties') {
      toggleSwitcher()
      return
    }

    toggleSwitcher()
    switcher === 'plots'
      ? switchToBuildingsMode(county)
      : switchToPlotsMode(county)
  }

  const resetView = () => {
    map.flyTo({
      center: [INITIAL_VIEW.LONGITUDE, INITIAL_VIEW.LATITUDE],
      zoom: INITIAL_VIEW.ZOOM,
      essential: true,
    })

    switchToCountiesMode()
  }

  return (
    <>
      <div className={style.wrapper}>
        <div className={style.modeSwitcher}>
          <button
            onClick={() => handleSwitch('plots')}
            className={switcher === 'plots' ? style.active : ''}
          >
            <PlotIcon size={20} />
            Plots
          </button>

          <button
            onClick={() => handleSwitch('buildings')}
            className={switcher === 'buildings' ? style.active : ''}
          >
            <BuildingIcon size={20} />
            Buildings
          </button>
          <span
            className={switcher === 'plots' ? style.left : style.right}
          ></span>
        </div>
      </div>

      {mode !== 'counties' && (
        <button onClick={resetView} className={style.resetButton}>
          Reset view
        </button>
      )}
    </>
  )
}

export default ModeSwitcher

import { useMap } from 'react-map-gl'
import { DEFAULT_PAINT, INITIAL_VIEW } from '../../constants'
import style from './ModeSwitcher.module.scss'
import { BiBuildings as BuildingIcon } from 'react-icons/bi'
import { BiArea as PlotIcon } from 'react-icons/bi'
import {
  useEventStore,
  useFilterStore,
  useModeStore,
  usePaintStore,
} from '../../store'
import { memo } from 'react'

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
  } = useModeStore()
  const { setFilteredBuildingsIds, setFilteredPlotsIds } = useFilterStore()
  const { setActivePaint } = usePaintStore()
  const { setClickedFeature } = useEventStore()

  const handleSwitch = clickedMode => {
    if (clickedMode === switcher) return
    if (mode === 'counties') {
      toggleSwitcher()
      return
    }

    if (mode === 'protected') {
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

    setActivePaint(DEFAULT_PAINT)
    setFilteredBuildingsIds([])
    setFilteredPlotsIds([])
    switchToCountiesMode()
    setClickedFeature(null)
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

export default memo(ModeSwitcher)

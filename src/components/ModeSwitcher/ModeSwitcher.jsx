import { useMap } from 'react-map-gl'
import { DEFAULT_PAINT, INITIAL_VIEW, MODES } from '../../constants'
import style from './ModeSwitcher.module.scss'
import { BiBuildings as BuildingIcon } from 'react-icons/bi'
import { BiArea as PlotIcon } from 'react-icons/bi'
import { GrPowerReset as ResetIcon } from 'react-icons/gr'
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
  const {
    filteredBuildingsFeatures,
    setFilteredBuildingsFeatures,
    filteredPlotsFeatures,
    setFilteredPlotsFeatures,
  } = useFilterStore()
  const { setActivePaint } = usePaintStore()
  const { setClickedFeature } = useEventStore()

  const handleSwitch = clickedMode => {
    if (clickedMode === switcher) return
    if (mode === MODES.TAGS) return
    if (mode === MODES.COUNTIES) {
      toggleSwitcher()
      return
    }

    if (mode === MODES.PROTECTED) {
      toggleSwitcher()
      return
    }

    toggleSwitcher()
    switcher === MODES.PLOTS
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
    setFilteredPlotsFeatures([])
    setFilteredBuildingsFeatures([])
    switchToCountiesMode()
    setClickedFeature(null)
  }

  const isFilter =
    !!filteredBuildingsFeatures?.length || !!filteredPlotsFeatures?.length
  const isResetButtonVisible = mode !== 'counties' || isFilter

  console.log(!!isFilter)

  return (
    <>
      <div className={`${style.wrapper} ${isFilter ? style.filtering : ''}`}>
        <div className={style.modeSwitcher}>
          {filteredBuildingsFeatures?.length ? null : (
            <button
              onClick={() => handleSwitch('plots')}
              className={switcher === 'plots' ? style.active : ''}
            >
              <PlotIcon size={20} />
              Plots
            </button>
          )}

          {filteredPlotsFeatures?.length ? null : (
            <button
              onClick={() => handleSwitch('buildings')}
              className={switcher === 'buildings' ? style.active : ''}
            >
              <BuildingIcon size={20} />
              Buildings
            </button>
          )}

          <span
            className={switcher === 'plots' ? style.left : style.right}
          ></span>
        </div>
      </div>

      {isResetButtonVisible && (
        <button onClick={resetView} className={style.resetButton}>
          <ResetIcon />
          Reset view
        </button>
      )}
    </>
  )
}

export default memo(ModeSwitcher)

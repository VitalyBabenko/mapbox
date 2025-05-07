import { MODES } from '../../constants'
import style from './ModeSwitcher.module.scss'
import { BiBuildings as BuildingIcon } from 'react-icons/bi'
import { BiArea as PlotIcon } from 'react-icons/bi'
import { useFilterStore, useModeStore } from '../../store'
import { memo } from 'react'
import ResetViewButton from '../ResetViewButton/ResetViewButton'

const ModeSwitcher = () => {
  const {
    county,
    mode,
    switcher,
    toggleSwitcher,
    switchToPlotsMode,
    switchToBuildingsMode,
  } = useModeStore()
  const { filteredBuildingsFeatures, filteredPlotsFeatures } = useFilterStore()

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

  const isFilter =
    !!filteredBuildingsFeatures?.length || !!filteredPlotsFeatures?.length
  const isResetButtonVisible = mode !== 'counties' || isFilter

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

      <ResetViewButton top={10} right={213} isVisible={isResetButtonVisible} />
    </>
  )
}

export default memo(ModeSwitcher)

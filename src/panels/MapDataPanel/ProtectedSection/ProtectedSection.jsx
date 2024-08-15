import { DEFAULT_PAINT, MODES } from '../../../constants'
import { useModeStore, usePaintStore } from '../../../store'
import style from '../CharacteristicsSection/CharacteristicsSection.module.scss'
import protectedBuildingsPreview from '../../../assets/images/protectedBuildingsPreview.png'
import protectedPlotsPreview from '../../../assets/images/protectedPlotsPreview.png'

const ProtectedSection = () => {
  const {
    mode,
    county,
    switcher,
    toggleSwitcher,
    switchToProtectedBuildingsMode,
    switchToProtectedPlotsMode,
    switchToCountiesMode,
    switchToBuildingsMode,
    switchToPlotsMode,
  } = useModeStore()
  const { setActivePaint } = usePaintStore()

  const isProtectedBuildingsActive =
    switcher === 'buildings' && mode === MODES.PROTECTED

  const isProtectedPlotsActive =
    switcher === 'plots' && mode === MODES.PROTECTED

  const turnOnProtectedBuildings = () => {
    toggleSwitcher('buildings')
    setActivePaint(DEFAULT_PAINT)
    switchToProtectedBuildingsMode()
  }

  const turnOffProtectedBuildings = () => {
    county ? switchToBuildingsMode(county) : switchToCountiesMode()
  }

  const turnOnProtectedPlots = () => {
    toggleSwitcher('plots')
    setActivePaint(DEFAULT_PAINT)
    switchToProtectedPlotsMode()
  }

  const turnOffProtectedPlots = () => {
    county ? switchToPlotsMode(county) : switchToCountiesMode()
  }

  const handleResetClick = () => {
    setActivePaint(DEFAULT_PAINT)
    if (mode === MODES.PROTECTED) {
      switchToCountiesMode()
      return
    }

    if (mode === MODES.PROTECTED && switcher === 'buildings') {
      switchToBuildingsMode(county)
      return
    }
  }

  return (
    <>
      <div className={style.heading}>
        <h3>Protégés</h3>

        {mode === 'protected' && (
          <button onClick={handleResetClick}>Reset</button>
        )}
      </div>

      <ul className={style.list}>
        <li
          onClick={
            isProtectedBuildingsActive
              ? turnOffProtectedBuildings
              : turnOnProtectedBuildings
          }
          className={
            mode === MODES.PROTECTED && switcher === 'buildings'
              ? style.active
              : ''
          }
        >
          <img src={protectedBuildingsPreview} alt='preview' />
          <span>Batiments Protégés</span>
        </li>

        <li
          onClick={
            isProtectedPlotsActive
              ? turnOffProtectedPlots
              : turnOnProtectedPlots
          }
          className={
            mode === MODES.PROTECTED && switcher === 'plots' ? style.active : ''
          }
        >
          <img src={protectedPlotsPreview} alt='preview' />
          <span>Parcelles Protégées</span>
        </li>
        <li style={{ pointerEvents: 'none' }}></li>
      </ul>
    </>
  )
}

export default ProtectedSection
import { useModeStore, usePaintStore } from '../../../store'
import style from './CharacteristicsSection.module.scss'
import { DEFAULT_PAINT, PAINT_BY_TYPE } from '../../../constants'

const CharacteristicsSection = () => {
  const { activePaint, setActivePaint } = usePaintStore(state => state)
  const { mode, county, switcher, toggleSwitcher, switchToBuildingsMode } =
    useModeStore(state => state)

  const handleClickOnPaintByType = () => {
    if (mode === 'counties' || switcher === 'plots') {
      toggleSwitcher('buildings')
    }

    if (mode === 'plots') {
      switchToBuildingsMode(county)
    }

    if (activePaint === PAINT_BY_TYPE) {
      setActivePaint(DEFAULT_PAINT)
      return
    }
    setActivePaint(PAINT_BY_TYPE)
  }

  return (
    <>
      <h3>Characteristics</h3>
      <ul className={style.mapStyles}>
        <li
          onClick={handleClickOnPaintByType}
          className={activePaint === PAINT_BY_TYPE ? style.active : ''}
        >
          <span>Batiments</span>
        </li>
      </ul>
    </>
  )
}

export default CharacteristicsSection

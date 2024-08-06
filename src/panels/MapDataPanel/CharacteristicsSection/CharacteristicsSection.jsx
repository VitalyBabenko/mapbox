import { useModeStore, usePaintStore } from '../../../store'
import style from './CharacteristicsSection.module.scss'
import {
  DEFAULT_PAINT,
  PAINT_BY_APARTS_QTY,
  PAINT_BY_TYPE,
} from '../../../constants'
import paintByTypePreview from '../../../assets/images/paintByTypePreview.png'
import paintByApartsPreview from '../../../assets/images/paintByApartsPreview.png'

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

  const handleClickOnCharacteristics = () => {
    if (mode === 'counties' || switcher === 'plots') {
      toggleSwitcher('buildings')
    }

    if (mode === 'plots') {
      switchToBuildingsMode(county)
    }

    if (activePaint === PAINT_BY_APARTS_QTY) {
      setActivePaint(DEFAULT_PAINT)
      return
    }

    setActivePaint(PAINT_BY_APARTS_QTY)
  }

  return (
    <>
      <h3>Characteristics</h3>
      <ul className={style.mapStyles}>
        <li
          onClick={handleClickOnPaintByType}
          className={activePaint === PAINT_BY_TYPE ? style.active : ''}
        >
          <img src={paintByTypePreview} alt='preview' />
          <span>Batiments</span>
        </li>

        <li
          onClick={handleClickOnCharacteristics}
          className={activePaint === PAINT_BY_APARTS_QTY ? style.active : ''}
        >
          <img src={paintByApartsPreview} alt='preview' />
          <span>Unités</span>
        </li>
      </ul>
    </>
  )
}

export default CharacteristicsSection

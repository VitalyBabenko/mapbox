import { useModeStore, usePaintStore } from '../../../store'
import style from './CharacteristicsSection.module.scss'
import {
  DEFAULT_PAINT,
  PAINT_BY_APARTS_QTY,
  PAINT_BY_CONSTRUCTION_PERIOD,
  PAINT_BY_LAST_TRANSACTION,
  PAINT_BY_STATUS,
  PAINT_BY_TRANSACTION_AMOUNT,
  PAINT_BY_TYPE,
} from '../../../constants'
import paintByTypePreview from '../../../assets/images/paintByTypePreview.png'
import paintByApartsPreview from '../../../assets/images/paintByApartsPreview.png'
import paintByPeriodPreview from '../../../assets/images/paintByConstructionPeriodPreview.png'
import paintByTransactionAmountPreview from '../../../assets/images/paintByTransactionAmountPreview.png'

const CharacteristicsSection = () => {
  const { activePaint, setActivePaint } = usePaintStore(state => state)
  const { mode, county, switcher, toggleSwitcher, switchToBuildingsMode } =
    useModeStore(state => state)

  const handleChangePaint = clickedPaint => {
    if (mode === 'counties' || switcher === 'plots') {
      toggleSwitcher('buildings')
    }

    if (mode === 'plots') {
      switchToBuildingsMode(county)
    }

    if (activePaint === clickedPaint) {
      setActivePaint(DEFAULT_PAINT)
      return
    }

    setActivePaint(clickedPaint)
  }

  return (
    <>
      <h3>Characteristics</h3>
      <ul className={style.list}>
        <li
          onClick={() => handleChangePaint(PAINT_BY_TYPE)}
          className={activePaint === PAINT_BY_TYPE ? style.active : ''}
        >
          <img src={paintByTypePreview} alt='preview' />
          <span>Batiments</span>
        </li>

        <li
          onClick={() => handleChangePaint(PAINT_BY_APARTS_QTY)}
          className={activePaint === PAINT_BY_APARTS_QTY ? style.active : ''}
        >
          <img src={paintByApartsPreview} alt='preview' />
          <span>Unités</span>
        </li>

        <li
          onClick={() => handleChangePaint(PAINT_BY_CONSTRUCTION_PERIOD)}
          className={
            activePaint === PAINT_BY_CONSTRUCTION_PERIOD ? style.active : ''
          }
        >
          <img src={paintByPeriodPreview} alt='preview' />
          <span>Année de construction</span>
        </li>

        {/* FIXME: not working */}
        <li
          onClick={() => handleChangePaint(PAINT_BY_LAST_TRANSACTION)}
          className={
            activePaint === PAINT_BY_LAST_TRANSACTION ? style.active : ''
          }
        >
          <img alt='preview' />
          <span>Last transaction</span>
        </li>

        <li
          onClick={() => handleChangePaint(PAINT_BY_TRANSACTION_AMOUNT)}
          className={
            activePaint === PAINT_BY_TRANSACTION_AMOUNT ? style.active : ''
          }
        >
          <img src={paintByTransactionAmountPreview} alt='preview' />
          <span>Transaction Amount</span>
        </li>

        <li
          onClick={() => handleChangePaint(PAINT_BY_STATUS)}
          className={activePaint === PAINT_BY_STATUS ? style.active : ''}
        >
          <img src={paintByPeriodPreview} alt='preview' />
          <span>Mise à l'Enquête</span>
        </li>
      </ul>
    </>
  )
}

export default CharacteristicsSection

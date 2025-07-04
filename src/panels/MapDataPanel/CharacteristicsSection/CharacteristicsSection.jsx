import {
  useFilterStore,
  useModeStore,
  usePaintStore,
  useToastStore,
} from '../../../store'
import style from './CharacteristicsSection.module.scss'
import {
  DEFAULT_PAINT,
  PAINT_BY_APARTS_QTY,
  PAINT_BY_CONSTRUCTION_PERIOD,
  PAINT_BY_ENERGY,
  PAINT_BY_LAST_TRANSACTION,
  PAINT_BY_STATUS,
  PAINT_BY_TRANSACTION_AMOUNT,
  PAINT_BY_TYPE,
} from '../../../constants'
import paintByTypePreview from '../../../assets/images/paintByTypePreview.png'
import paintByApartsPreview from '../../../assets/images/paintByApartsPreview.png'
import paintByPeriodPreview from '../../../assets/images/paintByConstructionPeriodPreview.png'
import paintByTransactionAmountPreview from '../../../assets/images/paintByTransactionAmountPreview.png'
import paintByStatusPreview from '../../../assets/images/paintByStatusPreview.png'
import paintByLastTransactionPreview from '../../../assets/images/paintByLastTransactionPreview.png'
import paintByEnergyPreview from '../../../assets/images/paintByEnergyPreview.png'
import { useLocale } from '../../../hooks/useLocale'

const CharacteristicsSection = () => {
  const { t } = useLocale('panels.mapData')
  const { activePaint, setActivePaint } = usePaintStore()
  const {
    mode,
    county,
    switcher,
    toggleSwitcher,
    switchToBuildingsMode,
    switchToCountiesMode,
  } = useModeStore()
  const toast = useToastStore()
  const { setFilteredBuildingsFeatures, setFilteredPlotsFeatures } =
    useFilterStore()

  const handleChangePaint = clickedPaint => {
    if (mode === 'counties' && activePaint === DEFAULT_PAINT) {
      toast.text(t('countiesToast'))
    }

    if (mode === 'counties' && switcher === 'plots') {
      toggleSwitcher('buildings')
    }

    if (mode === 'plots') {
      switchToBuildingsMode(county)
    }

    if (mode === 'protected') {
      switchToBuildingsMode(county)
      toggleSwitcher('buildings')
    }

    if (activePaint === clickedPaint) {
      setActivePaint(DEFAULT_PAINT)
      return
    }
    setFilteredBuildingsFeatures([])
    setFilteredPlotsFeatures([])

    setActivePaint(clickedPaint)
  }

  const handleResetClick = () => {
    handleChangePaint(DEFAULT_PAINT)
  }

  return (
    <>
      <div className={style.heading}>
        <h3>{t('characteristics')}</h3>
        {activePaint !== DEFAULT_PAINT && mode !== 'protectedBuildings' && (
          <button onClick={handleResetClick}>{t('buttons.reset')}</button>
        )}

        {mode === 'zones' && (
          <button onClick={() => switchToCountiesMode()}>
            {t('buttons.reset')}
          </button>
        )}
      </div>

      <ul className={style.list}>
        <li
          onClick={() => handleChangePaint(PAINT_BY_TYPE)}
          className={activePaint === PAINT_BY_TYPE ? style.active : ''}
        >
          <img src={paintByTypePreview} alt='preview' />
          <span>{t('buildings')}</span>
        </li>

        <li
          onClick={() => handleChangePaint(PAINT_BY_APARTS_QTY)}
          className={activePaint === PAINT_BY_APARTS_QTY ? style.active : ''}
        >
          <img src={paintByApartsPreview} alt='preview' />
          <span>{t('units')}</span>
        </li>

        <li
          onClick={() => handleChangePaint(PAINT_BY_CONSTRUCTION_PERIOD)}
          className={
            activePaint === PAINT_BY_CONSTRUCTION_PERIOD ? style.active : ''
          }
        >
          <img src={paintByPeriodPreview} alt='preview' />
          <span>{t('constructionYear')}</span>
        </li>

        <li
          onClick={() => handleChangePaint(PAINT_BY_LAST_TRANSACTION)}
          className={
            activePaint === PAINT_BY_LAST_TRANSACTION ? style.active : ''
          }
        >
          <img src={paintByLastTransactionPreview} alt='preview' />
          <span>{t('lastTransaction')}</span>
        </li>

        <li
          onClick={() => handleChangePaint(PAINT_BY_TRANSACTION_AMOUNT)}
          className={
            activePaint === PAINT_BY_TRANSACTION_AMOUNT ? style.active : ''
          }
        >
          <img src={paintByTransactionAmountPreview} alt='preview' />
          <span>{t('transactionAmount')}</span>
        </li>

        <li
          onClick={() => handleChangePaint(PAINT_BY_STATUS)}
          className={activePaint === PAINT_BY_STATUS ? style.active : ''}
        >
          <img src={paintByStatusPreview} alt='preview' />
          <span>{t('status')}</span>
        </li>

        <li
          onClick={() => handleChangePaint(PAINT_BY_ENERGY)}
          className={activePaint === PAINT_BY_ENERGY ? style.active : ''}
        >
          <img src={paintByEnergyPreview} alt='preview' />
          <span>{t('energy')}</span>
        </li>
      </ul>
    </>
  )
}

export default CharacteristicsSection

import {
  DEFAULT_PAINT,
  MODES,
  PAINT_BY_LAST_TRANSACTION,
  PAINT_BY_TRANSACTION_AMOUNT,
} from '../../constants'
import {
  useFilterStore,
  useModeStore,
  usePaintStore,
  useEventStore,
} from '../../store'
import { BiCalendar as CalendarIcon } from 'react-icons/bi'
import { BiMoney as MoneyIcon } from 'react-icons/bi'
import ResetViewButton from '../ResetViewButton/ResetViewButton'
import style from './TransactionsSwitcher.module.scss'
import ModeSwitcher from '../ModeSwitcher/ModeSwitcher'

const TransactionsSwitcher = () => {
  const { mode, switcher } = useModeStore()
  const { activePaint, setActivePaint } = usePaintStore()
  const { setClickedFeature } = useEventStore()
  const { filtersResult } = useFilterStore()

  const getSpanClassName = () => {
    if (activePaint === DEFAULT_PAINT) return style.hidden
    if (activePaint === PAINT_BY_LAST_TRANSACTION) return style.left
    if (activePaint === PAINT_BY_TRANSACTION_AMOUNT) return style.right
  }

  const handleSwitch = paint => {
    if (activePaint === paint) {
      setActivePaint(DEFAULT_PAINT)
      return
    }
    setActivePaint(paint)
    setClickedFeature(null)
  }

  const isFilter = filtersResult.length

  return (
    <>
      <ModeSwitcher isResetButtonNeeded={false} />

      {switcher === MODES.BUILDINGS && !filtersResult.length && (
        <div className={style.wrapper}>
          <div className={style.transactionsSwitcher}>
            <button
              onClick={() => handleSwitch(PAINT_BY_LAST_TRANSACTION)}
              className={
                activePaint === PAINT_BY_LAST_TRANSACTION ? style.active : ''
              }
            >
              <CalendarIcon size={18} />
              Transaction date
            </button>

            <button
              onClick={() => handleSwitch(PAINT_BY_TRANSACTION_AMOUNT)}
              className={
                activePaint === PAINT_BY_TRANSACTION_AMOUNT ? style.active : ''
              }
            >
              <MoneyIcon size={18} />
              Transaction amount
            </button>

            {activePaint !== DEFAULT_PAINT && (
              <span className={getSpanClassName()}></span>
            )}
          </div>
        </div>
      )}

      <ResetViewButton
        top={10}
        right={176}
        isVisible={mode !== 'counties' || isFilter}
      />
    </>
  )
}

export default TransactionsSwitcher

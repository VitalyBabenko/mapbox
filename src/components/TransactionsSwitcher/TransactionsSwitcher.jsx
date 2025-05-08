import {
  DEFAULT_PAINT,
  MODES,
  PAINT_BY_LAST_TRANSACTION,
  PAINT_BY_TRANSACTION_AMOUNT,
} from '../../constants'
import { useModeStore, usePaintStore } from '../../store'
import { BiBuildings as BuildingIcon } from 'react-icons/bi'
import { BiCalendar as CalendarIcon } from 'react-icons/bi'
import { BiMoney as MoneyIcon } from 'react-icons/bi'
import ResetViewButton from '../ResetViewButton/ResetViewButton'
import style from './TransactionsSwitcher.module.scss'
import { useEventStore } from '../../store'

const TransactionsSwitcher = () => {
  const { mode } = useModeStore()
  const { activePaint, setActivePaint } = usePaintStore()
  const { setClickedFeature } = useEventStore()

  const getSpanClassName = () => {
    switch (activePaint) {
      case DEFAULT_PAINT:
        return style.top
      case PAINT_BY_LAST_TRANSACTION:
        return style.middle
      case PAINT_BY_TRANSACTION_AMOUNT:
        return style.bottom
    }
  }

  const handleSwitch = paint => {
    setActivePaint(paint)
    setClickedFeature(null)
  }

  return (
    <>
      <div className={style.wrapper}>
        <div className={style.modeSwitcher}>
          <button
            onClick={() => handleSwitch(DEFAULT_PAINT)}
            className={activePaint === DEFAULT_PAINT ? style.active : ''}
          >
            <BuildingIcon size={20} />
            Buildings
          </button>

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

          <span className={getSpanClassName()}></span>
        </div>
      </div>

      <ResetViewButton
        top={10}
        right={176}
        isVisible={mode === MODES.BUILDINGS}
      />
    </>
  )
}

export default TransactionsSwitcher

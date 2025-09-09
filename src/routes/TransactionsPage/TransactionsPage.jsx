import { TransactionsSwitcher } from '../../components'
import { MODES } from '../../constants'
import { BuildingsMode, CountiesMode, PlotsMode } from '../../modes'
import { ScalePanel, SettingsPanel } from '../../panels'
import { useModeStore } from '../../store'

const TransactionsPage = () => {
  const { mode } = useModeStore()

  return (
    <>
      <TransactionsSwitcher />

      <CountiesMode isActive={mode === MODES.COUNTIES} />
      <PlotsMode isActive={mode === MODES.PLOTS} />
      <BuildingsMode isActive={mode === MODES.BUILDINGS} />

      <SettingsPanel />

      <ScalePanel initialPosition={{ x: -50, y: 89 }} side='left' />
    </>
  )
}

export default TransactionsPage

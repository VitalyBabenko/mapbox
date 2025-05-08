import { TransactionsSwitcher } from '../../components'
import { MODES } from '../../constants'
import { BuildingsMode, CountiesMode } from '../../modes'
import { ScalePanel, SettingsPanel } from '../../panels'
import { useModeStore } from '../../store'

const TransactionsPage = () => {
  const { mode } = useModeStore()

  return (
    <>
      <TransactionsSwitcher />

      <CountiesMode
        isActive={mode === MODES.COUNTIES}
        modeOnCountyClick={MODES.BUILDINGS}
      />

      <BuildingsMode isActive={mode === MODES.BUILDINGS} />

      <SettingsPanel />

      <ScalePanel initialPosition={{ x: 220, y: 10 }} side='left' />
    </>
  )
}

export default TransactionsPage

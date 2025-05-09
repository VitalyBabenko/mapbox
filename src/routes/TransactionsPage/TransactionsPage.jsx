import { TransactionsSwitcher } from '../../components'
import { MODES } from '../../constants'
import { BuildingsMode, CountiesMode, PlotsMode } from '../../modes'
import {
  BuildingsPanel,
  FiltersPanel,
  PlotsPanel,
  ScalePanel,
  SettingsPanel,
} from '../../panels'
import { useModeStore, useEventStore } from '../../store'

const TransactionsPage = () => {
  const { mode } = useModeStore()
  const { clickedFeature } = useEventStore()

  return (
    <>
      <TransactionsSwitcher />

      <CountiesMode isActive={mode === MODES.COUNTIES} />
      <PlotsMode isActive={mode === MODES.PLOTS} />
      <BuildingsMode isActive={mode === MODES.BUILDINGS} />

      <PlotsPanel activePlotId={clickedFeature?.properties?.EGRID} />
      <BuildingsPanel activeBuildingId={clickedFeature?.properties?.EGID} />

      <FiltersPanel
        panelPosition={{ x: 10, y: 50 }}
        panelSide='left'
        buttonPosition={{ top: 50, left: 10 }}
        filtersFor='transactions'
      />
      <SettingsPanel />
      <ScalePanel initialPosition={{ x: 10, y: 89 }} side='left' />
    </>
  )
}

export default TransactionsPage

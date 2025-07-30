import { useMemo } from 'react'
import { PUBLIC_PLOTS_TYPES } from '../../../constants/mapSources'
import { useModeStore } from '../../../store'

const usePlotsFilter = county => {
  const isPublicPlots = useModeStore(state => state.isPublicPlots)

  return useMemo(() => {
    const countyName = county?.properties?.COMMUNE || ''

    const types = PUBLIC_PLOTS_TYPES.flat().filter(Boolean)

    const baseFilter = ['all', ['==', 'COMMUNE', countyName]]

    if (!isPublicPlots) {
      baseFilter.push(['!in', 'TYPE_PROPR', ...types])
    }

    return baseFilter
  }, [county, isPublicPlots])
}

export default usePlotsFilter

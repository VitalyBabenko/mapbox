import { useMemo } from 'react'
import { PUBLIC_PLOTS_TYPES } from '../constants/mapSources'
import { useModeStore, useFilterStore } from '../store'

export const usePlotsFilter = (county, hideFiltersResult) => {
  const isPublicPlots = useModeStore(state => state.isPublicPlots)
  const { filtersResult } = useFilterStore()

  return useMemo(() => {
    const countyName = county?.properties?.COMMUNE || ''

    const types = PUBLIC_PLOTS_TYPES.flat().filter(Boolean)
    const baseFilter = ['all', ['==', 'COMMUNE', countyName]]

    if (!isPublicPlots) {
      baseFilter.push(['!in', 'TYPE_PROPR', ...types])
    }

    if (filtersResult?.length && hideFiltersResult) {
      const egridsToExclude = filtersResult
        .map(f => f?.properties?.EGRID)
        .filter(Boolean)

      if (egridsToExclude.length) {
        baseFilter.push(['!in', 'EGRID', ...egridsToExclude])
      }
    }

    return baseFilter
  }, [county, isPublicPlots, filtersResult, hideFiltersResult])
}

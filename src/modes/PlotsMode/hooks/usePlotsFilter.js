import { useMemo } from 'react'

const usePlotsFilter = county => {
  return useMemo(() => {
    const countyName = county?.properties?.COMMUNE || ''
    const baseFilter = [
      'all',
      ['match', ['get', 'COMMUNE'], countyName, true, false],
    ]

    return baseFilter
  }, [county])
}

export default usePlotsFilter

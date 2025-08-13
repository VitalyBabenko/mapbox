import { useMemo } from 'react'

const useBuildingsFilter = county => {
  return useMemo(() => {
    const commune = county?.properties?.COMMUNE || ''

    return ['all', ['match', ['get', 'COMMUNE'], commune, true, false]]
  }, [county])
}

export default useBuildingsFilter

import { useMemo } from 'react'

export const useBuildingsFilter = county => {
  return useMemo(() => {
    const commune = county?.properties?.COMMUNE || ''

    return ['all', ['match', ['get', 'COMMUNE'], commune, true, false]]
  }, [county])
}

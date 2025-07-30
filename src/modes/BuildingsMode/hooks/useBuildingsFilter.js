import { useMemo } from 'react'

const useBuildingsFilter = county => {
  return useMemo(() => {
    const noComm = county?.properties?.NO_COMM || ''

    return ['all', ['match', ['get', 'NO_COMM'], noComm, true, false]]
  }, [county])
}

export default useBuildingsFilter

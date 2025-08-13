import { useEffect, useState, useRef } from 'react'
import { BUILDINGS_SOURCE, COUNTIES_SOURCE, PLOTS_SOURCE } from '../constants'
import { useEventStore, useModeStore } from '../store'
import { usePlotsFilter } from './usePlotsFilter'

export function useVisibleFeatures(map, delay = 250) {
  const { mode, county, isPublicPlots } = useModeStore()
  const { renderedFeatures, setRenderedFeatures } = useEventStore()
  const plotsFilter = usePlotsFilter(county)

  const [isLoading, setIsLoading] = useState(false)
  const timer = useRef(null)

  const updateFeatures = () => {
    if (!map) return

    const renderProperties = {
      plots: {
        source: PLOTS_SOURCE.id,
        sourceLayer: PLOTS_SOURCE.sourceLayer,
        filter: plotsFilter,
      },
      buildings: {
        source: BUILDINGS_SOURCE.id,
        sourceLayer: BUILDINGS_SOURCE.sourceLayer,
      },
      counties: {
        source: COUNTIES_SOURCE.id,
        sourceLayer: COUNTIES_SOURCE.sourceLayer,
      },
    }

    const rendered = map.queryRenderedFeatures({
      source: renderProperties[mode].source,
      sourceLayer: renderProperties[mode].sourceLayer,
      filter: renderProperties[mode]?.filter || [],
    })

    const unique = []
    const seen = new Set()

    for (const f of rendered) {
      const id = f.properties?.EGRID
      if (!seen.has(id)) {
        seen.add(id)
        unique.push(f)
      }
    }

    setRenderedFeatures(unique)
    setIsLoading(false)
  }

  useEffect(() => {
    if (!map) return

    const debouncedUpdate = () => {
      clearTimeout(timer.current)
      setIsLoading(true)
      timer.current = setTimeout(updateFeatures, delay)
    }

    updateFeatures()

    map.on('move', debouncedUpdate)

    return () => {
      map.off('move', debouncedUpdate)
      clearTimeout(timer.current)
    }
  }, [map, delay, mode, isPublicPlots])

  return { renderedFeatures, isLoading }
}

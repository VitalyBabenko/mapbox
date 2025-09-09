import { useEffect, useRef, useCallback } from 'react'
import { BUILDINGS_SOURCE, COUNTIES_SOURCE, PLOTS_SOURCE } from '../constants'
import { useEventStore, useModeStore } from '../store'
import { usePlotsFilter } from './usePlotsFilter'
import { useBuildingsFilter } from './useBuildingsFilter'

export function useVisibleFeatures(map, delay = 250) {
  const { mode, county, isPublicPlots } = useModeStore()
  const { renderedFeatures, setRenderedFeatures, setRenderedFeaturesLoading } =
    useEventStore()
  const plotsFilter = usePlotsFilter(county)
  const buildingsFilter = useBuildingsFilter(county)

  const timer = useRef(null)

  const updateFeatures = useCallback(() => {
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
        filter: buildingsFilter,
      },
      counties: {
        source: COUNTIES_SOURCE.id,
        sourceLayer: COUNTIES_SOURCE.sourceLayer,
      },
    }

    const queryOptions = {
      source: renderProperties[mode].source,
      sourceLayer: renderProperties[mode].sourceLayer,
    }

    if (
      renderProperties[mode]?.filter &&
      renderProperties[mode].filter.length > 0
    ) {
      queryOptions.filter = renderProperties[mode].filter
    }

    const rendered = map.queryRenderedFeatures(queryOptions)

    const unique = []
    const seen = new Set()

    if (mode === 'plots') {
      for (const f of rendered) {
        const id = f.properties?.EGRID
        if (!seen.has(id)) {
          seen.add(id)
          unique.push(f)
        }
      }
    }

    if (mode === 'buildings') {
      for (const f of rendered) {
        const id = f.properties?.EGID
        if (!seen.has(id)) {
          seen.add(id)
          unique.push(f)
        }
      }
    }

    setRenderedFeatures(unique)
    setRenderedFeaturesLoading(false)
  }, [
    map,
    mode,
    plotsFilter,
    buildingsFilter,
    setRenderedFeatures,
    setRenderedFeaturesLoading,
  ])

  useEffect(() => {
    if (!map) return

    const debouncedUpdate = () => {
      clearTimeout(timer.current)
      setRenderedFeaturesLoading(true)
      timer.current = setTimeout(updateFeatures, delay)
    }

    updateFeatures()

    map.on('move', debouncedUpdate)

    return () => {
      map.off('move', debouncedUpdate)
      clearTimeout(timer.current)
    }
  }, [
    map,
    delay,
    mode,
    isPublicPlots,
    updateFeatures,
    setRenderedFeaturesLoading,
  ])

  return { renderedFeatures, setRenderedFeaturesLoading }
}

import { useMap } from 'react-map-gl'
import { useEffect, useState, useRef } from 'react'
import { PLOTS_SOURCE } from '../constants'

export function useVisibleFeatures(delay = 250) {
  const { current: map } = useMap()
  const [features, setFeatures] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const timer = useRef(null)

  const updateFeatures = () => {
    if (!map) return

    const rendered = map.queryRenderedFeatures({
      source: PLOTS_SOURCE.id,
      sourceLayer: PLOTS_SOURCE.sourceLayer,
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

    setFeatures(unique)
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
  }, [map, delay])

  return { features, isLoading }
}

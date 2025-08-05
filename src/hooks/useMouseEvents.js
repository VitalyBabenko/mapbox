import { useCallback, useRef, useState } from 'react'
import { useEventStore } from '../store/eventStore'
import { useThrottle } from './useTrottle'

export function useMouseEvents(isMapLoading) {
  const { setClickEvent, setHoverEvent, setClickedFeature, setHoveredFeature } =
    useEventStore()

  const [cursor, setCursor] = useState(null)
  const lastHoveredId = useRef(null)

  const onEnter = useCallback(() => {
    setCursor('pointer')
  }, [])

  const onLeave = useCallback(() => {
    setCursor(null)
    lastHoveredId.current = null
    setHoveredFeature(null)
  }, [setHoveredFeature])

  const handleHover = useCallback(
    event => {
      if (isMapLoading) return
      setHoverEvent(event)

      const feature = event?.features?.[0] || null
      const egrid = feature?.properties?.EGRID || null
      const egid = feature?.properties?.EGID || null
      const mutnum = feature?.properties?.MUTNUM || null
      const commune = feature?.properties?.COMMUNE || null

      const id = egid || egrid || mutnum || commune

      if (id === lastHoveredId.current) return
      lastHoveredId.current = id

      setHoveredFeature(feature)
    },
    [isMapLoading, setHoverEvent, setHoveredFeature],
  )

  const onMove = useThrottle(handleHover, 50)

  const onClick = useCallback(
    event => {
      if (isMapLoading) return
      setClickEvent(event)
      const feature = event?.features?.[0] || null
      setClickedFeature(feature)
    },
    [isMapLoading, setClickEvent, setClickedFeature],
  )

  return {
    cursor,
    onClick,
    onMove,
    onEnter,
    onLeave,
  }
}

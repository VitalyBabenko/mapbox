import { Layer, Source } from 'react-map-gl'
import { DEFAULT_PAINT, PAINT_BY_ZONE, ZONES_SOURCE } from '../../constants'
import HoverZone from './HoverZone/HoverZone'
import { usePaintStore, useZoneStore } from '../../store'
import { useEffect } from 'react'

// can work in parallel with other modes if isPrimary === false

const ZonesMode = () => {
  const { isActive, zoneOpacity, isPrimary, togglePrimary } = useZoneStore()
  const { activePaint } = usePaintStore()

  useEffect(() => {
    if (activePaint !== DEFAULT_PAINT) {
      togglePrimary(false)
    }
  }, [activePaint])

  return (
    <Source id={ZONES_SOURCE.id} type='vector' url={ZONES_SOURCE.url}>
      <Layer
        id='zones'
        type='fill'
        source={ZONES_SOURCE.id}
        source-layer={ZONES_SOURCE.sourceLayer}
        paint={{ 'fill-opacity': zoneOpacity[1] / 100, ...PAINT_BY_ZONE }}
        beforeId='airport-label'
        layout={{ visibility: isActive ? 'visible' : 'none' }}
        interactive={true}
      />

      {isPrimary && <HoverZone />}
    </Source>
  )
}

export default ZonesMode

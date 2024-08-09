import { Layer, Source, useMap } from 'react-map-gl'
import { PAINT_BY_ZONE, ZONES_SOURCE } from '../../constants'
import HoverZone from './HoverZone/HoverZone'
import { useZoneStore } from '../../store'

// works in parallel with other modes

const ZonesMode = () => {
  const { current: map } = useMap()
  const { isActive, zoneOpacity, isTipsActive } = useZoneStore()

  return (
    <Source id={ZONES_SOURCE.id} type='vector' url={ZONES_SOURCE.url}>
      <Layer
        id='zones'
        type='fill'
        source={ZONES_SOURCE.id}
        source-layer={ZONES_SOURCE.sourceLayer}
        paint={{ 'fill-opacity': zoneOpacity[1] / 100, ...PAINT_BY_ZONE }}
        beforeId='poi-label'
        layout={{ visibility: isActive ? 'visible' : 'none' }}
      />

      {isTipsActive && <HoverZone map={map} />}
    </Source>
  )
}

export default ZonesMode

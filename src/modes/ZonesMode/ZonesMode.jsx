import { Layer, Source, Popup } from 'react-map-gl'
import { DEFAULT_PAINT, PAINT_BY_ZONE, ZONES_SOURCE } from '../../constants'
import { useEventStore, usePaintStore, useZoneStore } from '../../store'
import { useEffect } from 'react'

// can work in parallel with other modes if isPrimary === false

const ZonesMode = () => {
  const { isActive, zoneOpacity, isPrimary, togglePrimary } = useZoneStore()
  const { activePaint } = usePaintStore()
  const { hoveredFeature, hoverEvent } = useEventStore()

  const getFillOpacity = () => {
    const hoverOpacity = (zoneOpacity[1] + 40) / 100
    if (hoveredFeature?.properties?.OBJECTID && isPrimary) {
      return [
        'case',
        ['==', ['get', 'OBJECTID'], hoveredFeature?.properties?.OBJECTID],
        hoverOpacity > 1 ? 1 : hoverOpacity,
        zoneOpacity[1] / 100,
      ]
    }
    return zoneOpacity[1] / 100
  }

  useEffect(() => {
    if (activePaint !== DEFAULT_PAINT) {
      togglePrimary(false)
    }
  }, [activePaint])

  return (
    <>
      <Source id={ZONES_SOURCE.id} type='vector' url={ZONES_SOURCE.url}>
        <Layer
          id='zones'
          type='fill'
          source={ZONES_SOURCE.id}
          source-layer={ZONES_SOURCE.sourceLayer}
          paint={{
            'fill-opacity': getFillOpacity(),
            'fill-color': PAINT_BY_ZONE['fill-color'],
          }}
          beforeId='airport-label'
          layout={{ visibility: isActive ? 'visible' : 'none' }}
          interactive={true}
        />
      </Source>

      {hoveredFeature?.properties?.NOM_ZONE && (
        <Popup
          longitude={hoverEvent?.lngLat?.lng}
          latitude={hoverEvent?.lngLat?.lat}
          offset={[0, -5]}
          closeButton={false}
          className='hover-popup'
        >
          {hoveredFeature?.properties?.NOM_ZONE}
        </Popup>
      )}
    </>
  )
}

export default ZonesMode

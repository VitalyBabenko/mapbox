import React, { useMemo } from 'react'
import { useEventStore } from '../../../store'
import { Layer, Popup } from 'react-map-gl'
import { ZONES_SOURCE } from '../../../constants'

const HoverZone = ({ isPrimary }) => {
  const { hoverEvent, hoveredFeature } = useEventStore()

  const filterForHoverZone = useMemo(() => {
    return ['in', 'OBJECTID', hoveredFeature?.properties?.OBJECTID || '']
  }, [hoveredFeature])

  return (
    <>
      <Layer
        id='hoverZone'
        type='fill'
        source={ZONES_SOURCE.id}
        source-layer={ZONES_SOURCE.sourceLayer}
        filter={filterForHoverZone}
        paint={{
          'fill-color': '#006cd5',
          'fill-opacity': 0.6,
          'fill-outline-color': 'white',
        }}
        beforeId={'airport-label'}
        layout={{ visibility: 'visible' }}
      />
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

export default HoverZone

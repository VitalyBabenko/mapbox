import React, { useEffect, useMemo, useState } from 'react'
import { useEventStore } from '../../../store'
import { Layer, Popup } from 'react-map-gl'
import { ZONES_SOURCE } from '../../../constants'

const HoverZone = ({ map }) => {
  const { hoverEvent } = useEventStore()
  const [hoverZone, setHoverZone] = useState(null)

  useEffect(() => {
    if (hoverEvent === null) return
    const feature = map.queryRenderedFeatures(hoverEvent.point, {
      layers: ['zones'],
    })[0]

    if (!feature) {
      setHoverZone(null)
      return
    }

    setHoverZone(feature?.properties)
  }, [hoverEvent])

  const filterForHoverZone = useMemo(() => {
    return ['in', 'OBJECTID', hoverZone?.OBJECTID || '']
  }, [hoverZone, hoverEvent])

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
        beforeId='airport-label'
        layout={{ visibility: 'visible' }}
      />
      {hoverZone && (
        <Popup
          longitude={hoverEvent.lngLat.lng}
          latitude={hoverEvent.lngLat.lat}
          offset={[0, -5]}
          closeButton={false}
          className='hover-popup'
        >
          {hoverZone?.NOM_ZONE}
        </Popup>
      )}
    </>
  )
}

export default HoverZone

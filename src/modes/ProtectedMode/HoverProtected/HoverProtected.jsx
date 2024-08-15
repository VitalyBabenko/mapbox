import { Layer, Popup } from 'react-map-gl'
import { PROTECTED_SOURCE } from '../../../constants'
import { useEventStore } from '../../../store'
import { useMemo } from 'react'

const HoverProtected = ({ isActive }) => {
  const { hoverEvent, hoveredFeature } = useEventStore()

  const filterForHoverBuilding = useMemo(
    () => ['in', 'OBJECTID', hoveredFeature?.properties?.OBJECTID || ''],
    [isActive, hoveredFeature],
  )

  if (!isActive) return null
  return (
    <>
      <Layer
        id='hoverProtected'
        type='fill'
        source={PROTECTED_SOURCE.id}
        source-layer={PROTECTED_SOURCE.sourceLayer}
        paint={{
          'fill-outline-color': '#601f1e',
          'fill-color': '#c23e3b',
          'fill-opacity': 0.6,
        }}
        filter={filterForHoverBuilding}
        layout={{ visibility: isActive ? 'visible' : 'none' }}
        beforeId='poi-label'
      />
      {hoveredFeature?.properties?.NOM && isActive && (
        <Popup
          longitude={hoverEvent.lngLat.lng}
          latitude={hoverEvent.lngLat.lat}
          offset={[0, -5]}
          closeButton={false}
          className='hover-popup'
        >
          {hoveredFeature?.properties?.NOM}
        </Popup>
      )}
    </>
  )
}

export default HoverProtected

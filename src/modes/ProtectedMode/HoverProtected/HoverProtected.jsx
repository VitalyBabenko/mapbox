import { Layer, Popup } from 'react-map-gl'
import { PROTECTED_SOURCE } from '../../../constants'
import { useEventStore } from '../../../store'
import { useEffect, useMemo, useState } from 'react'

const HoverProtected = ({ isActive, map }) => {
  const { hoverEvent } = useEventStore()
  const [hoverBuilding, setHoverBuilding] = useState(null)

  useEffect(() => {
    if (!isActive) return
    if (!hoverEvent) return

    const feature = map.queryRenderedFeatures(hoverEvent.point, {
      layers: ['protectedBuildings'],
    })[0]

    if (!feature) {
      setHoverBuilding(null)
      return
    }

    setHoverBuilding(feature?.properties)
  }, [hoverEvent])

  const filterForHoverBuilding = useMemo(
    () => ['in', 'OBJECTID', hoverBuilding?.OBJECTID || ''],
    [isActive, hoverBuilding],
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
      {hoverBuilding?.NOM && isActive && (
        <Popup
          longitude={hoverEvent.lngLat.lng}
          latitude={hoverEvent.lngLat.lat}
          offset={[0, -5]}
          closeButton={false}
          className='hover-popup'
        >
          {hoverBuilding?.NOM}
        </Popup>
      )}
    </>
  )
}

export default HoverProtected

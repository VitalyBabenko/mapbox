import { Popup } from 'react-map-gl'
import centroid from '@turf/centroid'

export const PlotsPopup = ({ hoveredFeature, isActive }) => {
  if (!isActive || !hoveredFeature?.properties?.IDEDDP) return null

  const center = centroid(hoveredFeature)?.geometry?.coordinates

  if (!center) return null

  return (
    <Popup
      longitude={center[0]}
      latitude={center[1]}
      offset={[0, -5]}
      closeButton={false}
      className='hover-popup'
    >
      Plot: {hoveredFeature.properties.IDEDDP.replace(':', '/')}
    </Popup>
  )
}

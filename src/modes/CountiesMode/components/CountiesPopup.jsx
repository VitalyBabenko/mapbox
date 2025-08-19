import { Popup } from 'react-map-gl'
import centroid from '@turf/centroid'

const CountiesPopup = ({ feature }) => {
  if (!feature?.properties?.COMMUNE || !feature.geometry) return null

  const center = centroid(feature)?.geometry?.coordinates
  if (!center) return null

  return (
    <Popup
      longitude={center[0]}
      latitude={center[1]}
      offset={[0, -5]}
      closeButton={false}
      className='hover-popup'
    >
      {feature.properties.COMMUNE}
    </Popup>
  )
}

export default CountiesPopup

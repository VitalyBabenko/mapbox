import { Popup } from 'react-map-gl'

export const PlotsPopup = ({ hoveredFeature, hoverEvent, isActive }) => {
  if (!isActive) return null
  if (!hoveredFeature?.properties?.IDEDDP) return null

  return (
    <Popup
      longitude={hoverEvent.lngLat.lng}
      latitude={hoverEvent.lngLat.lat}
      offset={[0, -5]}
      closeButton={false}
      className='hover-popup'
    >
      Plot: {hoveredFeature?.properties?.IDEDDP?.replace(':', '/')}
    </Popup>
  )
}

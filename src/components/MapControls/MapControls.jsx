import { FullscreenControl, NavigationControl, useMap } from 'react-map-gl'
import { MapDataPanel } from '../../panels'

const MapControls = props => {
  const { mapRef } = props

  return (
    <>
      <FullscreenControl position='top-right' />

      <NavigationControl />

      <MapDataPanel mapRef={mapRef} />
    </>
  )
}

export default MapControls

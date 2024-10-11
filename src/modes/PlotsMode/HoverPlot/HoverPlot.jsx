import { useMemo } from 'react'
import { Layer, Popup } from 'react-map-gl'
import { useEventStore } from '../../../store'
import { PLOTS_SOURCE } from '../../../constants'

const HoverPlot = ({ isActive, opacity }) => {
  const { hoveredFeature, hoverEvent } = useEventStore()

  const hoverOpacity = (opacity + 20) / 100

  const filterForHoverPlot = useMemo(
    () =>
      isActive ? ['in', 'EGRID', `${hoveredFeature?.properties?.EGRID}`] : null,
    [hoveredFeature, isActive],
  )

  if (!isActive) return null
  return (
    <>
      <Layer
        id='plotsHover'
        type='fill'
        source={PLOTS_SOURCE.id}
        source-layer={PLOTS_SOURCE.sourceLayer}
        filter={filterForHoverPlot}
        paint={{
          'fill-color': '#58dca6',
          'fill-opacity': hoverOpacity > 1 ? 1 : hoverOpacity,
        }}
        beforeId='poi-label'
        layout={{ visibility: isActive ? 'visible' : 'none' }}
      />
      {hoveredFeature?.properties?.IDEDDP && isActive && (
        <Popup
          longitude={hoverEvent.lngLat.lng}
          latitude={hoverEvent.lngLat.lat}
          offset={[0, -5]}
          closeButton={false}
          className='hover-popup'
        >
          Plot: {hoveredFeature?.properties?.IDEDDP?.replace(':', '/')}
        </Popup>
      )}
    </>
  )
}

export default HoverPlot

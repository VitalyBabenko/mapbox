import { Layer, Source, useMap } from 'react-map-gl'
import { memo, useEffect } from 'react'
import HoverCounty from './HoverCounty/HoverCounty'
import bbox from '@turf/bbox'
import { useEventStore, useModeStore, usePaintStore } from '../../store'
import { COUNTIES_SOURCE } from '../../constants'

const CountiesMode = ({ isActive }) => {
  const { current: map } = useMap()
  const { switcher, switchToPlotsMode, switchToBuildingsMode } = useModeStore()
  const { clickedFeature } = useEventStore()
  const { opacity } = usePaintStore()

  useEffect(() => {
    if (!isActive) return
    if (clickedFeature === null) return

    const [minLng, minLat, maxLng, maxLat] = bbox(clickedFeature)
    map.fitBounds(
      [
        [minLng, minLat],
        [maxLng, maxLat],
      ],
      { padding: 0, duration: 1500, zoom: 13 },
    )

    switcher === 'plots'
      ? switchToPlotsMode(clickedFeature)
      : switchToBuildingsMode(clickedFeature)
  }, [clickedFeature])

  return (
    <Source id={COUNTIES_SOURCE.id} url={COUNTIES_SOURCE.url} type='vector'>
      <Layer
        id='counties'
        type='fill'
        source={COUNTIES_SOURCE.id}
        source-layer={COUNTIES_SOURCE.sourceLayer}
        paint={{
          'fill-outline-color': 'rgba(256,256,256,1)',
          'fill-color': '#024eaa',
          'fill-opacity': opacity[1] / 100,
        }}
        beforeId='poi-label'
        layout={{ visibility: isActive ? 'visible' : 'none' }}
      />
      <HoverCounty isActive={isActive} opacity={opacity[1]} />
    </Source>
  )
}

export default memo(CountiesMode)
